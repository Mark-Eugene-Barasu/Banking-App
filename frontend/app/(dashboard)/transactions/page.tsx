"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrendingUp, TrendingDown, ArrowLeftRight } from "lucide-react";
import api from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

interface Account { id: string; accountNumber: string; type: string; balance: number; }
interface Transaction {
  id: string; amount: number; type: string; status: string;
  description?: string; createdAt: string;
}

type Tab = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";

const depositSchema = z.object({ accountId: z.string().min(1), amount: z.coerce.number().positive(), description: z.string().optional() });
const withdrawSchema = z.object({ accountId: z.string().min(1), amount: z.coerce.number().positive(), description: z.string().optional() });
const transferSchema = z.object({ fromAccountId: z.string().min(1), toAccountNumber: z.string().min(10), amount: z.coerce.number().positive(), description: z.string().optional() });

type DepositForm = z.infer<typeof depositSchema>;
type WithdrawForm = z.infer<typeof withdrawSchema>;
type TransferForm = z.infer<typeof transferSchema>;

function DepositForm({ accounts, onSuccess }: { accounts: Account[]; onSuccess: () => void }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DepositForm>({ resolver: zodResolver(depositSchema) });
  const onSubmit = async (data: DepositForm) => {
    try { await api.post("/transactions/deposit", data); reset(); onSuccess(); setError(""); }
    catch (e: any) { setError(e.response?.data?.message || "Failed"); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register("accountId")}>
          <option value="">Select account</option>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.type} — ••••{a.accountNumber.slice(-4)} ({formatCurrency(a.balance)})</option>)}
        </select>
        {errors.accountId && <p className="mt-1 text-xs text-red-500">{errors.accountId.message}</p>}
      </div>
      <Input label="Amount ($)" id="dep-amount" type="number" step="0.01" placeholder="0.00" error={errors.amount?.message} {...register("amount")} />
      <Input label="Description (optional)" id="dep-desc" placeholder="Salary, gift..." {...register("description")} />
      <Button type="submit" loading={isSubmitting} className="w-full">Deposit Funds</Button>
    </form>
  );
}

function WithdrawForm({ accounts, onSuccess }: { accounts: Account[]; onSuccess: () => void }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<WithdrawForm>({ resolver: zodResolver(withdrawSchema) });
  const onSubmit = async (data: WithdrawForm) => {
    try { await api.post("/transactions/withdraw", data); reset(); onSuccess(); setError(""); }
    catch (e: any) { setError(e.response?.data?.message || "Failed"); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register("accountId")}>
          <option value="">Select account</option>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.type} — ••••{a.accountNumber.slice(-4)} ({formatCurrency(a.balance)})</option>)}
        </select>
        {errors.accountId && <p className="mt-1 text-xs text-red-500">{errors.accountId.message}</p>}
      </div>
      <Input label="Amount ($)" id="wd-amount" type="number" step="0.01" placeholder="0.00" error={errors.amount?.message} {...register("amount")} />
      <Input label="Description (optional)" id="wd-desc" placeholder="Rent, groceries..." {...register("description")} />
      <Button type="submit" loading={isSubmitting} className="w-full" variant="danger">Withdraw Funds</Button>
    </form>
  );
}

function TransferForm({ accounts, onSuccess }: { accounts: Account[]; onSuccess: () => void }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TransferForm>({ resolver: zodResolver(transferSchema) });
  const onSubmit = async (data: TransferForm) => {
    try { await api.post("/transactions/transfer", data); reset(); onSuccess(); setError(""); }
    catch (e: any) { setError(e.response?.data?.message || "Failed"); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register("fromAccountId")}>
          <option value="">Select account</option>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.type} — ••••{a.accountNumber.slice(-4)} ({formatCurrency(a.balance)})</option>)}
        </select>
        {errors.fromAccountId && <p className="mt-1 text-xs text-red-500">{errors.fromAccountId.message}</p>}
      </div>
      <Input label="Recipient Account Number" id="tr-to" placeholder="10-digit account number" error={errors.toAccountNumber?.message} {...register("toAccountNumber")} />
      <Input label="Amount ($)" id="tr-amount" type="number" step="0.01" placeholder="0.00" error={errors.amount?.message} {...register("amount")} />
      <Input label="Description (optional)" id="tr-desc" placeholder="Payment, split bill..." {...register("description")} />
      <Button type="submit" loading={isSubmitting} className="w-full">Send Transfer</Button>
    </form>
  );
}

export default function TransactionsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tab, setTab] = useState<Tab>("DEPOSIT");
  const [loading, setLoading] = useState(true);

  const fetchAll = () =>
    Promise.all([api.get("/accounts"), api.get("/transactions")]).then(([a, t]) => {
      setAccounts(a.data); setTransactions(t.data); setLoading(false);
    });

  useEffect(() => { fetchAll(); }, []);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "DEPOSIT", label: "Deposit", icon: <TrendingUp className="w-4 h-4" /> },
    { key: "WITHDRAWAL", label: "Withdraw", icon: <TrendingDown className="w-4 h-4" /> },
    { key: "TRANSFER", label: "Transfer", icon: <ArrowLeftRight className="w-4 h-4" /> },
  ];

  const typeColor = (type: string) =>
    type === "DEPOSIT" ? "text-green-600" : type === "WITHDRAWAL" ? "text-red-600" : "text-blue-600";

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">Send, receive, and manage money</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
            {tabs.map(({ key, label, icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={cn("flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all",
                  tab === key ? "bg-white shadow text-indigo-600" : "text-gray-500 hover:text-gray-700"
                )}>
                {icon}{label}
              </button>
            ))}
          </div>
          {tab === "DEPOSIT" && <DepositForm accounts={accounts} onSuccess={fetchAll} />}
          {tab === "WITHDRAWAL" && <WithdrawForm accounts={accounts} onSuccess={fetchAll} />}
          {tab === "TRANSFER" && <TransferForm accounts={accounts} onSuccess={fetchAll} />}
        </Card>

        <Card className="lg:col-span-3 p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Transaction History</h2>
          </div>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">No transactions yet</p>
          ) : (
            <ul className="divide-y divide-gray-50 max-h-[520px] overflow-y-auto">
              {transactions.map((tx) => (
                <li key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{tx.description || tx.type}</p>
                    <p className="text-xs text-gray-400">{formatDate(tx.createdAt)}</p>
                    <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium",
                      tx.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    )}>{tx.status}</span>
                  </div>
                  <span className={cn("text-sm font-bold", typeColor(tx.type))}>
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
