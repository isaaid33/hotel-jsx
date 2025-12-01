import React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className = "", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-slate-900/10 text-slate-900 px-3 py-1 text-xs font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
