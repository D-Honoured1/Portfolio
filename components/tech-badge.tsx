import type React from "react"
import { cn } from "@/lib/utils"

interface TechBadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary"
}

export function TechBadge({ children, variant = "default" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default",
        variant === "default" &&
          "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:border-accent/40 hover:shadow-accent/30",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 hover:border-accent/30",
      )}
    >
      {children}
    </span>
  )
}
