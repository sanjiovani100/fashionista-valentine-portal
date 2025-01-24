import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <main className="min-h-screen bg-black text-white">
      {children}
    </main>
  );
};