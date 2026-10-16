import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Blog from '../../components/sections/Blog';

export default function BlogsPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title="Our Blogs" breadcrumb="Blogs" />
      <Blog isCarousel={false} limit={6} />
    </div>
  );
}
