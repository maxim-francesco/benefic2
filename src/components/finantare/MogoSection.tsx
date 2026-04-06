import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Zap, HandCoins } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Istoric Negativ Acceptat",
    description: "Mogo oferă finanțare și persoanelor cu istoric negativ în birourile de credit. O a doua șansă când băncile tradiționale spun nu."
  },
  {
    icon: Zap,
    title: "Proces Rapid și Simplu",
    description: "Documentație minimă, aprobare rapidă. Fără birocrație excesivă sau așteptări lungi."
  },
  {
    icon: HandCoins,
    title: "Rate Adaptate",
    description: "Planuri de rambursare flexibile, adaptate capacității tale financiare."
  }
];

function FeatureBlock({ feat }: { feat: any }) {
  const ref = useRef<HTMLDivElement>(null);
  // Activăm block-ul când ajunge aproape de centrul ecranului
  const isInView = useInView(ref, { margin: '-30% 0px -30% 0px', amount: 'some' });

  return (
    <motion.div 
      ref={ref}
      animate={{ opacity: isInView ? 1 : 0.4 }}
      transition={{ duration: 0.5 }}
      className="flex flex-row gap-4 items-start"
    >
      <motion.div 
        animate={{ 
          backgroundColor: isInView ? 'rgba(217, 70, 239, 0.15)' : 'rgba(51, 65, 85, 0.5)',
          color: isInView ? '#f0abfc' : '#94a3b8', // text-mauve-300 = #f0abfc
          borderColor: isInView ? 'rgba(217, 70, 239, 0.3)' : 'rgba(71, 85, 105, 0.3)'
        }}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border"
      >
        <feat.icon size={20} />
      </motion.div>
      <div className="flex flex-col mt-[2px]">
        <h3 className="font-display font-medium text-white text-base">
          {feat.title}
        </h3>
        <p className="font-body text-navy-300 text-sm mt-1 leading-relaxed">
          {feat.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function MogoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: '-10%', amount: 0.15 });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-10%', amount: 0.5 });
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]); // parallax usor (0.2x speed simulat)

  return (
    <section id="mogo" className="relative py-20 px-5 md:py-28 md:px-8 bg-navy-800 overflow-hidden border-b border-navy-700/50" ref={containerRef}>
      
      {/* Decorative gradient cu parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{
          background: useTransform(bgY, (y) => `radial-gradient(circle at 30% ${20 + y/3}%, rgba(139,111,138,0.08) 0%, transparent 50%)`)
        }}
      />
      
      {/* Layout max-w-2xl centrat */}
      <div className="max-w-2xl mx-auto flex flex-col relative z-10">
        
        {/* HEADER */}
        <div ref={headerRef} className="flex flex-col text-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-2"
          >
            ALTERNATIVĂ FLEXIBILĂ
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-white text-3xl"
          >
            Mogo
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-navy-300 text-lg mt-3 max-w-md"
          >
            Soluția pentru cei care au nevoie de o a doua șansă
          </motion.p>
        </div>

        {/* FEATURE BLOCKS scroll-driven opacity */}
        <div className="flex flex-col space-y-8 mt-12 w-full">
          {FEATURES.map((feat, idx) => (
            <FeatureBlock key={idx} feat={feat} />
          ))}
        </div>

        {/* CTA aniamtions pe scroll */}
        <div ref={ctaRef} className="mt-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isCtaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
            className="relative"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute inset-0 bg-mauve-600 blur-xl opacity-20 rounded-full"
            />
            <Link 
              to="/contact" 
              className="relative block bg-navy-800 text-white px-8 py-3.5 md:py-4 rounded-full font-display font-semibold transition-all hover:bg-navy-700 hover:scale-[1.04] shadow-none hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] tracking-wide"
            >
              Solicită Finanțare Mogo
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="text-navy-400 text-sm font-body mt-3"
          >
            sau sună la <a href="tel:+40700000000" className="hover:text-mauve-400 transition-colors">+40 700 000 000</a>
          </motion.p>
        </div>

      </div>
    </section>
  );
}
