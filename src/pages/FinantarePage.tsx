import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import TBISection from '../components/finantare/TBISection';
import MogoSection from '../components/finantare/MogoSection';
import RateCalculator from '../components/finantare/RateCalculator';

export default function FinantarePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const title = "Finanțare Rapidă, Fără Bătăi de Cap";
  const words = title.split(" ");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax title (moves 0.3x slower)
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // Fade out badges
  const badgesOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Subtle background shift
  const bgShift = useTransform(scrollYProgress, [0, 1], [30, 50]);
  const smoothBgShift = useSpring(bgShift, { damping: 50, stiffness: 400 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <main className="w-full relative bg-white">
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative w-full bg-navy-900 h-auto min-h-[500px] md:h-[60vh] pt-[100px] md:pt-[120px] pb-20 flex items-center justify-center px-5 md:px-8 overflow-hidden z-20">
        
        {/* Radial Gradient Decorative animat */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: useTransform(smoothBgShift, (val) => `radial-gradient(circle at 70% ${val}%, rgba(139,111,138,0.1) 0%, transparent 50%)`)
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center mt-8">
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariants}
            className="font-body text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-5"
          >
            FINANȚARE
          </motion.div>

          <motion.h1 
            style={{ y: titleY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-white text-[clamp(1.75rem,5vw,3.5rem)] tracking-tight leading-[1.1] flex flex-wrap justify-center mb-6"
          >
            {words.map((word, idx) => (
              <motion.span key={idx} variants={wordVariants} className="inline-block mr-[0.25em] last:mr-0">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-body text-navy-300 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Două opțiuni de finanțare adaptate nevoilor tale. Răspuns în mai puțin de 2 ore.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto"
          >
            <a 
              href="#calculator"
              className="px-8 py-[0.85rem] rounded-full text-[0.85rem] font-display font-semibold transition-colors bg-mauve-600 text-white hover:bg-mauve-500 text-center w-full sm:w-auto tracking-wide"
            >
              Calculează Rata
            </a>
            <Link 
              to="/contact"
              className="px-8 py-[0.85rem] rounded-full text-[0.85rem] font-display font-semibold transition-colors border border-white/20 text-white hover:bg-white/10 text-center w-full sm:w-auto tracking-wide"
            >
              Contactează-ne
            </Link>
          </motion.div>

          <motion.div 
            style={{ opacity: badgesOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex items-center justify-center flex-wrap gap-4 md:gap-6 mt-12"
          >
            <div className="flex items-center gap-2 font-body text-sm font-medium text-navy-400">
              <Building2 size={16} />
              TBI Bank
            </div>
            <span className="text-navy-600 font-bold">&middot;</span>
            <div className="flex items-center gap-2 font-body text-sm font-medium text-navy-400">
              <Building2 size={16} />
              Mogo
            </div>
          </motion.div>

        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 pointer-events-none"
        >
          <span className="font-body text-[0.65rem] tracking-[0.2em] text-white/40 uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-[40%] bg-white/60"
            />
          </div>
        </motion.div>

      </section>

      {/* TBI SECTION (LIGHT) */}
      <TBISection />
      
      {/* Tranziție LIGHT -> DARK */}
      <div className="h-20 bg-gradient-to-b from-white to-navy-800 pointer-events-none" />

      {/* MOGO SECTION (DARK) */}
      <MogoSection />
      
      {/* Tranziție DARK -> LIGHT */}
      <div className="h-20 bg-gradient-to-b from-navy-800 to-white pointer-events-none" />

      {/* CALCULATOR SECTION (LIGHT) */}
      <RateCalculator />

    </main>
  );
}
