import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default:
    "bg-slate-900 text-white hover:bg-slate-800 border border-transparent",
  secondary:
    "bg-white/60 text-slate-900 hover:bg-white/80 border border-white/60",
  outline:
    "bg-transparent text-slate-900 border border-slate-300 hover:bg-slate-100",
};

export const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const sizing =
      size === "sm"
        ? "h-9 px-3 text-sm"
        : size === "lg"
        ? "h-12 px-5 text-base"
        : "h-10 px-4 text-sm";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant] || variants.default,
          sizing,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
