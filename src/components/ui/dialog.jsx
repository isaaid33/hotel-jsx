import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const DialogContext = createContext(null);

export function Dialog({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild = false }) {
  const ctx = useContext(DialogContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props?.onClick?.(e);
        ctx?.setOpen(true);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={() => ctx?.setOpen(true)}
      className="text-sm font-medium text-slate-900"
    >
      {children}
    </button>
  );
}

export function DialogContent({ children, className = "" }) {
  const ctx = useContext(DialogContext);
  if (!ctx?.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className={cn(
          "relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-white/60 p-6",
          className
        )}
      >
        <button
          aria-label="Cerrar"
          className="absolute right-3 top-3 rounded-full bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-700"
          onClick={() => ctx?.setOpen(false)}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className = "", ...props }) {
  return <div className={cn("mb-3", className)} {...props} />;
}

export function DialogTitle({ className = "", ...props }) {
  return (
    <h4 className={cn("text-lg font-semibold leading-tight", className)} {...props} />
  );
}
