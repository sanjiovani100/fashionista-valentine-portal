import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Partner {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  image: string;
}

interface RoleCard {
  title: string;
  subtitle: string;
  benefits: string[];
  ctaText: string;
  path: string;
  testimonial: Partner;
}

const roleCards: RoleCard[] = [
  {
    title: "Walk the Runway",
    subtitle: "Join our exclusive modeling team",
    benefits: [
      "Professional portfolio opportunities",
      "Network with top designers",
      "International exposure",
      "Professional training sessions"
    ],
    ctaText: "Join as Model",
    path: "/register/model",
    testimonial: {
      id: 1,
      name: "Sofia Martinez",
      role: "Lead Model",
      testimonial: "Being part of Fashionistas opened doors I never imagined possible.",
      image: "/placeholder.svg"
    }
  },
  {
    title: "Showcase Your Collection",
    subtitle: "Present your designs to the world",
    benefits: [
      "Media exposure",
      "Industry connections",
      "Dedicated showcase space",
      "Marketing support"
    ],
    ctaText: "Join as Designer",
    path: "/register/designer",
    testimonial: {
      id: 2,
      name: "Carlos Rivera",
      role: "Fashion Designer",
      testimonial: "The platform gave my collection the visibility it deserved.",
      image: "/placeholder.svg"
    }
  },
  {
    title: "Partner With Us",
    subtitle: "Elevate your brand presence",
    benefits: [
      "Brand visibility",
      "VIP access",
      "Networking opportunities",
      "Premium positioning"
    ],
    ctaText: "Become a Sponsor",
    path: "/register/sponsor",
    testimonial: {
      id: 3,
      name: "Luxury Brand Co",
      role: "Premium Sponsor",
      testimonial: "Our partnership with Fashionistas exceeded all expectations.",
      image: "/placeholder.svg"
    }
  }
];

export const Partners = () => {
  const navigate = useNavigate();

  const handleRegistration = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-20 bg-pure-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins text-pure-black mb-4">Join the Experience</h2>
          <p className="text-xl text-gray-400 font-montserrat">Choose your role in this extraordinary event</p>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory">
          {roleCards.map((card, index) => (
            <motion.div
              key={index}
              className="snap-center shrink-0 w-full md:w-[400px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-pure-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-poppins text-pure-black mb-2">{card.title}</h3>
                  <p className="text-gray-400 font-montserrat mb-6">{card.subtitle}</p>
                  
                  <div className="space-y-4 mb-8">
                    {card.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-red-soft/10 text-red-deep">
                          ✦
                        </Badge>
                        <span className="text-gray-400">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={card.testimonial.image}
                        alt={card.testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-montserrat font-medium text-pure-black">{card.testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{card.testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 italic">{card.testimonial.testimonial}</p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={() => handleRegistration(card.path)}
                    className="w-full bg-red-deep hover:bg-red-dark text-pure-white transition-colors"
                  >
                    {card.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 font-montserrat">
            Limited spots available. Register now to secure your place.
          </p>
        </div>
      </div>
    </section>
  );
};