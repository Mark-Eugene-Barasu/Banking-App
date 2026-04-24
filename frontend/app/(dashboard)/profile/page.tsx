"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, Phone, MapPin, CheckCircle2, Shield, Calendar } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (user) reset({ firstName: user.firstName, lastName: user.lastName, phone: user.phone || "", address: user.address || "" });
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.patch("/users/profile", data);
      setUser({ ...user!, ...res.data });
      setSuccess(true); setError("");
      setTimeout(() => setSuccess(false), 3000);
    } catch { setError("Failed to update profile"); }
  };

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-gray-900 to-indigo-950 rounded-2xl p-6 text-white animate-fade-in-up delay-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/30 flex-shrink-0 animate-pulse-ring">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-3.5 h-3.5 text-indigo-300" />
              <p className="text-indigo-200 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 text-xs font-medium">Verified</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          <div>
            <p className="text-xs text-gray-400">Accounts</p>
            <p className="text-lg font-bold">{user?.accounts?.length || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p className="text-sm font-medium truncate">{user?.phone || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Member since</p>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-sm font-medium">2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 animate-fade-in-up delay-200 transition-colors duration-300">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-5">Edit Information</h3>

        {success && (
          <div className="mb-5 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl flex items-center gap-3 animate-scale-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">Profile updated successfully!</p>
          </div>
        )}
        {error && (
          <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 animate-scale-in">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First Name" id="firstName" error={errors.firstName?.message} {...register("firstName")} />
            <Input label="Last Name" id="lastName" error={errors.lastName?.message} {...register("lastName")} />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
            <Input label="Email address" id="email" type="email" value={user?.email || ""}
              disabled className="pl-10 opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800" />
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Email cannot be changed</p>
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
            <Input label="Phone number" id="phone" type="tel" placeholder="+1 234 567 8900" className="pl-10" {...register("phone")} />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-9 w-4 h-4 text-gray-400" />
            <Input label="Address" id="address" placeholder="123 Main St, City, State" className="pl-10" {...register("address")} />
          </div>
          <Button type="submit" loading={isSubmitting} className="shadow-md shadow-indigo-500/20">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
