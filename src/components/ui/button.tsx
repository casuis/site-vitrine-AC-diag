import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_12px_28px_-14px_rgba(15,23,42,0.6)] hover:bg-yellow-700 hover:text-[#164480] hover:shadow-[0_16px_30px_-14px_rgba(15,23,42,0.7)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_10px_24px_-14px_rgba(15,23,42,0.55)] hover:bg-yellow-700 hover:text-[#164480] hover:shadow-[0_14px_28px_-14px_rgba(15,23,42,0.65)]",
        outline:
          "border border-input bg-background shadow-[0_8px_18px_-14px_rgba(15,23,42,0.45)] hover:border-yellow-700 hover:bg-yellow-700 hover:text-[#164480] hover:shadow-[0_12px_22px_-14px_rgba(15,23,42,0.55)]",
        ghost: "hover:bg-yellow-700 hover:text-[#164480]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
