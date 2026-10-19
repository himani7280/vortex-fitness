import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import AboutUsDetails from '../../components/sections/AboutUsDetails';
import WorkProcess from '../../components/sections/WorkProcess';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import Trainers from '../../components/sections/Trainers';
import siteData from '@/data/siteData';

export default function AboutPage() {
  const heroVariant = siteData.sections?.Hero?.variants?.FitnessAboutHero1;
  const title = heroVariant?.title || "About Us";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title={title} breadcrumb="About Us" />
      <AboutUsDetails />
      <WorkProcess className="pt-2 sm:pt-3 md:pt-4 lg:pt-5" />
      <WhyChooseUs />
      <Trainers />
    </div>
  );
}
