import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { OptimizedImage } from "@/components/cloudinary/OptimizedImage";
import { Sparkles, Users, Star, Leaf } from "lucide-react";

const iconMap = {
  sparkles: Sparkles,
  users: Users,
  star: Star,
  leaf: Leaf,
};

const AboutPage = () => {
  const { data: aboutContent, isLoading, error } = useQuery({
    queryKey: ['about-page-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_page_content')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching about page content:', error);
        toast.error('Failed to load about page content');
        throw error;
      }
      
      return data;
    }
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 space-y-8">
          <Skeleton className="h-12 w-3/4 max-w-2xl" />
          <Skeleton className="h-6 w-full max-w-3xl" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !aboutContent) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Failed to load about page content
          </h1>
          <p className="mt-4 text-gray-600">
            Please try refreshing the page
          </p>
        </div>
      </PageLayout>
    );
  }

  const content = aboutContent.content as {
    mission: string;
    vision: string;
    overview: {
      title: string;
      description: string;
      image_url: string;
    };
    values: Array<{
      title: string;
      description: string;
      icon: keyof typeof iconMap;
    }>;
    team: Array<{
      name: string;
      role: string;
      bio: string;
      image_url: string;
    }>;
    milestones: Array<{
      year: number;
      title: string;
      description: string;
      image_url: string;
    }>;
    contact: {
      email: string;
      phone: string;
      social_media: {
        instagram: string;
        facebook: string;
      };
    };
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 space-y-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-fashion-pink mb-6">
            {aboutContent.title}
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            {aboutContent.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-fashion-pink/20">
            <h2 className="text-2xl font-bold text-fashion-pink mb-4">Our Mission</h2>
            <p className="text-gray-200 leading-relaxed">{content.mission}</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-fashion-pink/20">
            <h2 className="text-2xl font-bold text-fashion-pink mb-4">Our Vision</h2>
            <p className="text-gray-200 leading-relaxed">{content.vision}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/20 backdrop-blur-sm p-8 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-fashion-pink mb-4">
              {content.overview.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <p className="text-gray-200 leading-relaxed">
                {content.overview.description}
              </p>
              <OptimizedImage
                publicId={content.overview.image_url}
                alt="About Fashionistas"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Values Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((value, index) => {
              const Icon = iconMap[value.icon];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-fashion-pink/20"
                >
                  <Icon className="w-8 h-8 text-fashion-pink mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Team Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {content.team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-fashion-pink/20"
              >
                <OptimizedImage
                  publicId={member.image_url}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-fashion-pink text-center mb-2">{member.role}</p>
                <p className="text-gray-300 text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>

          {/* Milestones Section */}
          <div className="space-y-8">
            {content.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-center bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-fashion-pink/20"
              >
                <div className="md:w-1/3">
                  <OptimizedImage
                    publicId={milestone.image_url}
                    alt={milestone.title}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="text-3xl font-bold text-fashion-pink mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-fashion-pink/20 text-center"
          >
            <h2 className="text-2xl font-bold text-fashion-pink mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <p className="text-gray-200">
                <span className="font-bold">Email:</span> {content.contact.email}
              </p>
              <p className="text-gray-200">
                <span className="font-bold">Phone:</span> {content.contact.phone}
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href={content.contact.social_media.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fashion-pink hover:text-fashion-pink/80 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={content.contact.social_media.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fashion-pink hover:text-fashion-pink/80 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default AboutPage;