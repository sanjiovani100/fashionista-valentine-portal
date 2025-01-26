import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { RequirementsSection } from "@/components/sections/requirements/RequirementsSection";
import { OpportunitiesSection } from "@/components/sections/opportunities/OpportunitiesSection";
import { BenefitsGrid } from "@/components/sections/benefits/BenefitsGrid";
import { RegistrationForm } from "@/components/forms/registration/RegistrationForm";
import { Building2, Target, Briefcase, Heart } from "lucide-react";

const SponsorsPage = () => {
  const requirements = [
    {
      icon: Building2,
      title: "Company Profile",
      description: "Established business with brand guidelines"
    },
    {
      icon: Target,
      title: "Target Alignment",
      description: "Brand values aligned with fashion industry"
    },
    {
      icon: Heart,
      title: "Commitment",
      description: "Long-term partnership potential"
    }
  ];

  const opportunities = [
    {
      icon: Briefcase,
      title: "Brand Visibility",
      description: "Premium exposure at the event",
      metrics: ["VIP Access", "Media Coverage"]
    },
    {
      icon: Target,
      title: "Market Reach",
      description: "Connect with fashion industry leaders",
      metrics: ["B2B Network", "Direct Marketing"]
    }
  ];

  return (
    <PageLayout>
      <PageHero 
        headline="Partner with Us for an Unforgettable Fashion Experience"
        subheading="Showcase your brand to an exclusive audience"
        role="sponsor"
      />
      <RequirementsSection
        title="Sponsor Requirements"
        description="What we look for in our sponsors"
        requirements={requirements}
      />
      <OpportunitiesSection
        title="Sponsor Opportunities"
        description="Connect your brand with the fashion industry"
        opportunities={opportunities}
      />
      <BenefitsGrid
        benefits={roleContent.sponsor.benefits}
        className="py-20"
      />
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container">
          <h2 className="text-3xl font-playfair text-center mb-12">Apply Now</h2>
          <RegistrationForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default SponsorsPage;
