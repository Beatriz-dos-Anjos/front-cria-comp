import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-400 via-red-400 to-red-500 text-white shadow-2xl hover:shadow-orange-500/25 hover:from-orange-500 hover:via-red-500 hover:to-red-600 transform hover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        ocean:
          "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white shadow-2xl hover:shadow-blue-500/25 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 transform hover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        wave: "bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 text-white shadow-2xl hover:shadow-cyan-400/25 hover:from-cyan-500 hover:via-blue-500 hover:to-blue-600 transform hover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        coral:
          "bg-gradient-to-r from-pink-400 via-orange-400 to-red-400 text-white shadow-2xl hover:shadow-pink-400/25 hover:from-pink-500 hover:via-orange-500 hover:to-red-500 transform hover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        seaweed:
          "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 text-white shadow-2xl hover:shadow-green-400/25 hover:from-green-500 hover:via-emerald-500 hover:to-teal-600 transform hover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        pearl:
          "bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600 text-white shadow-2xl hover:shadow-purple-400/25 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-700 transform hover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        transparent:
          "bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 shadow-2xl hover:bg-white/20 hover:border-white/40 hover:shadow-white/10 transform hover:scale-105 hover:-translate-y-1 active:scale-95",
        ghost:
          "text-white hover:bg-white/10 hover:text-white/90 border border-white/10 hover:border-white/30 transform hover:scale-105 active:scale-95 backdrop-blur-sm",
        outline:
          "border-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:border-white/60 transform hover:scale-105 hover:-translate-y-1 active:scale-95 backdrop-blur-sm shadow-lg",
        destructive:
          "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-2xl hover:shadow-red-500/25 hover:from-red-600 hover:via-red-700 hover:to-red-800 transform hover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-12 w-12",
      },
      glow: {
        none: "",
        soft: "shadow-2xl shadow-current/20",
        strong: "shadow-2xl shadow-current/40 drop-shadow-lg",
        neon: "shadow-2xl shadow-current/60 drop-shadow-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "none",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, asChild = false, loading = false, icon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glow, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent mr-2" />
        )}
        {!loading && icon && <span className="flex items-center relative z-10">{icon}</span>}
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
