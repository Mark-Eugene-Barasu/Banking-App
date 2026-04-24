import { Landmark } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Landmark className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white tracking-tight">NeoBank</span>
        </div>
        {children}
      </div>
    </div>
  );
}
