import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

function Feature() {
  return (
    <section className="w-full py-20 lg:py-40 bg-pure-black">
      <div className="container mx-auto">
        <div className="grid border border-white/10 rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">Sponsorship</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-montserrat font-bold">
                  Why Sponsor Fashionistas Valentine's Event?
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-white/80 max-w-xl text-left font-inter">
                  Connect with an exclusive audience of fashion industry leaders, designers, 
                  and influencers in an intimate setting designed for meaningful interactions.
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-fashion-pink" />
                <div className="flex flex-col gap-1">
                  <p className="font-inter">Premium Brand Visibility</p>
                  <p className="text-white/80 text-sm font-inter">
                    Showcase your brand throughout the event venue
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-fashion-pink" />
                <div className="flex flex-col gap-1">
                  <p className="font-inter">VIP Networking</p>
                  <p className="text-white/80 text-sm font-inter">
                    Connect with industry leaders and influencers
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-fashion-pink" />
                <div className="flex flex-col gap-1">
                  <p className="font-inter">Strategic Placement</p>
                  <p className="text-white/80 text-sm font-inter">
                    Product placement and activation opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
            <img
              src="/lovable-uploads/252b7b0b-6130-4274-b1dc-f368cd218a9d.png"
              alt="Fashion model in an elegant black dress with cutout detail, showcasing high-end fashion design against a neutral background"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Feature };