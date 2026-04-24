"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      setError("");
      const res = await api.post("/auth/login", data);
      setUser(res.data.user);
      router.push("/dashboard");
    } catch (err: any) { setError(err.response?.data?.message || "Login failed"); }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your CryptoBanking account</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl flex items-center gap-3 animate-scale-in">
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-red-500 text-sm font-bold">!</span>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
          <Input label="Email address" id="email" type="email" placeholder="you@example.com"
            error={errors.email?.message} className="pl-10" {...register("email")} />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
          <Input label="Password" id="password" type="password" placeholder="••••••••"
            error={errors.password?.message} className="pl-10" {...register("password")} />
        </div>
        <Button type="submit" className="w-full mt-2" size="lg" loading={isSubmitting}>Sign In to CryptoBanking</Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
