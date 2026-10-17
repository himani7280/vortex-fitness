import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumb?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

const PageHeader = ({ title, breadcrumb, breadcrumbItems }: PageHeaderProps) => {
  // Strip leading "Home / " or "Home" if passed, so root "Home" is never duplicated
  const cleanBreadcrumb = breadcrumb ? breadcrumb.replace(/^Home\s*\/\s*/i, '').trim() : '';
  const parts = cleanBreadcrumb && cleanBreadcrumb !== 'Home' ? cleanBreadcrumb.split(' / ') : [];

  return (
    <section className="relative w-full h-[180px] sm:h-[220px] md:h-[270px] lg:h-[320px] xl:h-[350px] flex items-center bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[10%_25%] bg-no-repeat opacity-100"
        style={{ backgroundImage: 'url(/images/page_header_bg.jpg)' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 from-0% via-black/50 via-40% to-transparent to-70% z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 w-full pt-4 sm:pt-6 md:pt-8">
        <div className="flex flex-col">
          {/* Breadcrumb Navigation with clickable parent links */}
          <div className="text-white text-[14px] sm:text-[15px] md:text-[16px] font-medium mb-2.5 sm:mb-3 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#ea580c] transition-colors">Home</Link>
            
            {breadcrumbItems && breadcrumbItems.length > 0 ? (
              breadcrumbItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-gray-400 font-normal">/</span>
                  {item.href ? (
                    <Link href={item.href} className="hover:text-[#ea580c] transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[#ea580c]">{item.label}</span>
                  )}
                </React.Fragment>
              ))
            ) : (
              parts.map((part, idx) => {
                const isLast = idx === parts.length - 1;
                let href: string | undefined;
                if (!isLast) {
                  const lower = part.toLowerCase();
                  if (lower.includes('program')) href = '/programs';
                  else if (lower.includes('blog')) href = '/blogs';
                  else if (lower.includes('team')) href = '/team';
                  else if (lower.includes('about')) href = '/about';
                }

                return (
                  <React.Fragment key={idx}>
                    <span className="text-gray-400 font-normal">/</span>
                    {href ? (
                      <Link href={href} className="hover:text-[#ea580c] transition-colors">
                        {part}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-[#ea580c]" : "text-white"}>{part}</span>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </div>

          {/* Orange Dot & Title Container */}
          <div className="flex flex-col">
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ea580c] ml-12 sm:ml-16 mb-1.5 sm:mb-2"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white font-heading tracking-tight leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
