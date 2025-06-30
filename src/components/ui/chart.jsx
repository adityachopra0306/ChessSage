import * as React from "react"
import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef(({ className, config, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      style={{
        "--color-rating": "hsl(160 60% 45%)",
        "--color-accuracy": "hsl(30 80% 55%)",
      }}
      {...props}
    >
      {children}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">{entry.dataKey}</span>
              <span className="font-bold text-muted-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

const ChartTooltipContent = ChartTooltip

export { ChartContainer, ChartTooltip, ChartTooltipContent }
