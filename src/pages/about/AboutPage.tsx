import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageLayout } from '@/components/layout/PageLayout';
import { AboutOverview } from './components/AboutOverview';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

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
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-12 w-3/4 max-w-2xl mb-8" />
          <Skeleton className="h-6 w-full max-w-3xl mb-12" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-[400px] w-full rounded-lg" />
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
          <p className="mt-4 text-gray-200">
            Please try refreshing the page
          </p>
        </div>
      </PageLayout>
    );
  }

  const content = aboutContent.content as {
    overview: {
      title: string;
      description: string;
      image_url: string;
    };
  };

  return (
    <PageLayout>
      <AboutOverview
        title={content.overview.title}
        description={content.overview.description}
        imageUrl={content.overview.image_url}
      />
    </PageLayout>
  );
};

export default AboutPage;