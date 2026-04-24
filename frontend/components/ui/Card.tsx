import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const Card = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-white rounded-2xl shadow-sm border border-gray-100 p-6", className)} {...props}>
    {children}
  </div>
);

export default Card;
