import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className = "", ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white shadow-sm transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return (
    <div className={cn("p-4 sm:p-6 border-b border-white/40", className)} {...props} />
  );
}

export function CardTitle({ className = "", ...props }) {
  return (
    <h3 className={cn("text-lg font-semibold leading-tight", className)} {...props} />
  );
}

export function CardContent({ className = "", ...props }) {
  return <div className={cn("p-4 sm:p-6", className)} {...props} />;
}
