import { cn } from "@/lib/utils";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "px-4 py-2 bg-red-deep text-white rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-red-soft focus:ring-offset-2",
        "transition-transform duration-200 hover:scale-105"
      )}
    >
      Skip to main content
    </a>
  );
}