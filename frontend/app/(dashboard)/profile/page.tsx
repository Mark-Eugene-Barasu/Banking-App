"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, refreshUser, setUser } = useAuthStore();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) reset({ firstName: user.firstName, lastName: user.lastName, phone: user.phone || "", address: user.address || "" });
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.patch("/users/profile", data);
      setUser({ ...user!, ...res.data });
      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">Profile updated successfully!</div>}
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" id="firstName" error={errors.firstName?.message} {...register("firstName")} />
            <Input label="Last Name" id="lastName" error={errors.lastName?.message} {...register("lastName")} />
          </div>
          <Input label="Email" id="email" type="email" value={user?.email || ""} disabled className="opacity-60 cursor-not-allowed" />
          <Input label="Phone" id="phone" type="tel" placeholder="+1 234 567 8900" {...register("phone")} />
          <Input label="Address" id="address" placeholder="123 Main St, City, State" {...register("address")} />
          <Button type="submit" loading={isSubmitting}>Save Changes</Button>
        </form>
      </Card>
    </div>
  );
}
