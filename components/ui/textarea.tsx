import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-gray-800 ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:border-white/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/98 resize-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
