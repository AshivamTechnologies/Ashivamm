import React, { useState, useEffect, useRef } from 'react';
import { useAppTheme } from '../context/ThemeContext';

export const CircularScrollController: React.FC = () => {
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  // Positions for smooth physics interpolation (lerp)
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  // States for interaction & animations
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'idle' | 'down' | 'up'>('idle');
  const [scrollPercent, setScrollPercent] = useState(0);

  // Drag physics tracking
  const dragStartY = useRef(0);
  const dragStartScrollY = useRef(0);
  const isMouseDown = useRef(false);
  const hasMovedWhileDown = useRef(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // 1. Mouse movement tracking & smooth lerp animation loop
  useEffect(() => {
    // Only run on devices with a mouse/trackpad pointer
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering clickable elements to expand controller
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('button, a, input, textarea, select, [role="button"], label, .cursor-pointer') !== null;
        setIsHoveringClickable(isClickable);
      }

      // Handle vertical drag-scrolling if user is holding down
      if (isMouseDown.current && isDragging) {
        const deltaY = e.clientY - dragStartY.current;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const scrollFactor = (totalHeight / window.innerHeight) * 1.5;
          window.scrollTo({
            top: dragStartScrollY.current + deltaY * Math.max(1.2, scrollFactor),
            behavior: 'auto',
          });
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Don't hijack clicks on buttons/inputs/links
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest('button, a, input, textarea, select, [role="button"], label');
      
      isMouseDown.current = true;
      dragStartY.current = e.clientY;
      dragStartScrollY.current = window.scrollY;
      hasMovedWhileDown.current = false;

      // If user holds down or clicks anywhere not directly on a link/button, activate drag-scroll
      if (!isInteractive) {
        setIsDragging(true);
      }
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      isMouseDown.current = false;
      setIsDragging(false);
    };

    // Smooth lerp loop (~60-120fps)
    let currentX = targetPos.current.x;
    let currentY = targetPos.current.y;
    const lerpSpeed = 0.22;

    const render = () => {
      currentX += (targetPos.current.x - currentX) * lerpSpeed;
      currentY += (targetPos.current.y - currentY) * lerpSpeed;
      setPos({ x: currentX, y: currentY });
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, isDragging]);

  // 2. Scroll direction and scroll percentage tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        setScrollPercent(Math.round((currentScrollY / totalScroll) * 100));
      }

      if (Math.abs(currentScrollY - lastScrollY.current) > 3) {
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
      }, 550);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  if (!isVisible) return null;

  // Controller diameter based on state:
  // Default: 44px, Clickable hover: 56px, Dragging: 62px
  const size = isDragging ? 62 : isHoveringClickable ? 54 : 44;
  const radius = size / 2;

  return (
    <aside 
      aria-label="3D Circular Scroll Controller"
      className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300"
      style={{
        transform: `translate3d(${pos.x - radius}px, ${pos.y - radius}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Soft Ambient Radial Glow */}
      <div 
        className="absolute -inset-4 rounded-full blur-md pointer-events-none transition-all duration-300 opacity-60"
        style={{
          background: isMidnight
            ? 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(217,119,6,0.1) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(217,119,6,0.25) 0%, rgba(40,21,35,0.12) 60%, transparent 80%)',
        }}
      />

      {/* Main 3D Circular Glassmorphism Control Capsule */}
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`relative rounded-full flex items-center justify-center transition-all duration-200
          backdrop-blur-md
          ${
            isMidnight
              ? 'bg-stone-950/75 border border-white/30 text-white shadow-[0_12px_28px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.8)]'
              : 'bg-[#faf6ee]/80 border border-[#e8dfd1] text-stone-900 shadow-[0_10px_24px_-4px_rgba(40,21,35,0.25),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1)]'
          }
          ${isDragging ? 'scale-105 ring-2 ring-amber-400/80 shadow-amber-500/30' : ''}
        `}
      >
        {/* Animated 3D Rotating Outer Ring */}
        <svg 
          className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={isMidnight ? 'rgba(245,158,11,0.6)' : 'rgba(40,21,35,0.4)'}
            strokeWidth="2"
            strokeDasharray="6 14"
            strokeLinecap="round"
          />
        </svg>

        {/* Scroll Progress Ring SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={isMidnight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
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

        {/* Dynamic Directional Indicator - UPWARD SCROLL INDICATOR */}
        <div 
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-200 ${
            scrollDirection === 'up' ? 'opacity-100 -translate-y-1 scale-110' : 'opacity-0 translate-y-1 scale-90'
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" />
          <svg className="w-3.5 h-3.5 -mt-0.5 text-amber-400 filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>

        {/* Dynamic Directional Indicator - DOWNWARD SCROLL INDICATOR */}
        <div 
          className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-200 ${
            scrollDirection === 'down' ? 'opacity-100 translate-y-1 scale-110' : 'opacity-0 -translate-y-1 scale-90'
          }`}
        >
          <svg className="w-3.5 h-3.5 -mb-0.5 text-amber-400 filter drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping" />
        </div>

        {/* Center Orb & Kinetic Dot */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Central jewel dot with gentle breathing pulse */}
          <div 
            className={`rounded-full transition-all duration-200 ${
              isDragging
                ? 'w-3 h-3 bg-amber-400 shadow-[0_0_12px_#f59e0b]'
                : isHoveringClickable
                  ? 'w-2.5 h-2.5 bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.6)]'
                  : 'w-2 h-2 bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]'
            }`}
          />

          {/* Tiny subtle scroll percentage in dragging mode */}
          {isDragging && (
            <span className="text-[8px] font-mono font-bold mt-0.5 leading-none text-amber-300">
              {scrollPercent}%
            </span>
          )}
        </div>

        {/* Subtle Specular Arc Highlight */}
        <div className="absolute top-1 left-2 right-2 h-2 rounded-t-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      </div>

      {/* Floating Drag Hint Pill when Mouse is held down */}
      {isDragging && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2.5 whitespace-nowrap px-2.5 py-1 rounded-full bg-stone-950/90 text-[9px] font-mono uppercase tracking-wider text-amber-300 border border-amber-400/40 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-75 duration-150">
          ↕ Drag to Scroll
        </div>
      )}
    </aside>
  );
};
