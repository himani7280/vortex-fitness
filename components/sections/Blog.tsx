"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import siteData, { blogPosts } from "@/data/siteData";

interface BlogProps {
  isCarousel?: boolean;
  limit?: number;
  title?: React.ReactNode;
  subtitle?: string;
}

const GAP = 24; 

const Blog = ({ isCarousel = false, limit, title, subtitle }: BlogProps) => {
  const blog = (siteData.blog || siteData.home.blog) as any;
  const displayPosts = limit ? blogPosts.slice(0, limit) : blogPosts;

  const totalCards = displayPosts.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidthPx, setCardWidthPx] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Loop only when there are more cards than visible slots
  const canLoop = totalCards > cardsPerView;
  // Clone first few cards at the end so the slider always moves forward
  const slides = canLoop
    ? [...displayPosts, ...displayPosts.slice(0, cardsPerView)]
    : displayPosts;

  // ── Update cardsPerView & card pixel width on resize ─────────────
  const compute = useCallback(() => {
    const w = window.innerWidth;
    const cpv = w < 640 ? 1 : w < 1024 ? 2 : 3;
    setCardsPerView(cpv);
    if (containerRef.current) {
      const W = containerRef.current.clientWidth;
      setCardWidthPx((W - GAP * (cpv - 1)) / cpv);
    }
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  // Reset position when layout changes
  useEffect(() => {
    setAnimate(false);
    setActiveIndex(0);
  }, [cardsPerView, totalCards]);

  // Re-enable animation on the next frame after a silent jump
  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true))
    );
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  // ── Navigation ───────────────────────────────────────────────────
  const handleNext = () => {
    if (!canLoop) return;
    setActiveIndex((cur) => Math.min(cur + 1, totalCards));
  };

  const handlePrev = () => {
    if (!canLoop) return;
    if (activeIndex === 0) {
      // Jump silently to the cloned end, then slide back one card
      setAnimate(false);
      setActiveIndex(totalCards);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setActiveIndex(totalCards - 1);
        })
      );
    } else {
      setActiveIndex((cur) => cur - 1);
    }
  };

  const goTo = (idx: number) => setActiveIndex(idx);

  // When we reach the cloned slides, snap back to the real first slide
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return; // ignore card hover transitions
    if (activeIndex >= totalCards) {
      setAnimate(false);
      setActiveIndex(0);
    }
  };

  // ── Auto-play (always forward) ───────────────────────────────────
  useEffect(() => {
    if (!isCarousel || !canLoop) return;
    const id = setInterval(() => {
      setActiveIndex((cur) => Math.min(cur + 1, totalCards));
    }, 4000);
    return () => clearInterval(id);
  }, [isCarousel, canLoop, totalCards]);

  const translateX = activeIndex * (cardWidthPx + GAP);
  const activeDot = canLoop ? activeIndex % totalCards : 0;

  const defaultTitle = (
    <>
      {blog.heading1}
      <span className="text-[#ea580c]">{blog.heading2}</span>
      {blog.heading3}
    </>
  );

  /* ── Blog Card ───────────────────────────────────────────────── */
  const BlogCard = ({ post }: { post: (typeof blogPosts)[0] }) => (
    <div className="group flex flex-col bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 h-full hover:border-orange-300 hover:shadow-[0_20px_45px_-12px_rgba(234,88,12,0.22)] hover:-translate-y-2.5 transition-all duration-500 ease-out overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute bottom-3 left-4 bg-[#ea580c] text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md group-hover:shadow-[0_4px_14px_rgba(234,88,12,0.45)] transition-all duration-300">
          <Calendar className="w-3 h-3" />
          <span className="text-[11px] font-bold tracking-wide">{post.date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-5 pt-4 pb-5">
        <span className="text-[#ea580c] text-[11px] font-bold tracking-widest uppercase mb-1.5">
          {post.category}
        </span>
        <h3 className="font-heading text-[16px] sm:text-[17px] font-black text-[#1a1a1a] leading-snug mb-2 line-clamp-2 group-hover:text-[#ea580c] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-grow line-clamp-3">
          {post.description}
        </p>

        <Link href={`/blogs/${post.id}`} className="flex items-center gap-2 mt-auto w-max group/link">
          <span className="text-[#1a1a1a] font-bold text-[13px] group-hover/link:text-[#ea580c] transition-colors">
            {blog.readMoreText}
          </span>
          <div className="w-7 h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-white group-hover/link:bg-[#d94e1a] group-hover/link:translate-x-1 transition-all duration-300 shadow-xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-7">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-[2px] w-6 sm:w-10 bg-[#ea580c]" />
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c] -scale-x-100" />
            <span className="text-[#ea580c] tracking-[0.15em] text-xs sm:text-sm font-bold uppercase">
              {blog.topText}
            </span>
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c]" />
            <div className="h-[2px] w-6 sm:w-10 bg-[#ea580c]" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[40px] font-extrabold text-black leading-tight mb-2 text-center">
            {title ?? defaultTitle}
          </h2>
          <p className="text-gray-500 text-[15px] md:text-[15.5px] leading-relaxed max-w-2xl mx-auto text-center font-normal">
            {subtitle ?? blog.description}
          </p>
        </div>

        {/* ── Carousel Mode ── */}
        {isCarousel ? (
          <div>
            {/* Slider track */}
            <div ref={containerRef} className="overflow-hidden">
              <div
                className="flex"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(-${translateX}px)`,
                  transition: animate ? "transform 0.45s cubic-bezier(0.4,0,0.2,1)" : "none",
                  willChange: "transform",
                }}
              >
                {slides.map((post, idx) => (
                  <div
                    key={`${post.id}-${idx}`}
                    style={{
                      width: cardWidthPx > 0 ? `${cardWidthPx}px` : undefined,
                      minWidth: cardWidthPx > 0 ? `${cardWidthPx}px` : `calc((100% - ${GAP * (cardsPerView - 1)}px) / ${cardsPerView})`,
                      flexShrink: 0,
                    }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls: Prev | Dots | Next */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={!canLoop}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots — one per card */}
              <div className="flex items-center gap-2">
                {Array.from({ length: canLoop ? totalCards : 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Go to position ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 ${activeDot === idx
                        ? "w-7 h-2.5 bg-[#ea580c]"
                        : "w-2.5 h-2.5 bg-gray-300 hover:bg-[#ea580c]"
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!canLoop}
                aria-label="Next"
                className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* ── Grid Mode ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayPosts.map((post, idx) => (
              <BlogCard key={`${post.id}-${idx}`} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
