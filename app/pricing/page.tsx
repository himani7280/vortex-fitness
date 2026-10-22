import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Pricing from '../../components/sections/Pricing';
import siteData from '@/data/siteData';

export const metadata = {
  title: 'Pricing - Vortex Fitness',
  description: 'Choose your perfect fitness plan at Vortex Fitness.',
};

export default function PricingPage() {
  const heroVariant = siteData.heroes.pricing;
  const title = heroVariant?.title || "Pricing";

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0a0a0a]">
      <PageHeader title={title} breadcrumb="Pricing" />
      
      <Pricing />
    </div>
  );
}
