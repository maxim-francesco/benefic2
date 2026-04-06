import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap } from 'lucide-react';
import PackageCard, { type PackageProps } from './PackageCard';

const PACKAGES: PackageProps[] = [
  {
    id: 'plus',
    name: 'PLUS',
    shortDesc: 'Daune mecanice',
    badge: 'PLUS',
    specs: [
      'Maxim 15 ani / 300.000 km',
      'Perioadă: 12, 24 sau 36 luni',
      '5 categorii de componente acoperite'
    ],
    btnLabel: 'Inclus în Preț'
  },
  {
    id: 'comfort',
    name: 'COMFORT',
    shortDesc: 'Daune mecanice sau electrice',
    isComfort: true,
    specs: [
      'Maxim 10 ani / 250.000 km',
      'Perioadă: 12, 24 sau 36 luni',
      '12 categorii de componente acoperite'
    ],
    btnLabel: 'Alege COMFORT'
  },
  {
    id: 'advantage',
    name: 'ADVANTAGE',
    shortDesc: 'Daune mecanice, electrice și electronice',
    specs: [
      'Maxim 6 ani / 200.000 km',
      'Perioadă: 12, 24 sau 36 luni',
      '14 categorii de componente acoperite'
    ],
    btnLabel: 'Alege ADVANTAGE'
  },
  {
    id: 'deluxe',
    name: 'DELUXE',
    shortDesc: 'Daune mecanice, electrice și electronice',
    badge: 'DELUXE',
    specs: [
      'Maxim 6 ani / 160.000 km',
      'Limită: până la prețul de achiziție',
      'Perioadă: 12, 24 sau 36 luni',
      '14 categorii de componente acoperite'
    ],
    btnLabel: 'Alege DELUXE'
  }
];

export default function PackagesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%', amount: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  return (
    <section className="bg-white py-20 px-5 md:py-28 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center flex flex-col items-center"
        >
          <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-2">
            PACHETE
          </div>
          <h2 className="font-display font-bold text-navy-800 text-3xl">
            Alege Nivelul Tău de Protecție
          </h2>
          <p className="font-body text-navy-500 mt-3 max-w-md">
            De la acoperire de bază inclusă în preț, până la protecție completă.
          </p>
        </motion.div>

        {/* PACKAGE CARDS GRID */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-stretch"
        >
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </motion.div>

        {/* NOTA HIBRID */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 md:mt-16 flex items-center gap-3 bg-navy-50 rounded-xl p-4 md:p-5 max-w-2xl w-full mx-auto border border-navy-100"
        >
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Zap size={18} className="text-mauve-600" />
          </div>
          <p className="font-body text-sm md:text-[0.95rem] text-navy-600 leading-snug">
            Vehicule hibrid (PHEV & HEV): pachetele acoperă și componentele sistemului de propulsie hibrid.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
