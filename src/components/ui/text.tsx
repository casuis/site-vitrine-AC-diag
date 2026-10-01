import * as React from "react"

import { cn } from "@/lib/utils"

type TextStyle = 1 | 2 | 3 | 4

interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, "style"> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label" | "small"
  style?: TextStyle
  text?: string
  children?: React.ReactNode
}

const textStyles: Record<TextStyle, string> = {
  1: "text-4xl font-bold leading-tight tracking-[-0.03em] text-[#164480] sm:text-5xl lg:text-6xl",
  2: "text-3xl font-bold leading-tight tracking-[-0.03em] text-[#164480] sm:text-4xl",
  3: "text-[11px] font-semibold uppercase tracking-[0.32em] text-[#164480]",
  4: "text-sm font-medium leading-6 text-[#164480]/80",
}

export function Text({
  as: Component = "p",
  style = 4,
  text,
  children,
  className,
  ...props
}: TextProps) {
  const content = children ?? text ?? ""

  return React.createElement(
    Component,
    {
      ...props,
      className: cn(textStyles[style], className),
    },
    content,
  )
}
