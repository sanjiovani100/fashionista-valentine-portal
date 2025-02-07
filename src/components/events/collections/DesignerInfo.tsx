import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Globe, ArrowRight } from 'lucide-react';

interface DesignerInfoProps {
  name: string;
  bio: string;
  image: string;
  collections: Array<{
    name: string;
    description: string;
    pieces: number;
  }>;
  social?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export const DesignerInfo = ({
  name,
  bio,
  image,
  collections,
  social
}: DesignerInfoProps) => {
  return (
    <Card className="bg-black/20 border-white/10">
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        {/* Designer Image and Social Links */}
        <div className="space-y-4">
          <div
            className="w-full aspect-[3/4] rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          {social && (
            <div className="flex justify-center gap-4">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-fashion-pink"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-fashion-pink"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              {social.website && (
                <a
                  href={social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-fashion-pink"
                >
                  <Globe className="w-6 h-6" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Designer Info and Collections */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-white/70">{bio}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Collections</h4>
            <div className="space-y-4">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/20 rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-lg font-medium text-white">
                        {collection.name}
                      </h5>
                      <p className="text-white/70">{collection.description}</p>
                    </div>
                    <Badge variant="outline" className="text-fashion-pink border-fashion-pink">
                      {collection.pieces} pieces
                    </Badge>
                  </div>
                  <Button
                    variant="link"
                    className="text-fashion-pink hover:text-fashion-pink/80 p-0"
                  >
                    View Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}; 