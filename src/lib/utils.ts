import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200",
  // border color
  "focus:border-blue-500",
]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500",
]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500",
  // ring color
  "ring-red-200",
]


