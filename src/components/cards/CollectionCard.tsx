import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface CollectionCardProps {
  imageUrl: string;
  designerName: string;
  collectionTitle: string;
  onViewDetails: () => void;
}

export const CollectionCard = ({
  imageUrl,
  designerName,
  collectionTitle,
  onViewDetails
}: CollectionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer"
      onClick={onViewDetails}
    >
      <Card className="overflow-hidden bg-black/20 border-white/10 hover:border-white/20">
        {/* Image Container (70% height) */}
        <div className="relative w-full">
          <div 
            className="
              w-full aspect-[3/4]
              lg:w-[360px] lg:h-[336px]
              md:w-[300px] md:h-[280px]
              bg-cover bg-center
              transition-transform duration-300 group-hover:scale-105
            "
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {/* Hover State Overlay */}
          <div className="
            absolute inset-0 bg-black/0 group-hover:bg-black/40
            transition-all duration-300
            flex items-center justify-center opacity-0 group-hover:opacity-100
          ">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </motion.div>
          </div>
        </div>

        {/* Content Container (30% height) */}
        <div className="p-6 space-y-2">
          <h3 className="text-lg font-semibold text-white/80">{designerName}</h3>
          <p className="text-xl font-bold text-white">{collectionTitle}</p>
          <p className="text-sm text-fashion-pink group-hover:text-white transition-colors flex items-center gap-2">
            View Details
            <ChevronRight className="w-4 h-4" />
          </p>
        </div>
      </Card>
    </motion.div>
  );
}; 