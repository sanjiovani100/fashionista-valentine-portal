import * as React from "react"
import { cx } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div 
      className={cx(
        "w-full overflow-hidden",
        className
      )} 
      {...props}
    >
      <div className="relative flex overflow-hidden">
        <div 
          className={cx(
            "flex min-w-full shrink-0 items-center justify-around gap-4 animate-marquee",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          {children}
        </div>
        <div 
          className={cx(
            "flex min-w-full shrink-0 items-center justify-around gap-4 animate-marquee",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  )
}


