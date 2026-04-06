import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const STATS = [
  { value: 500, suffix: '+', label: 'Mașini Vândute' },
  { value: 98, suffix: '%', label: 'Clienți Mulțumiți' },
  { value: 12, suffix: '', label: 'Luni Garanție Inclusă' },
  { value: 48, suffix: 'h', label: 'Livrare Rapidă' },
];

function OdometerValue({ value, suffix, shouldAnimate, delay }: { value: number, suffix: string, shouldAnimate: boolean, delay: number }) {
  const str = `${value}${suffix}`;
  const chars = str.split('');

  return (
    <span className="inline-flex">
      {chars.map((char, index) => {
        const isSpecial = isNaN(Number(char)) || char === ' ';

        if (isSpecial) {
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: delay + index * 0.1 + 0.3 }}
              className="inline-block relative z-10"
            >
              {char}
            </motion.span>
          );
        }

        return (
          <span key={index} className="inline-block overflow-hidden relative px-[1px]" style={{ lineHeight: '1.2' }}>
            <motion.span
              initial={{ y: '-100%', opacity: 0, rotateX: 90 }}
              animate={shouldAnimate ? { y: '0%', opacity: 1, rotateX: 0 } : { y: '-100%', opacity: 0, rotateX: 90 }}
              transition={{
                duration: 0.8,
                delay: delay + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ display: 'inline-block', transformOrigin: 'bottom' }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function StatItem({ value, suffix, label, index, shouldAnimate }: { value: number, suffix: string, label: string, index: number, shouldAnimate: boolean }) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="font-display font-semibold text-white text-[clamp(2rem,4vw,3rem)] tracking-tight">
        <OdometerValue value={value} suffix={suffix} shouldAnimate={shouldAnimate} delay={index * 0.2} />
      </div>
      <div className="font-body font-normal text-navy-300 text-[0.85rem] mt-1 tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Trigger animation based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 0.3 -> 0.7: vizibil, numerele se animează
    if (latest >= 0.25 && !shouldAnimate) {
      setShouldAnimate(true);
    } else if (latest < 0.1 && shouldAnimate) {
      setShouldAnimate(false);
    }
  });

  // - Progress 0→0.3: fade-in (opacity 0→1, scale 0.98→1)
  // - Progress 0.7→1: fade-out (opacity 1→0, translateY 0→-30px)
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.98, 1]);
  const y = useTransform(scrollYProgress, [0.7, 1], ["0px", "-30px"]);

  return (
    <section ref={wrapperRef} className="relative h-[250vh] bg-navy-900 w-full z-10">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background gradient decoration */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(139,111,138,0.08) 0%, transparent 60%)' }}
        />

        {/* Thin horizontal line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent z-10" />

        <motion.div 
          style={{ opacity, scale, y }}
          className="max-w-[1100px] w-full mx-auto px-[1.2rem] md:px-8 grid grid-cols-2 gap-y-10 md:flex md:flex-row md:items-center md:justify-between relative z-10"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center w-full justify-center relative md:flex-1">
              <StatItem 
                value={stat.value} 
                suffix={stat.suffix} 
                label={stat.label} 
                index={i} 
                shouldAnimate={shouldAnimate} 
              />
              {i < STATS.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[50%] min-h-[40px] bg-navy-700" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
