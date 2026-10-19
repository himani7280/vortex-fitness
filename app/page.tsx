import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Programs from "../components/sections/Programs";
import WorkProcess from "../components/sections/WorkProcess";
import Trainers from "../components/sections/Trainers";
import CTA from "../components/sections/CTA";
import HomeTestimonial from "../components/sections/HomeTestimonial";
import Pricing from "../components/sections/Pricing";
import Blog from "../components/sections/Blog";
import siteData from "@/data/siteData";

export default function Home() {
  const { recentArticles } = siteData.home;

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Hero />
      <About />
      <Programs />
      <WorkProcess className="pb-4 sm:pb-5 md:pb-6 lg:pb-6" />
      <Trainers className="pt-0 sm:pt-0 md:pt-1 lg:pt-2" />
      <CTA />
      <HomeTestimonial />
      <Pricing />
      <Blog 
        isCarousel={false} 
        limit={recentArticles.limit}
        title={<>{recentArticles.heading1}<span className="text-[#ea580c]">{recentArticles.heading2}</span></>} 
        subtitle={recentArticles.description}
      />
    </div>
  );
}
