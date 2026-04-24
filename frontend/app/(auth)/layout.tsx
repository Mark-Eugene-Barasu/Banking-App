import { Coins } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black text-white">Crypto</span>
            <span className="text-2xl font-black text-emerald-400">Banking</span>
          </div>
        </div>
        <div className="relative space-y-6 animate-fade-in-up">
          <h1 className="text-4xl font-black text-white leading-tight">Banking made<br />simple & secure.</h1>
          <p className="text-emerald-200 text-lg leading-relaxed">Manage your accounts, transfer funds, and track every transaction — all in one beautiful place.</p>
          <div className="flex gap-8 pt-4">
            {[["99.9%", "Uptime"], ["256-bit", "Encryption"], ["24/7", "Support"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-3xl font-black text-white">{val}</p>
                <p className="text-emerald-300 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-emerald-700 text-sm">© 2025 CryptoBanking. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">Dark mode</span>
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md animate-scale-in">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-gray-900 dark:text-white">Crypto</span>
              <span className="text-xl font-black text-emerald-500">Banking</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
