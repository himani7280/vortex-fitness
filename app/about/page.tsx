import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import AboutUsDetails from '../../components/sections/AboutUsDetails';
import WorkProcess from '../../components/sections/WorkProcess';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import Trainers from '../../components/sections/Trainers';

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title="About Us" breadcrumb="About Us" />
      <AboutUsDetails />
      <WorkProcess className="!pt-2 sm:!pt-3 md:!pt-4 lg:!pt-6" />
      <WhyChooseUs />
      <Trainers className="!pt-7 sm:!pt-8 md:!pt-10 lg:!pt-12" />
    </div>
  );
}
