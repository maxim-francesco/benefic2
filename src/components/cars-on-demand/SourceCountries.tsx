import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const COUNTRIES = [
  { code: 'DE', name: 'Germania', desc: 'Cel mai mare furnizor' },
  { code: 'BE', name: 'Belgia', desc: 'Prețuri competitive' },
  { code: 'NL', name: 'Olanda', desc: 'Stoc diversificat' },
  { code: 'AT', name: 'Austria', desc: 'Calitate premium' },
  { code: 'IT', name: 'Italia', desc: 'Mărci sportive' }
];

export default function SourceCountries() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
  };

  return (
    <div className="max-w-4xl mx-auto w-full text-center">
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col items-center"
      >
        <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-2">
          PIEȚE EUROPENE
        </div>
        <h2 className="font-display font-bold text-white text-2xl">
          Rețeaua Noastră de Furnizori
        </h2>
      </motion.div>

      {/* COUNTRIES LIST */}
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-row justify-center flex-wrap gap-6 md:gap-8 mt-12"
      >
        {COUNTRIES.map((ctry, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants} 
            className="flex flex-col items-center group cursor-default"
          >
            {/* Country Code Circle */}
            <div className="w-14 h-14 bg-navy-700/50 border border-navy-600/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-navy-700/80 group-hover:border-mauve-500/50 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]">
              <span className="font-display font-bold text-white text-sm tracking-widest">{ctry.code}</span>
            </div>
            
            {/* Country Info */}
            <h3 className="font-body font-medium text-sm text-navy-300 mt-3 group-hover:text-white transition-colors duration-300">
              {ctry.name}
            </h3>
            <p className="font-body text-[0.7rem] text-navy-500 mt-0.5">
              {ctry.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
