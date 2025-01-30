import { OptimizedImage } from "@/components/cloudinary";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  imageUrl: string;
  className?: string;
}

export const HeroBackground = ({ imageUrl, className }: HeroBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0", className)}>
      <OptimizedImage
        publicId={imageUrl}
        alt="Valentine's Fashion Event Background"
        className="w-full h-full object-cover"
        aspectRatio="video"
        priority={true}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px]"
        aria-hidden="true"
      />
    </div>
  );
};