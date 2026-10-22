import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { FaQuoteLeft } from 'react-icons/fa';
import PageHeader from '../../../components/ui/PageHeader';
import siteData, { blogPosts, recentPosts, blogDetailVariant, BlogPostDetail, BlogContentBlock } from '@/data/siteData';

const renderTitle = (title: string) => {
  const words = title.split(' ');
  if (words.length > 2) {
    const half = Math.floor(words.length / 2);
    const firstHalf = words.slice(0, half + 1).join(' ');
    const secondHalf = words.slice(half + 1).join(' ');
    return <>{firstHalf} <br /><span className="text-[#ea580c]">{secondHalf}</span></>;
  }
  return title;
};

export async function generateStaticParams() {
  const keys = blogDetailVariant?.blogs 
    ? Object.keys(blogDetailVariant.blogs) 
    : blogPosts.map((p) => p.id.toString());
  return keys.map((id) => ({ id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post: BlogPostDetail | undefined = blogDetailVariant?.blogs?.[id] || blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  const heroVariant = siteData.heroes.blogDetail;
  const bannerTitle = heroVariant?.title || "Blog Detail";
  const displayedRecentPosts = blogDetailVariant?.recentPosts && blogDetailVariant.recentPosts.length > 0 
    ? blogDetailVariant.recentPosts 
    : recentPosts;
  const recentArticlesTitle = blogDetailVariant?.recentPostsTitle || `${siteData.home.recentArticles.heading1}${siteData.home.recentArticles.heading2}` || "Recent Articles";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      <PageHeader title={bannerTitle} breadcrumb={`Blogs / ${post.title}`} />

      <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[50px]">

            {/* Main Content Area */}
            <div className="lg:w-[65%]">
              {/* Featured Image */}
              <div className="relative w-full aspect-[1.8/1] rounded-[10px] overflow-hidden mb-8 shadow-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  priority
                />
              </div>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#1a1a1a] leading-tight mb-5 tracking-tight">
                {renderTitle(post.title)}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-[#666666] text-[15px] font-medium mb-0 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-[18px] h-[18px] text-[#ea580c]" />
                  <span>{post.date}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <User className="w-[18px] h-[18px] text-[#ea580c]" />
                  <span>By {post.author}</span>
                </div>
              </div>

              {/* Content Sections */}
              <div className="flex flex-col">
                {post.content.map((block: BlogContentBlock, index: number) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={index} className={`leading-[1.8] text-[16px] text-[#666666] ${index === 0 ? 'mt-3 mb-8' : 'mb-1'}`}>
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'heading') {
                    return (
                      <div key={index} className="flex items-center gap-4 mt-2 mb-1">
                        <h3 className="text-[24px] md:text-[26px] font-black text-[#1a1a1a]">
                          {block.text}
                        </h3>
                        <div className="h-[2px] w-12 md:w-16 bg-[#ea580c]"></div>
                      </div>
                    );
                  }
                  if (block.type === 'quote') {
                    const lines = block.text.split('\n');
                    return (
                      <blockquote key={index} className="bg-[#f8f9fa] rounded-[10px] py-4 px-6 md:py-6 md:px-8 flex gap-6 my-3">
                        <FaQuoteLeft className="w-10 h-10 text-[#ea580c] shrink-0 mt-1" />
                        <div className="flex flex-col justify-center">
                          <p className="text-[17px] md:text-[18px] font-medium text-[#1a1a1a] italic m-0 leading-relaxed">
                            {lines.map((line: string, i: number) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < lines.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      </blockquote>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-[35%] flex flex-col gap-10 sticky top-24 h-fit">
              {/* Recent Posts Widget */}
              <div className="bg-[#f8f9fa] hover:bg-white border border-gray-100/80 hover:border-orange-200/80 transition-all duration-300 rounded-[12px] p-8 shadow-xs hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <h4 className="text-[22px] font-black text-[#1a1a1a] mb-2">
                  {recentArticlesTitle}
                </h4>
                <div className="h-[2px] w-10 bg-[#ea580c] mb-8"></div>

                <div className="flex flex-col space-y-6">
                  {displayedRecentPosts.map((recentPost) => (
                    <Link key={recentPost.id} href={`/blogs/${recentPost.id}`} className="flex gap-5 group hover:translate-x-1.5 transition-all duration-300 cursor-pointer">
                      <div className="relative w-[100px] h-[80px] shrink-0 rounded-[8px] overflow-hidden shadow-xs">
                        <Image
                          src={recentPost.image}
                          alt={recentPost.title}
                          fill
                          sizes="100px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="font-bold text-[#1a1a1a] text-[15px] mb-2 leading-[1.4] group-hover:text-[#ea580c] transition-colors line-clamp-2">
                          {recentPost.title}
                        </h5>
                        <div className="flex items-center gap-2 text-[#ea580c] text-[13px] font-bold">
                          <Calendar className="w-[14px] h-[14px]" />
                          <span>{recentPost.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
