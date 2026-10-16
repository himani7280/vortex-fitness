import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Gallery from '../../components/sections/Gallery';

export const metadata = {
  title: 'Gallery - Vortex Fitness',
  description: 'Take a closer look at our facility, training sessions, and events.',
};

export default function GalleryPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title="Gallery" breadcrumb="Gallery" />
      <Gallery />
    </div>
  );
}
