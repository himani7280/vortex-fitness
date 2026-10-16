import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Pricing from '../../components/sections/Pricing';

export const metadata = {
  title: 'Pricing - Vortex Fitness',
  description: 'Choose your perfect fitness plan at Vortex Fitness.',
};

export default function PricingPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0a0a0a]">
      <PageHeader title="Pricing" breadcrumb="Pricing" />
      
      <Pricing className="pt-8 sm:pt-10 md:pt-12 pb-2 sm:pb-4 md:pb-6" />
    </div>
  );
}
