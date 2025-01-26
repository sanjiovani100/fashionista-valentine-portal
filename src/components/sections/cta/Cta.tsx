import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export const Cta = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-fashion-pink relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-fashion-pink/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair mb-6">
            Join Us This Valentine's
          </h2>
          <p className="text-xl md:text-2xl font-montserrat mb-8 text-gray-200">
            Experience the most exclusive fashion event of the year
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 text-lg px-8"
            >
              Get Your Tickets Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8"
            >
              <Calendar className="mr-2" />
              Save The Date
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};