"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-surface transition-all duration-300",
        collapsed ? "w-12" : "w-64",
        className,
      )}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-10 items-center justify-center border-b border-border text-text-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            collapsed && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      {!collapsed && <div className="flex-1 overflow-y-auto p-4">{children}</div>}
    </aside>
  );
}
