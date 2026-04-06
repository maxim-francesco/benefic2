import { motion } from 'framer-motion';
import ContactCards from '../components/contact/ContactCards';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';
import ContactFAQ from '../components/contact/ContactFAQ';
import { Phone, Mail, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const title = "Hai Să Vorbim";
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
    <main className="w-full relative bg-white">
      
      {/* HERO SECTION (DARK) */}
      <section className="relative w-full bg-navy-900 h-auto min-h-[350px] md:min-h-[50vh] flex flex-col pt-[80px] md:pt-[100px] overflow-hidden z-20">
        
        {/* Decorative gradient radial */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(139,111,138,0.12) 0%, transparent 50%)'
          }}
        />
        
        {/* HERO CONTENT */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center text-center px-5 md:px-8 py-10 md:py-16 max-w-3xl mx-auto">
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariants}
            className="font-body text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-5"
          >
            CONTACT
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
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-body text-navy-300 text-[1.05rem] md:text-lg max-w-xl mx-auto leading-relaxed mt-1"
          >
            Fie că vrei să vezi o mașină, să ceri o ofertă sau ai o întrebare — suntem aici pentru tine.
          </motion.p>
          
        </div>
      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE LIGHT */}
      <div className="h-20 bg-gradient-to-b from-navy-900 to-white pointer-events-none block w-full relative z-10" />

      {/* INFO CONTACT (LIGHT) */}
      <section className="bg-white py-20 px-5 md:py-28 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto w-full flex flex-col">
          <ContactCards />
        </div>
      </section>

      {/* SPLIT SECTION (DARK/LIGHT) */}
      <section className="w-full flex flex-col md:grid md:grid-cols-2 min-h-[600px] relative z-10">
        <div className="bg-navy-800 w-full flex justify-center border-b border-navy-700 md:border-b-0">
           <ContactForm />
        </div>
        <div className="bg-white w-full flex justify-center">
           <ContactMap />
        </div>
      </section>

      {/* QUICK FAQ SECTION (LIGHT) */}
      <section className="bg-navy-50 py-16 px-5 md:py-20 md:px-8 relative z-10">
        <ContactFAQ />
      </section>

      {/* GRADIENT TRANZIȚIE CĂTRE DARK (CTA) */}
      <div className="h-20 bg-gradient-to-b from-navy-50 to-navy-900 pointer-events-none block w-full relative z-10" />

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
            Suntem Aici Pentru Tine
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-navy-300 mt-3"
          >
            Contactează-ne prin orice metodă preferi — sună, scrie sau vino la noi.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8 justify-center w-full sm:w-auto"
          >
            <a 
              href="tel:+40700000000"
              className="inline-flex items-center justify-center gap-2 bg-mauve-600 text-white rounded-full px-6 py-3.5 font-display font-semibold transition-all hover:bg-mauve-500 text-sm"
            >
              <Phone size={16} />
              Sună Acum
            </a>
            <a 
              href="mailto:contact@beneficcars.ro"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white rounded-full px-6 py-3.5 font-display font-semibold transition-all hover:bg-white/10 text-sm"
            >
              <Mail size={16} />
              Scrie Email
            </a>
            <Link 
              to="/masini"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white rounded-full px-6 py-3.5 font-display font-semibold transition-all hover:bg-white/10 text-sm"
            >
              <Car size={16} />
              Vezi Mașinile
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
