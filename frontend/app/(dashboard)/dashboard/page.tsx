"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, ArrowLeftRight, Plus, ArrowUpRight, Wallet, PiggyBank, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import Link from "next/link";

interface Transaction { id: string; amount: number; type: string; status: string; description?: string; createdAt: string; }
interface Account { id: string; accountNumber: string; type: string; balance: number; currency: string; }

const accountIcons: Record<string, React.ReactNode> = {
  CHECKING: <Wallet className="w-5 h-5" />,
  SAVINGS: <PiggyBank className="w-5 h-5" />,
  INVESTMENT: <BarChart3 className="w-5 h-5" />,
};
const accountColors: Record<string, string> = {
  CHECKING: "from-blue-500 to-indigo-600",
  SAVINGS: "from-emerald-500 to-teal-600",
  INVESTMENT: "from-violet-500 to-purple-600",
};

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/accounts"), api.get("/transactions")]).then(([a, t]) => {
      setAccounts(a.data); setTransactions(t.data.slice(0, 6)); setLoading(false);
    });
  }, []);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const totalIn = transactions.filter(t => t.type === "DEPOSIT").reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter(t => t.type !== "DEPOSIT").reduce((s, t) => s + t.amount, 0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <motion.div className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </motion.div>
    </div>
  );

  return (
    <motion.div className="space-y-6 sm:space-y-8 max-w-6xl" variants={container} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{greeting} 👋</p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</h1>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/accounts"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20">
            <Plus className="w-4 h-4" /><span className="hidden sm:inline">New Account</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Hero Balance */}
      <motion.div variants={item}
        className="relative bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 rounded-3xl p-6 sm:p-8 text-white overflow-hidden">
        <motion.div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 bg-cyan-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} />
        <div className="relative">
          <p className="text-gray-400 text-sm font-medium mb-2">Total Portfolio Balance</p>
          <motion.p className="text-3xl sm:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            {formatCurrency(totalBalance)}
          </motion.p>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {[
              { label: "Total In", value: `+${formatCurrency(totalIn)}`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/20" },
              { label: "Total Out", value: `-${formatCurrency(totalOut)}`, icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/20" },
              { label: "Accounts", value: `${accounts.length} active`, icon: Wallet, color: "text-indigo-400", bg: "bg-indigo-500/20" },
            ].map(({ label, value, icon: Icon, color, bg }, i) => (
              <motion.div key={label} className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", bg)}>
                  <Icon className={cn("w-4 h-4", color)} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className={cn("text-sm font-semibold", color)}>{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Accounts */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Your Accounts</h2>
          <Link href="/accounts" className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-medium flex items-center gap-1">
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account, i) => (
            <motion.div key={account.id}
              className={cn("rounded-2xl p-5 bg-gradient-to-br text-white shadow-lg", accountColors[account.type] || "from-gray-600 to-gray-700")}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">{accountIcons[account.type]}</div>
                <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full">{account.type}</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold mb-1">{formatCurrency(account.balance, account.currency)}</p>
              <p className="text-xs opacity-60 font-mono">••••{account.accountNumber.slice(-4)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Deposit", icon: TrendingUp, color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400", href: "/transactions" },
            { label: "Withdraw", icon: TrendingDown, color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400", href: "/transactions" },
            { label: "Transfer", icon: ArrowLeftRight, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400", href: "/transactions" },
          ].map(({ label, icon: Icon, color, href }, i) => (
            <motion.div key={label} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}>
              <Link href={href} className={cn("flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl font-medium text-xs sm:text-sm transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm", color)}>
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                {label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          <Link href="/transactions" className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-medium flex items-center gap-1">
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-600 text-sm">
              <ArrowLeftRight className="w-8 h-8 mx-auto mb-2 opacity-30" />No transactions yet
            </div>
          ) : (
            <ul className="divide-y divide-gray-50 dark:divide-gray-800">
              {transactions.map((tx, i) => (
                <motion.li key={tx.id}
                  className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ x: 4 }}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div className={cn("w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      tx.type === "DEPOSIT" ? "bg-green-100 dark:bg-green-900/30" : tx.type === "WITHDRAWAL" ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                    )} whileHover={{ scale: 1.2, rotate: 10 }}>
                      {tx.type === "DEPOSIT" ? <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" /> :
                       tx.type === "WITHDRAWAL" ? <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" /> :
                       <ArrowLeftRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tx.description || tx.type}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(tx.createdAt)}</p>
                    </div>
                  </div>
                  <p className={cn("text-sm font-bold",
                    tx.type === "DEPOSIT" ? "text-green-600 dark:text-green-400" : tx.type === "WITHDRAWAL" ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                  )}>
                    {tx.type === "DEPOSIT" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
