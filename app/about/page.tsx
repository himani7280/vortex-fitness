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
      <WorkProcess />
      <WhyChooseUs />
      <div className="pt-10 lg:pt-16 bg-white">
        <Trainers />
      </div>
    </div>
  );
}
