"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrendingUp, TrendingDown, ArrowLeftRight, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

interface Account { id: string; accountNumber: string; type: string; balance: number; }
interface Transaction { id: string; amount: number; type: string; status: string; description?: string; createdAt: string; }
type Tab = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";

const depositSchema = z.object({ accountId: z.string().min(1), amount: z.number().positive(), description: z.string().optional() });
const withdrawSchema = z.object({ accountId: z.string().min(1), amount: z.number().positive(), description: z.string().optional() });
const transferSchema = z.object({ fromAccountId: z.string().min(1), toAccountNumber: z.string().min(10), amount: z.number().positive(), description: z.string().optional() });
type DepositForm = z.infer<typeof depositSchema>;
type WithdrawForm = z.infer<typeof withdrawSchema>;
type TransferForm = z.infer<typeof transferSchema>;

const selectClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200";

function SuccessAlert({ msg }: { msg: string }) {
  return <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-400 flex items-center gap-2 animate-scale-in"><CheckCircle2 className="w-4 h-4 flex-shrink-0" />{msg}</div>;
}
function ErrorAlert({ msg }: { msg: string }) {
  return <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 animate-scale-in">{msg}</div>;
}

function DepositForm({ accounts, onSuccess }: { accounts: Account[]; onSuccess: () => void }) {
  const [error, setError] = useState(""); const [done, setDone] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DepositForm>({ resolver: zodResolver(depositSchema) });
  const onSubmit = async (data: DepositForm) => {
    try { await api.post("/transactions/deposit", data); reset(); setDone(true); onSuccess(); setTimeout(() => setDone(false), 3000); setError(""); }
    catch (e: any) { setError(e.response?.data?.message || "Failed"); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {done && <SuccessAlert msg="Deposit successful!" />}
      {error && <ErrorAlert msg={error} />}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account</label>
        <select className={selectClass} {...register("accountId")}>
          <option value="">Select account</option>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.type} — ••••{a.accountNumber.slice(-4)} ({formatCurrency(a.balance)})</option>)}
        </select>
        {errors.accountId && <p className="mt-1 text-xs text-red-500">{errors.accountId.message}</p>}
      </div>
      <Input label="Amount (USD)" id="dep-amount" type="number" step="0.01" placeholder="0.00" error={errors.amount?.message} {...register("amount", { valueAsNumber: true })} />
      <Input label="Description (optional)" id="dep-desc" placeholder="e.g. Salary, gift..." {...register("description")} />
      <Button type="submit" loading={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/20">Deposit Funds</Button>
    </form>
  );
}

function WithdrawForm({ accounts, onSuccess }: { accounts: Account[]; onSuccess: () => void }) {
  const [error, setError] = useState(""); const [done, setDone] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<WithdrawForm>({ resolver: zodResolver(withdrawSchema) });
  const onSubmit = async (data: WithdrawForm) => {
    try { await api.post("/transactions/withdraw", data); reset(); setDone(true); onSuccess(); setTimeout(() => setDone(false), 3000); setError(""); }
    catch (e: any) { setError(e.response?.data?.message || "Failed"); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {done && <SuccessAlert msg="Withdrawal successful!" />}
      {error && <ErrorAlert msg={error} />}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account</label>
        <select className={selectClass} {...register("accountId")}>
          <option value="">Select account</option>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.type} — ••••{a.accountNumber.slice(-4)} ({formatCurrency(a.balance)})</option>)}
        </select>
        {errors.accountId && <p className="mt-1 text-xs text-red-500">{errors.accountId.message}</p>}
      </div>
      <Input label="Amount (USD)" id="wd-amount" type="number" step="0.01" placeholder="0.00" error={errors.amount?.message} {...register("amount", { valueAsNumber: true })} />
      <Input label="Description (optional)" id="wd-desc" placeholder="e.g. Rent, groceries..." {...register("description")} />
      <Button type="submit" loading={isSubmitting} variant="danger" className="w-full">Withdraw Funds</Button>
    </form>
  );
}

function TransferForm({ accounts, onSuccess }: { accounts: Account[]; onSuccess: () => void }) {
  const [error, setError] = useState(""); const [done, setDone] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TransferForm>({ resolver: zodResolver(transferSchema) });
  const onSubmit = async (data: TransferForm) => {
    try { await api.post("/transactions/transfer", data); reset(); setDone(true); onSuccess(); setTimeout(() => setDone(false), 3000); setError(""); }
    catch (e: any) { setError(e.response?.data?.message || "Failed"); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {done && <SuccessAlert msg="Transfer successful!" />}
      {error && <ErrorAlert msg={error} />}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Account</label>
        <select className={selectClass} {...register("fromAccountId")}>
          <option value="">Select account</option>
          {accounts.map((a) => <option key={a.id} value={a.id}>{a.type} — ••••{a.accountNumber.slice(-4)} ({formatCurrency(a.balance)})</option>)}
        </select>
        {errors.fromAccountId && <p className="mt-1 text-xs text-red-500">{errors.fromAccountId.message}</p>}
      </div>
      <Input label="Recipient Account Number" id="tr-to" placeholder="10-digit account number" error={errors.toAccountNumber?.message} {...register("toAccountNumber")} />
      <Input label="Amount (USD)" id="tr-amount" type="number" step="0.01" placeholder="0.00" error={errors.amount?.message} {...register("amount", { valueAsNumber: true })} />
      <Input label="Description (optional)" id="tr-desc" placeholder="e.g. Payment, split bill..." {...register("description")} />
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

  const tabs = [
    { key: "DEPOSIT" as Tab, label: "Deposit", icon: TrendingUp, activeColor: "text-green-600 dark:text-green-400 border-green-500" },
    { key: "WITHDRAWAL" as Tab, label: "Withdraw", icon: TrendingDown, activeColor: "text-red-600 dark:text-red-400 border-red-500" },
    { key: "TRANSFER" as Tab, label: "Transfer", icon: ArrowLeftRight, activeColor: "text-indigo-600 dark:text-indigo-400 border-indigo-500" },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Send, receive, and manage your money</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden animate-fade-in-up delay-100 transition-colors duration-300">
          <div className="flex border-b border-gray-100 dark:border-gray-800">
            {tabs.map(({ key, label, icon: Icon, activeColor }) => (
              <button key={key} onClick={() => setTab(key)}
                className={cn("flex-1 flex flex-col items-center gap-1 py-4 text-xs font-semibold transition-all duration-200 border-b-2",
                  tab === key ? `${activeColor} bg-gray-50 dark:bg-gray-800/50` : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                )}>
                <Icon className="w-4 h-4" />{label}
              </button>
            ))}
          </div>
          <div className="p-5">
            {tab === "DEPOSIT" && <DepositForm accounts={accounts} onSuccess={fetchAll} />}
            {tab === "WITHDRAWAL" && <WithdrawForm accounts={accounts} onSuccess={fetchAll} />}
            {tab === "TRANSFER" && <TransferForm accounts={accounts} onSuccess={fetchAll} />}
          </div>
        </div>

        {/* History Panel */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden animate-fade-in-up delay-200 transition-colors duration-300">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">Transaction History</h2>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">{transactions.length} total</span>
          </div>
          {loading ? (
            <div className="p-4 space-y-3">
              {[1,2,3,4].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-16 text-gray-400 dark:text-gray-600 text-sm">
              <ArrowLeftRight className="w-8 h-8 mx-auto mb-2 opacity-30" />No transactions yet
            </div>
          ) : (
            <ul className="divide-y divide-gray-50 dark:divide-gray-800 max-h-[540px] overflow-y-auto">
              {transactions.map((tx, i) => (
                <li key={tx.id}
                  className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 animate-fade-in-up"
                  style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                      tx.type === "DEPOSIT" ? "bg-green-100 dark:bg-green-900/30" : tx.type === "WITHDRAWAL" ? "bg-red-100 dark:bg-red-900/30" : "bg-indigo-100 dark:bg-indigo-900/30"
                    )}>
                      {tx.type === "DEPOSIT" ? <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" /> :
                       tx.type === "WITHDRAWAL" ? <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" /> :
                       <ArrowLeftRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tx.description || tx.type}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(tx.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold",
                      tx.type === "DEPOSIT" ? "text-green-600 dark:text-green-400" : tx.type === "WITHDRAWAL" ? "text-red-600 dark:text-red-400" : "text-indigo-600 dark:text-indigo-400"
                    )}>
                      {tx.type === "DEPOSIT" ? "+" : "-"}{formatCurrency(tx.amount)}
                    </p>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                      tx.status === "COMPLETED" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    )}>{tx.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
