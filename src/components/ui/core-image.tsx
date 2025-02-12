import React, { useState } from "react";
import { cx } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CoreImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackUrl?: string;
  showLoadingState?: boolean;
  showErrorState?: boolean;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  auto: "aspect-auto"
};

export const CoreImage = ({
  src,
  alt,
  className,
  fallbackUrl = "/placeholder.svg",
  showLoadingState = true,
  showErrorState = true,
  aspectRatio = "auto",
  ...props
}: CoreImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (currentSrc !== fallbackUrl) {
      setCurrentSrc(fallbackUrl);
    }
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div className={cx("relative", aspectRatioClasses[aspectRatio], className)}>
      {showLoadingState && isLoading && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {showErrorState && hasError && (
        <Alert variant="destructive" className="absolute inset-0 flex items-center">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load image
          </AlertDescription>
        </Alert>
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cx(
          "w-full h-full object-cover",
          isLoading && "opacity-0",
          hasError && "opacity-0"
        )}
        {...props}
      />
    </div>
  );
};


