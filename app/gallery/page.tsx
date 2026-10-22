import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Gallery from '../../components/sections/Gallery';
import siteData from '@/data/siteData';

export const metadata = {
  title: 'Gallery - Vortex Fitness',
  description: 'Take a closer look at our facility, training sessions, and events.',
};

export default function GalleryPage() {
  const heroVariant = siteData.heroes.gallery;
  const title = heroVariant?.title || "Gallery";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <PageHeader title={title} breadcrumb="Gallery" />
      <Gallery />
    </div>
  );
}
