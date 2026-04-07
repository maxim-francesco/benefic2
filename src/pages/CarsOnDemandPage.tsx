import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HowItWorks from '../components/cars-on-demand/HowItWorks';
import AdvantagesSection from '../components/cars-on-demand/AdvantagesSection';
import SourceCountries from '../components/cars-on-demand/SourceCountries';
import FAQSection from '../components/cars-on-demand/FAQSection';
import OrderForm from '../components/cars-on-demand/OrderForm';

export default function CarsOnDemandPage() {
  const title = "Nu Găsești Ce Cauți? Îți Aducem Noi.";
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
        <title>Mașini la Comandă din Germania & Europa — Benefic Car</title>
        <meta name="description" content="Comandă mașina dorită din Germania, Belgia, Olanda, Austria sau Italia. Livrare în 7-14 zile, verificare completă, prețuri cu 15-30% mai mici." />
      </Helmet>
      <main id="main-content" className="w-full relative bg-white">
      
      {/* HERO SECTION (DARK) */}
      <section className="relative w-full bg-navy-900 h-auto min-h-[500px] md:h-[60vh] pt-[100px] md:pt-[120px] pb-20 flex items-center justify-center px-5 md:px-8 overflow-hidden z-20">
        
        {/* Decorative gradient radial */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 60% 40%, rgba(139,111,138,0.12) 0%, transparent 50%)'
          }}
        />
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center mt-8">
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariants}
            className="font-body text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-5"
          >
            MAȘINI LA COMANDĂ
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
            Spune-ne exact ce mașină visezi — marca, modelul, bugetul. Noi o găsim în stocul european și ți-o aducem cu garanție și acte în regulă.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-10"
          >
             <a 
               href="#formular"
               className="inline-block bg-mauve-600 text-white rounded-full px-8 py-3.5 md:py-4 font-display font-semibold transition-all hover:bg-mauve-500 hover:scale-[1.04] shadow-lg shadow-mauve-600/20 tracking-wide"
             >
               Trimite Cererea Ta
             </a>
          </motion.div>

        </div>
      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE LIGHT */}
      <div className="h-20 bg-gradient-to-b from-navy-900 to-white pointer-events-none block w-full relative z-10" />

      {/* HOW IT WORKS SECTION (LIGHT) */}
      <HowItWorks />

      {/* GRADIENT TRANZIȚIE CĂTRE DARK */}
      <div className="h-20 bg-gradient-to-b from-white to-navy-800 pointer-events-none block w-full relative z-10" />

      {/* INFO & ADVANTAGES SECTION (DARK) */}
      <section className="relative bg-navy-800 py-20 px-5 md:py-28 md:px-8 overflow-hidden z-20">
        
        {/* Decorative gradient radial */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 80% 60%, rgba(139,111,138,0.08) 0%, transparent 50%)'
          }}
        />
        
        <div className="relative z-10 w-full flex flex-col">
          <AdvantagesSection />
          <div className="mt-24">
            <SourceCountries />
          </div>
        </div>
      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE LIGHT (Către formular) */}
      <div className="h-20 bg-gradient-to-b from-navy-800 to-white pointer-events-none block w-full relative z-10" />

      {/* FAQ & ORDER FORM SECTION (LIGHT) */}
      <section className="bg-white py-20 px-5 md:py-28 md:px-8 relative z-10" id="cerere">
        <div className="max-w-5xl mx-auto w-full flex flex-col">
          <FAQSection />
          <div className="mt-24 md:mt-32">
            <OrderForm />
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
            Nu Aștepta — Mașina Ta Te Așteaptă în Europa
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-navy-300 mt-3"
          >
            Completează cererea acum și primești opțiuni în 24h.
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#formular" 
            className="inline-block bg-mauve-600 text-white rounded-full px-8 py-4 mt-8 font-display font-semibold transition-all hover:bg-mauve-500 hover:scale-[1.04] shadow-lg shadow-mauve-600/20 tracking-wide"
          >
            Completează Cererea
          </motion.a>
        </div>
      </section>

    </main>
    </>
  );
}
