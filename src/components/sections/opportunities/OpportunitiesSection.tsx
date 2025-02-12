import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cx } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Opportunity {
  icon: LucideIcon;
  title: string;
  description: string;
  metrics?: string[];
}

interface OpportunitiesSectionProps {
  title: string;
  description: string;
  opportunities: Opportunity[];
  className?: string;
}

export const OpportunitiesSection = ({
  title,
  description,
  opportunities,
  className
}: OpportunitiesSectionProps) => {
  return (
    <section className={cx(
      "py-20 bg-gradient-to-b from-pure-black to-deep-purple text-pure-white",
      className
    )}>
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
            className="text-h4 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                <opportunity.icon className="w-12 h-12 mb-4 text-fashion-pink" />
                <h3 className="text-h4 font-playfair mb-2">{opportunity.title}</h3>
                <p className="text-gray-300 mb-4">{opportunity.description}</p>
                {opportunity.metrics && (
                  <div className="flex flex-wrap gap-2">
                    {opportunity.metrics.map((metric) => (
                      <Badge 
                        key={metric}
                        variant="secondary"
                        className="bg-fashion-pink/10 text-fashion-pink"
                      >
                        {metric}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


