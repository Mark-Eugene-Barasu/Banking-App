"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, ArrowLeftRight, Plus } from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import Link from "next/link";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  description?: string;
  createdAt: string;
  senderAccountId?: string;
  receiverAccountId?: string;
}

interface Account {
  id: string;
  accountNumber: string;
  type: string;
  balance: number;
  currency: string;
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/accounts"), api.get("/transactions")]).then(([a, t]) => {
      setAccounts(a.data);
      setTransactions(t.data.slice(0, 8));
      setLoading(false);
    });
  }, []);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const typeIcon = (type: string) => {
    if (type === "DEPOSIT") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (type === "WITHDRAWAL") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <ArrowLeftRight className="w-4 h-4 text-blue-500" />;
  };

  const typeColor = (type: string) =>
    type === "DEPOSIT" ? "text-green-600" : type === "WITHDRAWAL" ? "text-red-600" : "text-blue-600";

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning, {user?.firstName} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s your financial overview</p>
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <p className="text-indigo-200 text-sm font-medium">Total Balance</p>
        <p className="text-4xl font-bold mt-1">{formatCurrency(totalBalance)}</p>
        <p className="text-indigo-200 text-sm mt-2">{accounts.length} account{accounts.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Accounts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">Your Accounts</h2>
          <Link href="/accounts"><Button variant="ghost" size="sm"><Plus className="w-4 h-4 mr-1" />New Account</Button></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className={cn("text-xs font-semibold px-2 py-1 rounded-full",
                  account.type === "CHECKING" ? "bg-blue-100 text-blue-700" :
                  account.type === "SAVINGS" ? "bg-green-100 text-green-700" :
                  "bg-purple-100 text-purple-700"
                )}>{account.type}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(account.balance, account.currency)}</p>
              <p className="text-xs text-gray-400 mt-1">••••{account.accountNumber.slice(-4)}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="flex gap-3">
          <Link href="/transactions"><Button variant="primary"><TrendingUp className="w-4 h-4 mr-2" />Deposit</Button></Link>
          <Link href="/transactions"><Button variant="secondary"><TrendingDown className="w-4 h-4 mr-2" />Withdraw</Button></Link>
          <Link href="/transactions"><Button variant="secondary"><ArrowLeftRight className="w-4 h-4 mr-2" />Transfer</Button></Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">Recent Transactions</h2>
          <Link href="/transactions" className="text-sm text-indigo-600 hover:underline">View all</Link>
        </div>
        <Card className="p-0 overflow-hidden">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">No transactions yet</p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <li key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                      {typeIcon(tx.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{tx.description || tx.type}</p>
                      <p className="text-xs text-gray-400">{formatDate(tx.createdAt)}</p>
                    </div>
                  </div>
                  <span className={cn("text-sm font-semibold", typeColor(tx.type))}>
                    {tx.type === "DEPOSIT" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
