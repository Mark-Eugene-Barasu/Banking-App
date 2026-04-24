"use client";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggle } = useThemeStore();

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        isDark ? "bg-indigo-600" : "bg-gray-300",
        className
      )}
      aria-label="Toggle dark mode"
    >
      <span className={cn(
        "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300",
        isDark ? "translate-x-6" : "translate-x-0"
      )}>
        {isDark
          ? <Moon className="w-3 h-3 text-indigo-600" />
          : <Sun className="w-3 h-3 text-yellow-500" />
        }
      </span>
    </button>
  );
}
