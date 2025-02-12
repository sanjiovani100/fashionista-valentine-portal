import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { SponsorshipLevel } from '@/i18n/types';

const sponsorshipLevels: readonly SponsorshipLevel[] = ['gold', 'silver', 'bronze'] as const;

export const SponsorshipLevels = () => {
  const { t } = useTranslation('sponsors');

  const getLevelTranslation = (level: SponsorshipLevel, key: 'title' | 'description'): string => {
    return t(`sponsorshipLevels.levels.${level}.${key}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black to-[#2B0000] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute animate-float-1 top-1/4 left-1/4">❤</div>
        <div className="absolute animate-float-2 top-1/2 right-1/3">❤</div>
        <div className="absolute animate-float-3 bottom-1/4 right-1/4">❤</div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair text-white text-center mb-4 animate-fade-in">
          {t('sponsorshipLevels.title')}
        </h2>
        <p className="text-xl text-gray-300 text-center mb-12 animate-fade-in">
          {t('sponsorshipLevels.subtitle')}
        </p>

        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {sponsorshipLevels.map((level) => (
            <Card key={level} className="bg-black/60 border-none text-white hover:scale-105 transition-transform duration-300 group">
              <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt={getLevelTranslation(level, 'title')}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">
                  {getLevelTranslation(level, 'title')}
                </CardTitle>
                <CardDescription className="text-gray-300 font-montserrat">
                  {getLevelTranslation(level, 'description')}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-fashion-pink hover:bg-deep-purple text-white transition-colors">
                  {t('sponsorshipLevels.cta')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mobile view with carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {sponsorshipLevels.map((level) => (
                <CarouselItem key={level}>
                  <Card className="bg-black/60 border-none text-white">
                    <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                      <img
                        src="/placeholder.svg"
                        alt={getLevelTranslation(level, 'title')}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-playfair text-2xl">
                        {getLevelTranslation(level, 'title')}
                      </CardTitle>
                      <CardDescription className="text-gray-300 font-montserrat">
                        {getLevelTranslation(level, 'description')}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full bg-fashion-pink hover:bg-deep-purple text-white transition-colors">
                        {t('sponsorshipLevels.cta')}
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


