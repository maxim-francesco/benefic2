import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ADVANTAGES = [
  {
    title: "Evaluare Gratuită, Fără Obligații",
    desc: "Primești o ofertă realistă bazată pe piața actuală. Nu ești obligat să accepți — zero presiune."
  },
  {
    title: "Preț Transparent",
    desc: "Evaluarea se face pe baza cotațiilor din piață, starea vehiculului și istoricul de service. Îți explicăm exact cum am ajuns la sumă."
  },
  {
    title: "Bani Cash sau Avans",
    desc: "Alege ce ți se potrivește: primești banii integral sau folosești valoarea ca avans pentru orice mașină din stocul Benefic Cars."
  },
  {
    title: "Proces Rapid — 48h",
    desc: "De la acceptarea ofertei la finalizarea tranzacției: maxim 48 de ore. Ne ocupăm de toată documentația."
  }
];

export default function BuyBackAdvantages() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="w-full flex flex-col items-start pr-0 md:pr-4">
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col items-start"
      >
        <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-2">
          AVANTAJE
        </div>
        <h2 className="font-display font-bold text-white text-3xl">
          De Ce Buy Back cu Benefic Cars
        </h2>
      </motion.div>

      {/* LISTA AVANTAJE */}
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-6 mt-10"
      >
        {ADVANTAGES.map((adv, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants} 
            className="flex flex-row gap-4 items-stretch group"
          >
            {/* Timeline line - stretches to content height */}
            <div className="relative w-0.5 min-h-full shrink-0 flex items-center justify-center py-1">
               <motion.div 
                 initial={{ scaleY: 0 }}
                 animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                 className="absolute inset-0 bg-navy-700 rounded-full group-hover:bg-mauve-500 transition-colors duration-300 origin-top"
               />
            </div>
            
            {/* Text content */}
            <div className="flex flex-col py-0.5">
              <h3 className="font-display font-medium text-white text-[1.05rem]">
                {adv.title}
              </h3>
              <p className="font-body text-navy-300 text-sm mt-1 leading-relaxed max-w-sm">
                {adv.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
