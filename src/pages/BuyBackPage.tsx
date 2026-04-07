import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BadgeEuro } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Scale } from 'lucide-react';
import BuyBackSteps from '../components/buy-back/BuyBackSteps';
import BuyBackAdvantages from '../components/buy-back/BuyBackAdvantages';
import UpgradeCard from '../components/buy-back/UpgradeCard';
import BuyBackFAQ from '../components/buy-back/BuyBackFAQ';
import BuyBackForm from '../components/buy-back/BuyBackForm';

export default function BuyBackPage() {
  const title = "Vrei Să Îți Schimbi Mașina? Noi O Preluăm.";
  const words = title.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
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
        <title>Buy Back Auto — Vinde-ți Mașina Rapid | Benefic Car</title>
        <meta name="description" content="Vinde-ți mașina rapid la Benefic Car. Evaluare gratuită, ofertă în 24h, tranzacție în 48h. Acceptăm și mașini cu defecte." />
      </Helmet>
      <main id="main-content" className="w-full relative bg-white">
      
      {/* HERO SECTION (DARK) */}
      <section className="relative w-full bg-navy-900 h-auto min-h-[500px] md:min-h-[60vh] flex flex-col pt-[80px] md:pt-[100px] overflow-hidden z-20">
        
        {/* Decorative gradient radial */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 40% 50%, rgba(139,111,138,0.12) 0%, transparent 50%)'
          }}
        />
        
        {/* HERO CONTENT */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center text-center px-5 md:px-8 py-10 md:py-16 max-w-3xl mx-auto">
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariants}
            className="font-body text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-5"
          >
            BUY BACK
          </motion.div>
          
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-white text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.1] flex flex-wrap justify-center mb-6"
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
            className="font-body text-navy-200 text-[1.05rem] md:text-lg max-w-xl mx-auto leading-relaxed mt-1"
          >
            Evaluare gratuită, ofertă transparentă și posibilitatea de a folosi valoarea mașinii tale ca avans pentru un vehicul din stocul nostru.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
          >
             <a 
               href="#formular"
               className="inline-block bg-mauve-600 text-white rounded-full px-8 py-3.5 md:py-4 font-display font-semibold transition-all hover:bg-mauve-500 hover:scale-[1.04] shadow-lg shadow-mauve-600/20 tracking-wide text-center"
             >
               Solicită Evaluare Gratuită
             </a>
             <Link 
               to="/masini"
               className="inline-block border border-white/20 text-white rounded-full px-8 py-3.5 md:py-4 font-display font-semibold transition-all hover:bg-white/10 text-center tracking-wide"
             >
               Vezi Mașinile Disponibile
             </Link>
          </motion.div>

        </div>

        {/* 3 MINI-STATS BAR (DARK) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-auto w-full bg-navy-800 py-6 border-t border-navy-700/50 relative z-10"
        >
          <div className="max-w-4xl mx-auto px-5 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2.5">
              <BadgeEuro size={18} className="text-mauve-400 shrink-0" />
              <span className="font-body text-sm font-medium text-navy-300">Evaluare Gratuită</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-navy-600"></div>
            <div className="flex items-center gap-2.5">
              <Clock size={18} className="text-mauve-400 shrink-0" />
              <span className="font-body text-sm font-medium text-navy-300">Ofertă în 24h</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-navy-600"></div>
            <div className="flex items-center gap-2.5">
              <Scale size={18} className="text-mauve-400 shrink-0" />
              <span className="font-body text-sm font-medium text-navy-300">Preț Corect Garantat</span>
            </div>
          </div>
        </motion.div>

      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE LIGHT */}
      <div className="h-20 bg-gradient-to-b from-navy-800 to-white pointer-events-none block w-full relative z-10" />

      {/* HOW IT WORKS SECTION (LIGHT) */}
      <BuyBackSteps />

      {/* GRADIENT TRANZIȚIE CĂTRE DARK */}
      <div className="h-20 bg-gradient-to-b from-white to-navy-800 pointer-events-none block w-full relative z-10" />

      {/* AVANTAJE & UPGRADE SECTION (DARK) */}
      <section className="relative bg-navy-800 py-20 px-5 md:py-28 md:px-8 overflow-hidden z-20">
        
        {/* Decorative gradient radial */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 20% 40%, rgba(139,111,138,0.08) 0%, transparent 50%)'
          }}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
          <div className="md:col-span-3">
            <BuyBackAdvantages />
          </div>
          <div className="md:col-span-2">
            <UpgradeCard />
          </div>
        </div>
      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE LIGHT (Către formular) */}
      <div className="h-20 bg-gradient-to-b from-navy-800 to-white pointer-events-none block w-full relative z-10" />

      {/* FAQ & EVALUARE SECTION (LIGHT) */}
      <section className="bg-white py-20 px-5 md:py-28 md:px-8 relative z-10" id="formular">
        <div className="max-w-5xl mx-auto w-full flex flex-col">
          <BuyBackFAQ />
          <div className="mt-24 md:mt-32">
            <BuyBackForm />
          </div>
        </div>
      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE DARK (Către CTA) */}
      <div className="h-20 bg-gradient-to-b from-white to-navy-900 pointer-events-none block w-full relative z-10" />

      {/* CTA SECTION (DARK) */}
      <section className="bg-navy-900 py-20 px-5 md:px-8 relative z-20 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-white text-2xl"
          >
            Mașina Ta Merită un Preț Corect
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-navy-300 mt-3"
          >
            Evaluare gratuită, ofertă în 24h, zero obligații.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center"
          >
            <a 
              href="#formular" 
              className="inline-block bg-mauve-600 text-white rounded-full px-8 py-3.5 md:py-4 font-display font-semibold transition-all hover:bg-mauve-500 hover:scale-[1.04] shadow-lg shadow-mauve-600/20 tracking-wide text-center"
            >
              Solicită Evaluare
            </a>
            <Link 
              to="/masini"
              className="inline-block border border-white/20 text-white rounded-full px-8 py-3.5 md:py-4 font-display font-semibold transition-all hover:bg-white/10 text-center tracking-wide"
            >
              Explorează Stocul
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
    </>
  );
}
