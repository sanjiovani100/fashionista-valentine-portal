import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { RequirementsSection } from "@/components/sections/requirements/RequirementsSection";
import { OpportunitiesSection } from "@/components/sections/opportunities/OpportunitiesSection";
import { BenefitsGrid } from "@/components/sections/benefits/BenefitsGrid";
import { RegistrationForm } from "@/components/forms/registration/RegistrationForm";
import { roleContent } from "@/constants/role-content";
import { Palette, Globe, TrendingUp, Briefcase } from "lucide-react";

const DesignersPage = () => {
  const requirements = [
    {
      icon: Palette,
      title: "Collection Requirements",
      description: "Minimum of 5 pieces for the showcase"
    },
    {
      icon: Globe,
      title: "Brand Presence",
      description: "Established brand with portfolio"
    },
    {
      icon: Briefcase,
      title: "Business Registration",
      description: "Registered fashion business"
    }
  ];

  const opportunities = [
    {
      icon: TrendingUp,
      title: "Brand Exposure",
      description: "Showcase to industry professionals",
      metrics: ["500+ Attendees", "Media Coverage"]
    },
    {
      icon: Globe,
      title: "Market Reach",
      description: "Connect with potential buyers",
      metrics: ["Direct Sales", "Business Network"]
    }
  ];

  return (
    <PageLayout>
      <PageHero 
        headline={roleContent.designer.hero.title}
        subheading={roleContent.designer.hero.subtitle}
        role="designer"
      />
      <RequirementsSection
        title="Designer Requirements"
        description="What we look for in our designers"
        requirements={requirements}
      />
      <OpportunitiesSection
        title="Designer Opportunities"
        description="Showcase your brand to the fashion industry"
        opportunities={opportunities}
      />
      <BenefitsGrid
        benefits={roleContent.designer.benefits}
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

export default DesignersPage;


