import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { OptimizedImage } from "@/components/cloudinary";
import { toast } from "sonner";
import type { EventContent, FashionImage } from "@/types/event.types";

interface EventHighlightsProps {
  highlights: (EventContent & { image: string })[];
  images: FashionImage[];
}

export const EventHighlights = ({ highlights, images }: EventHighlightsProps) => {
  console.log("EventHighlights received props:", { 
    highlights: highlights.map(h => ({
      title: h.title,
      image: h.image,
      mediaUrls: h.media_urls
    })),
    imagesCount: images.length 
  });

  return (
    <section className="py-20 bg-gradient-to-br from-black to-[#2B0000] relative overflow-hidden">
      {/* Floating hearts background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute animate-float-1 top-1/4 left-1/4">❤</div>
        <div className="absolute animate-float-2 top-1/2 right-1/3">❤</div>
        <div className="absolute animate-float-3 bottom-1/4 right-1/4">❤</div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair text-white text-center mb-12 animate-fade-in">
          Event Highlights
        </h2>

        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => {
            console.log(`Rendering highlight ${index}:`, {
              title: highlight.title,
              image: highlight.image
            });
            
            return (
              <Card 
                key={highlight.id} 
                className="bg-black/60 border-none text-white hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                  <OptimizedImage
                    publicId={highlight.image}
                    alt={highlight.title}
                    aspectRatio="portrait"
                    className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl">{highlight.title}</CardTitle>
                  <CardDescription className="text-gray-300 font-montserrat">
                    {highlight.content}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full bg-red-deep hover:bg-red-dark text-white transition-colors"
                    onClick={() => toast.success(`Learn more about ${highlight.title}`)}
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Mobile view with carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {highlights.map((highlight, index) => (
                <CarouselItem key={highlight.id}>
                  <Card className="bg-black/60 border-none text-white">
                    <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        publicId={highlight.image}
                        alt={highlight.title}
                        aspectRatio="portrait"
                        className="w-full h-full"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-playfair text-2xl">{highlight.title}</CardTitle>
                      <CardDescription className="text-gray-300 font-montserrat">
                        {highlight.content}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full bg-red-deep hover:bg-red-dark text-white transition-colors"
                        onClick={() => toast.success(`Learn more about ${highlight.title}`)}
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white border-white" />
            <CarouselNext className="text-white border-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};