import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { RequirementsSection } from "@/components/sections/requirements/RequirementsSection";
import { OpportunitiesSection } from "@/components/sections/opportunities/OpportunitiesSection";
import { BenefitsGrid } from "@/components/sections/benefits/BenefitsGrid";
import { RegistrationForm } from "@/components/forms/registration/RegistrationForm";
import { roleContent } from "@/constants/role-content";
import { Award, Camera, Users, Star } from "lucide-react";

const ModelsPage = () => {
  const requirements = [
    {
      icon: Award,
      title: "Height Requirements",
      description: "Minimum height of 175cm for female models and 185cm for male models"
    },
    {
      icon: Camera,
      title: "Portfolio",
      description: "Professional photos showcasing your modeling experience"
    },
    {
      icon: Users,
      title: "Experience",
      description: "Previous runway or photoshoot experience is preferred"
    }
  ];

  const opportunities = [
    {
      icon: Star,
      title: "Runway Experience",
      description: "Walk for top designers in our Valentine's showcase",
      metrics: ["10+ Designers", "500+ Attendees"]
    },
    {
      icon: Camera,
      title: "Portfolio Building",
      description: "Professional photos from the event",
      metrics: ["Professional Photos", "Video Coverage"]
    }
  ];

  return (
    <PageLayout>
      <PageHero 
        headline={roleContent.model.hero.title}
        subheading={roleContent.model.hero.subtitle}
        role="model"
      />
      <RequirementsSection
        title="Model Requirements"
        description="What we look for in our models"
        requirements={requirements}
      />
      <OpportunitiesSection
        title="Model Opportunities"
        description="Launch your modeling career with us"
        opportunities={opportunities}
      />
      <BenefitsGrid
        benefits={roleContent.model.benefits}
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

export default ModelsPage;