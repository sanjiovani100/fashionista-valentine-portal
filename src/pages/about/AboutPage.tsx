import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
    sections: Array<{ title: string; content: string }>;
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
          {content.sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/20 backdrop-blur-sm p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-fashion-pink mb-4">
                {section.title}
              </h2>
              <p className="text-gray-200 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default AboutPage;