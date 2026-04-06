import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Minus, ArrowRight } from 'lucide-react';

const COMPONENTS = [
  { name: 'Motor', cov: [true, true, true, true] },
  { name: 'Transmisie', cov: [true, true, true, true] },
  { name: 'Diferențial', cov: [true, true, true, true] },
  { name: 'Consumabile', cov: [true, true, true, true] },
  { name: 'Tractare auto', cov: [true, true, true, true] },
  { name: 'Ambreiaj', cov: [false, true, true, true] },
  { name: 'Frâne', cov: [false, true, true, true] },
  { name: 'Tracțiune 4x4', cov: [false, true, true, true] },
  { name: 'Sistem alimentare', cov: [false, true, true, true] },
  { name: 'Instalație electrică', cov: [false, true, true, true] },
  { name: 'Direcție (+ servo)', cov: [false, true, true, true] },
  { name: 'Răcire motor', cov: [false, true, true, true] },
  { name: 'Injecție combustibil', cov: [false, false, true, true] },
  { name: 'Aer condiționat', cov: [false, false, true, true] }
];

const PACKAGES = [
  { name: 'PLUS', label: 'Inclus' },
  { name: 'COMFORT', label: 'Upgrade' },
  { name: 'ADVANTAGE', label: 'Upgrade' },
  { name: 'DELUXE', label: 'Upgrade' }
];

const Row = ({ comp, idx }: { comp: typeof COMPONENTS[0], idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5%', amount: 0.1 });
  
  const isZebra = idx % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ delay: idx * 0.03, duration: 0.4 }}
      className={`grid grid-cols-[minmax(160px,200px)_1fr_1fr_1fr_1fr] items-center py-3.5 rounded-lg min-w-[760px] md:min-w-0 ${isZebra ? 'bg-navy-700/20' : 'bg-transparent'}`}
    >
      <div 
        className={`sticky left-0 px-4 font-body text-sm text-navy-200 z-10 flex items-center h-full ${isZebra ? 'bg-[#182138] md:bg-transparent' : 'bg-navy-800 md:bg-transparent'}`}
      >
        {comp.name}
      </div>
      
      {comp.cov.map((covered, i) => (
        <div key={i} className="flex justify-center">
          {covered ? (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={isInView ? { scale: 1 } : { scale: 0 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.03 + 0.1 }} 
              className="w-6 h-6 rounded-full bg-mauve-600/20 flex items-center justify-center"
            >
              <Check size={14} className="text-mauve-400" strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={isInView ? { scale: 1 } : { scale: 0 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.03 + 0.1 }} 
              className="w-6 h-6 rounded-full bg-navy-700/30 flex items-center justify-center"
            >
              <Minus size={14} className="text-navy-500" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default function ComponentsComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%', amount: 0.1 });

  return (
    <section id="componente" className="relative bg-navy-800 py-20 px-5 md:py-28 md:px-8 overflow-hidden z-20">
      
      {/* Decorative gradient radial */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(139,111,138,0.08) 0%, transparent 50%)'
        }}
      />
      
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center flex flex-col items-center mb-12 md:mb-16"
        >
          <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-2">
            DETALII
          </div>
          <h2 className="font-display font-bold text-white text-3xl">
            Ce Acoperă Fiecare Pachet
          </h2>
          <p className="font-body text-navy-300 mt-3 max-w-md">
            Comparație detaliată a componentelor acoperite
          </p>
        </motion.div>

        {/* COMPARISON TABLE */}
        <div className="w-full relative" ref={containerRef}>
          
          {/* Mobile Swipe Hint */}
          <div className="flex justify-end mb-3 md:hidden">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 text-navy-300 text-[0.65rem] font-medium tracking-wide uppercase bg-navy-700/50 px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              <span>Glisează tabelul</span>
              <ArrowRight size={12} className="animate-pulse" />
            </motion.div>
          </div>

          <div className="relative rounded-xl">
            {/* Fade right overlay to visually indicate overflow */}
            <div className="absolute right-0 top-0 bottom-6 w-8 md:w-0 bg-gradient-to-l from-navy-800 to-transparent pointer-events-none z-30" />
            
            <div className="overflow-x-auto md:overflow-x-visible snap-x custom-scrollbar pb-6 md:pb-0 rounded-xl">
              <div className="min-w-[760px] md:min-w-0">
              
              {/* HEADER ROW */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-[minmax(160px,200px)_1fr_1fr_1fr_1fr] items-center py-4 border-b border-navy-700 sticky top-0 md:top-16 z-20 bg-navy-800/95 backdrop-blur-sm mb-4"
              >
                {/* Empty first col */}
                <div className="sticky left-0 bg-navy-800/95 md:bg-transparent z-10 w-full h-full" />
                
                {PACKAGES.map((pkg, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="font-display font-semibold text-white text-sm tracking-wider">{pkg.name}</div>
                    <div className="text-navy-400 text-[0.65rem] uppercase tracking-wider mt-1">{pkg.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* ROWS */}
              <div className="flex flex-col gap-1">
                {COMPONENTS.map((comp, idx) => (
                  <Row key={comp.name} comp={comp} idx={idx} />
                ))}
              </div>

            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
