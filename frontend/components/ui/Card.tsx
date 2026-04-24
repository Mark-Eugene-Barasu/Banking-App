import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const Card = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors duration-300", className)} {...props}>
    {children}
  </div>
);

export default Card;
