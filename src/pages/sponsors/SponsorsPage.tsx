import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { BenefitsGrid } from "@/components/sections/benefits/BenefitsGrid";
import { Building2, Target, Briefcase } from "lucide-react";

const SponsorsPage = () => {
  const benefits = [
    {
      icon: Building2,
      title: "Brand Visibility",
      description: "Showcase your brand to our exclusive audience of fashion enthusiasts"
    },
    {
      icon: Target,
      title: "Target Marketing",
      description: "Reach your ideal demographic through our focused events"
    },
    {
      icon: Briefcase,
      title: "Business Network",
      description: "Connect with industry leaders and potential business partners"
    }
  ];

  return (
    <PageLayout>
      <PageHero 
        headline="Partner with Us for an Unforgettable Fashion Experience"
        subheading="Showcase your brand to an exclusive audience of fashion industry leaders"
        role="sponsor"
      />
      <BenefitsGrid
        benefits={benefits}
        className="py-20"
      />
    </PageLayout>
  );
};

export default SponsorsPage;