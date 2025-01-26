import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Requirement {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface RequirementsSectionProps {
  title: string;
  description: string;
  requirements: Requirement[];
  className?: string;
}

export const RequirementsSection = ({ 
  title, 
  description, 
  requirements,
  className 
}: RequirementsSectionProps) => {
  return (
    <section className={cn("py-20 bg-pure-white text-pure-black", className)}>
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-h2 font-playfair mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-h4 text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requirements.map((requirement, index) => (
            <motion.div
              key={requirement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                <requirement.icon className="w-12 h-12 mb-4 text-fashion-pink" />
                <h3 className="text-h4 font-playfair mb-2">{requirement.title}</h3>
                <p className="text-gray-600">{requirement.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};