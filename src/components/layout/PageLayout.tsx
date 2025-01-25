import { ReactNode, useEffect } from "react";
import { Footerdemo } from "@/components/ui/footer-section";
import { initScrollReveal } from "@/utils/scrollReveal";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <main className="min-h-screen bg-black text-white scroll-snap-container">
      {children}
      <Footerdemo />
    </main>
  );
};