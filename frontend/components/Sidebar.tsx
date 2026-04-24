"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CreditCard, ArrowLeftRight, User, LogOut, Coins, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Accounts", icon: CreditCard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/profile", label: "Profile", icon: User },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse-ring">
          <Coins className="w-5 h-5 text-white" />
        </div>
        <div>
          <div><span className="text-lg font-black text-white">Crypto</span><span className="text-lg font-black text-emerald-400">Banking</span></div>
          <p className="text-xs text-gray-500">Personal Banking</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 mb-3">Menu</p>
        {links.map(({ href, label, icon: Icon }, i) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={onNavigate}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group animate-slide-left",
                `delay-${(i + 1) * 100}`,
                active ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-4 h-4 transition-transform duration-200 group-hover:scale-110", active ? "text-white" : "text-gray-500 group-hover:text-white")} />
                {label}
              </div>
              {active && <ChevronRight className="w-4 h-4 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="px-6 py-3 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Dark Mode</span>
          <ThemeToggle />
        </div>
      </div>

      {/* User + Logout */}
      <div className="px-3 pb-4 space-y-2">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group">
          <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
            <Coins className="w-4 h-4 text-white" />
          </div>
          <div><span className="text-base font-black text-white">Crypto</span><span className="text-base font-black text-emerald-400">Banking</span></div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(true)} className="text-gray-400 hover:text-white transition-colors p-1">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 bg-gray-950 h-full shadow-2xl animate-slide-left">
            <button onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-gray-950 flex-col flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
