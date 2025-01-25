import { ReactNode } from "react";
import { Footerdemo } from "@/components/ui/footer-section";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="min-h-screen bg-black text-white">
      {children}
      <Footerdemo />
    </main>
  );
};