import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { BenefitsGrid } from "@/components/sections/benefits/BenefitsGrid";
import { Feature } from "@/components/ui/feature";
import { SponsorshipLevels } from "@/components/sections/sponsorship-levels/SponsorshipLevels";
import { SponsorRegistrationForm } from "@/components/forms/sponsor/SponsorRegistrationForm";
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
      <Feature />
      <SponsorshipLevels />
      <BenefitsGrid
        benefits={benefits}
        className="py-20"
      />
      <section className="py-20" id="register">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair mb-4">Become a Sponsor</h2>
            <p className="text-xl text-gray-300 font-montserrat">Fill out the form below to start your sponsorship journey</p>
          </div>
          <SponsorRegistrationForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default SponsorsPage;