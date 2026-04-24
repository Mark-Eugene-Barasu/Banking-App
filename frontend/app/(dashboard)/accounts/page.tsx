"use client";
import { useEffect, useState } from "react";
import { Plus, CreditCard } from "lucide-react";
import api from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatCurrency, cn } from "@/lib/utils";

interface Account {
  id: string;
  accountNumber: string;
  type: "CHECKING" | "SAVINGS" | "INVESTMENT";
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
}

const typeStyles: Record<string, string> = {
  CHECKING: "from-blue-500 to-blue-700",
  SAVINGS: "from-green-500 to-emerald-700",
  INVESTMENT: "from-purple-500 to-purple-700",
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<"CHECKING" | "SAVINGS" | "INVESTMENT">("SAVINGS");

  const fetchAccounts = () =>
    api.get("/accounts").then((r) => { setAccounts(r.data); setLoading(false); });

  useEffect(() => { fetchAccounts(); }, []);

  const handleCreate = async () => {
    setCreating(true);
    await api.post("/accounts", { type });
    await fetchAccounts();
    setCreating(false);
    setShowForm(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your bank accounts</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="w-4 h-4 mr-2" />New Account</Button>
      </div>

      {showForm && (
        <Card>
          <h2 className="font-semibold text-gray-800 mb-4">Open New Account</h2>
          <div className="flex gap-3 mb-4">
            {(["CHECKING", "SAVINGS", "INVESTMENT"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn("flex-1 py-2 rounded-xl text-sm font-medium border transition-all",
                  type === t ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:border-indigo-400"
                )}
              >{t}</button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button onClick={handleCreate} loading={creating}>Open Account</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {accounts.map((account) => (
          <div key={account.id} className={cn("rounded-2xl p-6 text-white bg-gradient-to-br shadow-lg", typeStyles[account.type])}>
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-medium opacity-80">{account.type}</span>
              <CreditCard className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-3xl font-bold mb-1">{formatCurrency(account.balance, account.currency)}</p>
            <p className="text-sm opacity-70 font-mono tracking-widest">
              {account.accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                account.isActive ? "bg-white/20 text-white" : "bg-red-200 text-red-800"
              )}>{account.isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
