import React, { useState, useEffect, useRef } from 'react';
import { useAppTheme } from '../context/ThemeContext';

export const CircularScrollController: React.FC = () => {
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  const containerRef = useRef<HTMLElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'idle' | 'down' | 'up'>('idle');
  const [scrollPercent, setScrollPercent] = useState(0);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if device supports fine hover pointer and user has not requested reduced motion
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasPointer || prefersReducedMotion) return;

    let currentX = -100;
    let currentY = -100;
    const lerpSpeed = 0.22;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('button, a, input, textarea, select, [role="button"], label, .cursor-pointer') !== null;
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth physics loop directly writing to DOM ref (0 React re-renders per frame)
    const render = () => {
      currentX += (targetPos.current.x - currentX) * lerpSpeed;
      currentY += (targetPos.current.y - currentY) * lerpSpeed;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  // Track scroll percentage and direction without hijacking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        setScrollPercent(Math.round((currentScrollY / totalScroll) * 100));
      }

      if (Math.abs(currentScrollY - lastScrollY.current) > 4) {
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
      }

      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrollDirection('idle');
      }, 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  if (!isVisible) return null;

  const size = isHoveringClickable ? 52 : 40;

  return (
    <aside 
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
    >
      {/* Soft Ambient Radial Glow */}
      <div 
        className="absolute -inset-4 rounded-full blur-md pointer-events-none transition-all duration-300 opacity-60"
        style={{
          background: isMidnight
            ? 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(217,119,6,0.1) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(217,119,6,0.2) 0%, rgba(40,21,35,0.08) 60%, transparent 80%)',
        }}
      />

      {/* Main 3D Circular Capsule */}
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`relative rounded-full flex items-center justify-center transition-all duration-200
          backdrop-blur-md
          ${
            isMidnight
              ? 'bg-stone-950/70 border border-white/20 text-white shadow-[0_8px_20px_rgba(0,0,0,0.6)]'
              : 'bg-[#faf6ee]/75 border border-[#e8dfd1] text-stone-900 shadow-[0_6px_18px_rgba(40,21,35,0.15)]'
          }
          ${isHoveringClickable ? 'scale-110 ring-1 ring-amber-400/60' : ''}
        `}
      >
        {/* Animated Rotating Outer Ring */}
        <svg 
          className="absolute inset-0 w-full h-full animate-[spin_16s_linear_infinite] pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={isMidnight ? 'rgba(245,158,11,0.5)' : 'rgba(40,21,35,0.3)'}
            strokeWidth="2"
            strokeDasharray="6 14"
            strokeLinecap="round"
          />
        </svg>

        {/* Scroll Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={isMidnight ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={isMidnight ? '#f59e0b' : '#281523'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={(2 * Math.PI * 40) * (1 - scrollPercent / 100)}
            className="transition-all duration-150"
          />
        </svg>

        {/* Directional Up Indicator */}
        <div 
          className={`absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-200 ${
            scrollDirection === 'up' ? 'opacity-100 -translate-y-0.5' : 'opacity-0'
          }`}
        >
          <svg className="w-3 h-3 text-amber-500 filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>

        {/* Directional Down Indicator */}
        <div 
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-200 ${
            scrollDirection === 'down' ? 'opacity-100 translate-y-0.5' : 'opacity-0'
          }`}
        >
          <svg className="w-3 h-3 text-amber-500 filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Center Orb */}
        <div 
          className={`rounded-full transition-all duration-200 ${
            isHoveringClickable
              ? 'w-2.5 h-2.5 bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.6)]'
              : 'w-2 h-2 bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]'
          }`}
        />
      </div>
    </aside>
  );
};
