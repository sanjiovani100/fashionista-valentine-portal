import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Award } from "lucide-react";

export const EventDetails = () => {
  const features = [
    {
      icon: Heart,
      title: "Exclusive Experience",
      description: "Immerse yourself in a world of luxury and style",
    },
    {
      icon: Star,
      title: "Top Designers",
      description: "Showcase of the most innovative fashion creators",
    },
    {
      icon: Award,
      title: "Empowerment",
      description: "Celebrating creativity and individual expression",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-maroon">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center text-white mb-16">
          The Ultimate Fashion Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-black/40 border-blush/20 text-white">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blush" />
                <h3 className="font-montserrat text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="font-inter text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};