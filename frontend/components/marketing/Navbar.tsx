"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Coins } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-200">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Crypto</span>
              <span className="text-lg font-black text-emerald-500 tracking-tight">Banking</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200">
                {label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Sign In
            </Link>
            <Link href="/register"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95">
              Get Started Free
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 dark:text-gray-300 p-1">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-4 py-4 space-y-3 animate-fade-in">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 py-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <Link href="/login" onClick={() => setMobileOpen(false)}
              className="text-center py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-emerald-400 transition-colors">
              Sign In
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}
              className="text-center py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold rounded-xl">
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
