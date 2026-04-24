"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full px-3 py-2 border rounded-xl text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500",
          error ? "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500" : "border-gray-300 bg-white",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400 animate-fade-in">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
export default Input;
