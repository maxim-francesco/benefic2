import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PackagesSection from '../components/garantie/PackagesSection';
import ComponentsComparison from '../components/garantie/ComponentsComparison';

export default function GarantiePage() {
  const title = "Conduce Fără Griji";
  const words = title.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
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
    <>
      <Helmet>
        <title>Garanție Auto Defend Insurance — Benefic Car Ilfov</title>
        <meta name="description" content="Garanție mecanică Defend Insurance inclusă în preț. Pachete DELUXE, ADVANTAGE, COMFORT și PLUS. Acoperire până la 15 ani." />
      </Helmet>
      <main id="main-content" className="w-full relative bg-white">
      
      {/* HERO SECTION (DARK) */}
      <section className="relative w-full bg-navy-900 h-auto min-h-[500px] md:h-[60vh] pt-[100px] md:pt-[120px] pb-20 flex items-center justify-center px-5 md:px-8 overflow-hidden z-20">
        
        {/* Decorative gradient radial */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(139,111,138,0.12) 0%, transparent 50%)'
          }}
        />
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center mt-8">
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariants}
            className="font-body text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-5"
          >
            GARANȚIE
          </motion.div>
          
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-white text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.1] flex flex-wrap justify-center"
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
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-body text-navy-200 text-lg max-w-xl mx-auto leading-relaxed mt-4"
          >
            Fiecare mașină Benefic Car vine cu garanție inclusă. Extinde protecția până la 3 ani prin Defend Insurance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 inline-flex items-center gap-2 bg-navy-800 border border-navy-700 px-4 py-2 rounded-full text-sm text-navy-300 font-body shadow-lg shadow-navy-950/20"
          >
             <ShieldCheck size={16} className="text-mauve-400" />
             Defend Insurance — Partener Oficial
          </motion.div>

        </div>
      </section>

      {/* MINI STATS BAR (DARK) */}
      <section className="bg-navy-800 py-6 border-t border-navy-700/50 relative z-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          
          {/* Layout pentru desktop (row) vs mobile (grid 2x2) */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:gap-0 md:flex md:flex-row md:items-center md:justify-center">
             
             {/* Item 1 */}
             <motion.div 
               initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
               className="flex flex-col items-center text-center md:px-8"
             >
               <div className="font-display font-semibold text-white text-lg">4 Pachete</div>
               <div className="font-body text-navy-400 text-xs mt-0.5 whitespace-nowrap">Disponibile</div>
             </motion.div>

             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="hidden md:block w-px h-8 bg-navy-700" />

             {/* Item 2 */}
             <motion.div 
               initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}
               className="flex flex-col items-center text-center md:px-8"
             >
               <div className="font-display font-semibold text-white text-lg">Până la 36 Luni</div>
               <div className="font-body text-navy-400 text-xs mt-0.5 whitespace-nowrap">Acoperire</div>
             </motion.div>

             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="hidden md:block w-px h-8 bg-navy-700" />

             {/* Item 3 */}
             <motion.div 
               initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }}
               className="flex flex-col items-center text-center md:px-8"
             >
               <div className="font-display font-semibold text-white text-lg">Până la 300.000 km</div>
               <div className="font-body text-navy-400 text-xs mt-0.5 whitespace-nowrap">Limită de intrare</div>
             </motion.div>

             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="hidden md:block w-px h-8 bg-navy-700" />

             {/* Item 4 */}
             <motion.div 
               initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}
               className="flex flex-col items-center text-center md:px-8"
             >
               <div className="font-display font-semibold text-white text-lg">Hibrid Inclus</div>
               <div className="font-body text-navy-400 text-xs mt-0.5 whitespace-nowrap">Baterii acoperite parțial</div>
             </motion.div>

          </div>
        </div>
      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE LIGHT */}
      <div className="h-20 bg-gradient-to-b from-navy-800 to-white pointer-events-none block w-full relative z-10" />

      {/* PACKAGES SECTION (LIGHT) */}
      <PackagesSection />

      {/* GRADIENT TRANZIȚIE CĂTRE DARK */}
      <div className="h-20 bg-gradient-to-b from-white to-navy-800 pointer-events-none" />

      {/* COMPONENTS COMPARISON (DARK) */}
      <ComponentsComparison />

      {/* GRADIENT TRANZIȚIE CĂTRE LIGHT (Sub componente) */}
      <div className="h-20 bg-gradient-to-b from-navy-800 to-white pointer-events-none block w-full relative z-10" />

      {/* CTA SECTION (LIGHT) */}
      <section className="bg-gradient-to-b from-white via-mauve-50/30 to-white py-24 px-5 md:px-8 relative z-20">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-navy-800 text-3xl"
          >
            Protejează-ți Investiția
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-navy-500 mt-3 max-w-md"
          >
            Contactează-ne pentru a alege pachetul potrivit mașinii tale.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mt-8 justify-center w-full sm:w-auto"
          >
            <Link 
              to="/contact" 
              className="bg-navy-800 text-white rounded-full px-8 py-3.5 md:py-4 font-display font-semibold transition-all hover:bg-navy-700 hover:scale-[1.03] text-center w-full sm:w-auto"
            >
              Contactează-ne
            </Link>
            <Link 
              to="/masini" 
              className="border border-navy-200 text-navy-800 rounded-full px-8 py-3.5 md:py-4 font-display font-semibold transition-all hover:bg-navy-50 hover:scale-[1.03] text-center w-full sm:w-auto"
            >
              Vezi Mașinile
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
    </>
  );
}
