"use client";

import React, { useEffect, useState, useRef } from 'react';

interface StatCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export default function StatCounter({ value, duration = 1600, className = '' }: StatCounterProps) {
  const str = String(value ?? '');
  // Match the primary number and any prefix/suffix
  // e.g. "8+ Years" -> prefix="", num=8, suffix="+ Years"
  // e.g. "500+" -> prefix="", num=500, suffix="+"
  // e.g. "10+" -> prefix="", num=10, suffix="+"
  const match = str.match(/^([^\d]*)(\d+)(.*)$/);

  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2], 10) : NaN;
  const suffix = match ? match[3] : '';

  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isNaN(target)) return;

    // Trigger counter when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!hasStarted || isNaN(target)) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic easing for smooth deceleration
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, target, duration]);

  if (isNaN(target)) {
    return <span className={className}>{str}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
