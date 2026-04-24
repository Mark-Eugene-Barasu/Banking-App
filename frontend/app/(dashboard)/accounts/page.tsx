"use client";
import { useEffect, useState } from "react";
import { Plus, CreditCard, Wallet, PiggyBank, BarChart3, CheckCircle } from "lucide-react";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import { formatCurrency, cn } from "@/lib/utils";

interface Account { id: string; accountNumber: string; type: "CHECKING" | "SAVINGS" | "INVESTMENT"; balance: number; currency: string; isActive: boolean; createdAt: string; }

const typeConfig: Record<string, { gradient: string; icon: React.ReactNode; desc: string }> = {
  CHECKING: { gradient: "from-blue-500 via-blue-600 to-indigo-600", icon: <Wallet className="w-6 h-6" />, desc: "Everyday spending" },
  SAVINGS: { gradient: "from-emerald-500 via-emerald-600 to-teal-600", icon: <PiggyBank className="w-6 h-6" />, desc: "Grow your savings" },
  INVESTMENT: { gradient: "from-violet-500 via-violet-600 to-purple-600", icon: <BarChart3 className="w-6 h-6" />, desc: "Build your wealth" },
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<"CHECKING" | "SAVINGS" | "INVESTMENT">("SAVINGS");

  const fetchAccounts = () => api.get("/accounts").then((r) => { setAccounts(r.data); setLoading(false); });
  useEffect(() => { fetchAccounts(); }, []);

  const handleCreate = async () => {
    setCreating(true);
    await api.post("/accounts", { type });
    await fetchAccounts();
    setCreating(false);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl">
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Accounts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and open bank accounts</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Open Account</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Open Account Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 animate-scale-in transition-colors duration-300">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Choose Account Type</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Select the type of account you want to open</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {(["CHECKING", "SAVINGS", "INVESTMENT"] as const).map((t) => {
              const config = typeConfig[t];
              const selected = type === t;
              return (
                <button key={t} onClick={() => setType(t)}
                  className={cn("relative p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md active:scale-95",
                    selected ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                  )}>
                  {selected && <CheckCircle className="absolute top-3 right-3 w-4 h-4 text-indigo-600 animate-scale-in" />}
                  <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3", config.gradient)}>
                    {config.icon}
                  </div>
                  <p className={cn("text-sm font-semibold", selected ? "text-indigo-700 dark:text-indigo-400" : "text-gray-800 dark:text-gray-200")}>{t}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{config.desc}</p>
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <Button onClick={handleCreate} loading={creating}>Open Account</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Account Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1,2].map(i => <div key={i} className="skeleton h-44 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {accounts.map((account, i) => {
            const config = typeConfig[account.type];
            return (
              <div key={account.id}
                className={cn("relative rounded-2xl p-6 text-white bg-gradient-to-br shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up", config.gradient)}
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">{config.icon}</div>
                      <div>
                        <p className="text-xs opacity-70">CryptoBanking</p>
                        <p className="text-sm font-semibold">{account.type}</p>
                      </div>
                    </div>
                    <CreditCard className="w-6 h-6 opacity-50" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold mb-1">{formatCurrency(account.balance, account.currency)}</p>
                  <p className="text-sm opacity-60 font-mono tracking-widest mb-4">
                    {account.accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium",
                      account.isActive ? "bg-white/20 text-white" : "bg-red-200/50 text-red-100"
                    )}>
                      {account.isActive ? "● Active" : "● Inactive"}
                    </span>
                    <p className="text-xs opacity-50">{account.currency}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {accounts.length === 0 && !loading && !showForm && (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 animate-fade-in transition-colors duration-300">
          <CreditCard className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No accounts yet</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Open your first account to get started</p>
          <Button className="mt-4" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-2" />Open Account</Button>
        </div>
      )}
    </div>
  );
}
