import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Blog from '../../components/sections/Blog';
import siteData from '@/data/siteData';

export default function BlogsPage() {
  const heroVariant = siteData.sections?.Hero?.variants?.FitnessBlogHero1;
  const title = heroVariant?.title ? `Our ${heroVariant.title}` : "Our Blogs";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title={title} breadcrumb="Blogs" />
      <Blog isCarousel={false} limit={6} />
    </div>
  );
}
