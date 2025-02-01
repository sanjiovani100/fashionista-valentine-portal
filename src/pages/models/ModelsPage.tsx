import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { RequirementsSection } from "@/components/sections/requirements/RequirementsSection";
import { OpportunitiesSection } from "@/components/sections/opportunities/OpportunitiesSection";
import { BenefitsGrid } from "@/components/sections/benefits/BenefitsGrid";
import { RegistrationForm } from "@/components/forms/registration/RegistrationForm";
import { Award, Camera, Users, Star } from "lucide-react";

const ModelsPage = () => {
  const { t } = useTranslation('models');

  const requirements = [
    {
      icon: Award,
      title: t('requirements.items.height.title'),
      description: t('requirements.items.height.description')
    },
    {
      icon: Camera,
      title: t('requirements.items.portfolio.title'),
      description: t('requirements.items.portfolio.description')
    },
    {
      icon: Users,
      title: t('requirements.items.experience.title'),
      description: t('requirements.items.experience.description')
    }
  ];

  const runwayMetrics = ['10+ Designers', '500+ Attendees'];
  const portfolioMetrics = ['Professional Photos', 'Video Coverage'];

  const opportunities = [
    {
      icon: Star,
      title: t('opportunities.items.runway.title'),
      description: t('opportunities.items.runway.description'),
      metrics: [
        t('opportunities.items.runway.metrics.0'),
        t('opportunities.items.runway.metrics.1')
      ]
    },
    {
      icon: Camera,
      title: t('opportunities.items.portfolio.title'),
      description: t('opportunities.items.portfolio.description'),
      metrics: [
        t('opportunities.items.portfolio.metrics.0'),
        t('opportunities.items.portfolio.metrics.1')
      ]
    }
  ];

  const benefits = [
    {
      icon: Camera,
      title: 'portfolio',
      description: ''
    },
    {
      icon: Users,
      title: 'connections',
      description: ''
    },
    {
      icon: Star,
      title: 'career',
      description: ''
    }
  ];

  return (
    <PageLayout>
      <PageHero role="model" />
      <RequirementsSection
        title={t('requirements.title')}
        description={t('requirements.description')}
        requirements={requirements}
      />
      <OpportunitiesSection
        title={t('opportunities.title')}
        description={t('opportunities.description')}
        opportunities={opportunities}
      />
      <BenefitsGrid
        benefits={benefits}
        className="py-20"
        role="model"
      />
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container">
          <h2 className="text-3xl font-playfair text-center mb-12">
            {t('registration.title')}
          </h2>
          <RegistrationForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default ModelsPage;