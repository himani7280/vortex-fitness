import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import FitnessPrograms from '../../components/sections/FitnessPrograms';
import Programs from '../../components/sections/Programs';

export default function ProgramsPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title="Our Programs" breadcrumb="Programs" />
      <FitnessPrograms />
      <Programs />
    </div>
  );
}
