import { LingerieShowcase } from "@/components/sections/lingerie-showcase/LingerieShowcase";
import type { FashionCollection } from "@/types/event.types";

interface LingerieShowcaseSectionProps {
  collections: (FashionCollection & { 
    image: string;
    isLoading?: boolean;
    error?: Error;
  })[];
}

export const LingerieShowcaseSection = ({ collections }: LingerieShowcaseSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-maroon/10 to-black py-24">
      <div className="container mx-auto px-4 md:px-8">
        <LingerieShowcase collections={collections} />
      </div>
    </section>
  );
};