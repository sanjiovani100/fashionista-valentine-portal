import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  backgroundImage: string;
  className?: string;
}

export const HeroBackground = ({ backgroundImage, className }: HeroBackgroundProps) => {
  return (
    <>
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-110",
          className
        )}
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90 backdrop-blur-sm"
        aria-hidden="true"
      />
    </>
  );
};