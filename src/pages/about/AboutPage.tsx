import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageLayout } from '@/components/layout/PageLayout';
import { AboutOverview } from './components/AboutOverview';
import { MissionVision } from './components/MissionVision';
import { CoreValues } from './components/CoreValues';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { AboutPageContent } from './types/about.types';
import { runAboutPageTests, testAboutSection } from './utils/aboutPageTesting';

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: aboutContent, isLoading, error } = useQuery({
    queryKey: ['about-page-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_page_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching about page content:', error);
        toast.error('Failed to load about page content');
        throw error;
      }

      if (!data) {
        console.warn('No about page content found');
        toast.error('Content not found');
        return null;
      }
      
      const transformedData: AboutPageContent = {
        id: data.id,
        title: data.title,
        description: data.description,
        content: typeof data.content === 'string' ? JSON.parse(data.content) : data.content,
        mission_vision: typeof data.mission_vision === 'string' ? JSON.parse(data.mission_vision) : data.mission_vision,
        core_values: typeof data.core_values === 'string' ? JSON.parse(data.core_values) : data.core_values,
        team_members: typeof data.team_members === 'string' ? JSON.parse(data.team_members) : data.team_members,
        contact_info: typeof data.contact_info === 'string' ? JSON.parse(data.contact_info) : data.contact_info,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      return transformedData;
    }
  });

  useEffect(() => {
    if (containerRef.current && !isLoading && !error) {
      // Run tests after content is loaded
      runAboutPageTests(containerRef.current).then((results) => {
        console.info('About page test results:', results);
      });
    }
  }, [isLoading, error]);

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
            {error ? 'Failed to load about page content' : 'Content not found'}
          </h1>
          <p className="mt-4 text-gray-200">
            {error ? 'Please try refreshing the page' : 'The about page content is currently unavailable'}
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div ref={containerRef}>
        <AboutOverview
          title={aboutContent.content.overview.title}
          description={aboutContent.content.overview.description}
          imageUrl={aboutContent.content.overview.image_url}
        />
        <MissionVision
          mission={aboutContent.mission_vision.mission}
          vision={aboutContent.mission_vision.vision}
        />
        <CoreValues values={aboutContent.core_values} />
        <TeamSection members={aboutContent.team_members} />
        <ContactSection contactInfo={aboutContent.contact_info} />
      </div>
    </PageLayout>
  );
};

export default AboutPage;