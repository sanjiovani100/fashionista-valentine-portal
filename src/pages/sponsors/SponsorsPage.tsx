import * as React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { BenefitsGrid } from "@/components/sections/benefits/BenefitsGrid";
import { Feature } from "@/components/ui/feature";
import { SponsorshipLevels } from "@/components/sections/sponsorship-levels/SponsorshipLevels";
import { Building2, Target, Briefcase } from "lucide-react";

const SponsorsPage = () => {
  const benefits = [
    {
      icon: Building2,
      title: 'visibility',
      description: ''
    },
    {
      icon: Target,
      title: 'marketing',
      description: ''
    },
    {
      icon: Briefcase,
      title: 'network',
      description: ''
    }
  ];

  return (
    <PageLayout>
      <PageHero role="sponsor" />
      <Feature role="sponsor" />
      <SponsorshipLevels />
      <BenefitsGrid
        benefits={benefits}
        className="py-20"
        role="sponsor"
      />
    </PageLayout>
  );
};

export default SponsorsPage;


