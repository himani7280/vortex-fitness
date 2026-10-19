import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import FitnessPrograms from '../../components/sections/FitnessPrograms';
import Programs from '../../components/sections/Programs';
import siteData from '@/data/siteData';

export default function ProgramsPage() {
  const heroVariant = siteData.sections?.Hero?.variants?.FitnessProgramsHero1;
  const title = heroVariant?.title || "Our Programs";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title={title} breadcrumb="Programs" />
      <FitnessPrograms />
      <Programs />
    </div>
  );
}
