import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const showcaseItems = [
  {
    id: 1,
    title: "Elegant Lace Collection",
    description: "Exquisite handcrafted lace designs for the modern woman",
    image: "/placeholder.svg", // Replace with actual image path
    designer: "Isabella Rose",
  },
  {
    id: 2,
    title: "Silk & Satin Dreams",
    description: "Luxurious silk pieces that embrace feminine beauty",
    image: "/placeholder.svg", // Replace with actual image path
    designer: "Marie Laurent",
  },
  {
    id: 3,
    title: "Valentine's Special",
    description: "Limited edition pieces for an unforgettable evening",
    image: "/placeholder.svg", // Replace with actual image path
    designer: "Sofia Amore",
  },
  {
    id: 4,
    title: "Romantic Essentials",
    description: "Timeless pieces with a modern twist",
    image: "/placeholder.svg", // Replace with actual image path
    designer: "Luna Night",
  },
  {
    id: 5,
    title: "Luxury Collection",
    description: "Premium designs for the sophisticated soul",
    image: "/placeholder.svg", // Replace with actual image path
    designer: "Victoria Grace",
  },
];

export const LingerieShowcase = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative py-16 bg-black min-h-screen" ref={ref}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-8 w-8 text-romantic opacity-20 animate-float-1 left-1/4 top-1/4">❤</div>
        <div className="absolute h-8 w-8 text-blush opacity-20 animate-float-2 left-2/3 top-1/3">❤</div>
        <div className="absolute h-8 w-8 text-passion opacity-20 animate-float-3 left-1/2 top-2/3">❤</div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold font-montserrat text-white text-center mb-12 fade-up ${inView ? 'in-view' : ''}`}>
          Luxury Lingerie Showcase
        </h2>

        <Carousel className={`w-full max-w-5xl mx-auto fade-up ${inView ? 'in-view' : ''}`}>
          <CarouselContent>
            {showcaseItems.map((item, index) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="showcase-item bg-black border-gray-800 overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-xl font-montserrat font-bold mb-2">{item.title}</h3>
                          <p className="text-sm font-inter text-gray-300 mb-4">{item.description}</p>
                          <p className="text-blush font-montserrat mb-4">By {item.designer}</p>
                          <Button 
                            className="w-full bg-passion hover:bg-passion/90 text-white transition-all duration-300 hover:shadow-glow"
                          >
                            Explore Collection
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-gray-800/50 hover:bg-passion text-white border-none" />
          <CarouselNext className="hidden md:flex bg-gray-800/50 hover:bg-passion text-white border-none" />
        </Carousel>
      </div>
    </section>
  );
};