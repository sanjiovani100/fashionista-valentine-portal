import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { EventContent, FashionImage } from "@/types/event.types";

interface EventHighlightsProps {
  highlights: (EventContent & { image: string })[];
  images: FashionImage[];
}

export const EventHighlights = ({ highlights, images }: EventHighlightsProps) => {
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
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-black/60 border-none text-white hover:scale-105 transition-transform duration-300 group">
              <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                <Button className="w-full bg-blush hover:bg-gray-500 text-black hover:text-white transition-colors">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mobile view with carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {highlights.map((highlight, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-black/60 border-none text-white">
                    <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-full object-cover"
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
                      <Button className="w-full bg-blush hover:bg-gray-500 text-black hover:text-white transition-colors">
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