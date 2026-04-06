import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTASection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.08em", "-0.02em"]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yRight = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: "spring", stiffness: 200, damping: 15 } 
    }
  };

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-b from-white via-mauve-50/50 to-white overflow-hidden py-24 md:py-32">
      
      {/* Decorative circles cu parallax */}
      <motion.div 
        style={{ y: yLeft }}
        className="absolute w-64 h-64 bg-mauve-200 opacity-20 rounded-full blur-3xl -left-32 top-1/2 pointer-events-none" 
      />
      
      <motion.div 
        style={{ y: yRight }}
        className="absolute w-48 h-48 bg-navy-200 opacity-15 rounded-full blur-3xl -right-20 top-1/3 pointer-events-none" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-[700px] mx-auto px-[1.2rem] text-center flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="text-[0.7rem] font-semibold tracking-[0.4em] text-mauve-600 uppercase mb-[0.6rem]">
          PREGĂTIT?
        </motion.div>

        <motion.h2 
          variants={itemVariants} 
          style={{ letterSpacing }}
          className="font-display font-semibold text-navy-800 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-5 tracking-tight"
        >
          Să Îți Găsești Mașina?
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-navy-500 font-body text-[0.95rem] md:text-base max-w-[450px] mb-8"
        >
          Descoperă stocul nostru sau contactează-ne direct pentru orice detalii.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto items-center justify-center mt-2"
        >
          <motion.div variants={buttonVariants} className="w-full sm:w-auto">
            <Link 
              to="/masini" 
              className="block w-full text-center font-display font-semibold text-[0.85rem] bg-navy-800 text-white px-8 py-[0.9rem] md:py-[0.85rem] rounded-full tracking-[0.03em] hover:scale-[1.05] hover:shadow-xl transition-all duration-300"
            >
              Explorează Stocul
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} className="w-full sm:w-auto">
            <Link 
              to="/contact" 
              className="block w-full text-center font-display font-semibold text-[0.85rem] bg-transparent border-2 border-navy-200 text-navy-800 px-8 py-[0.9rem] md:py-[0.85rem] rounded-full tracking-[0.03em] hover:bg-navy-50 hover:border-navy-800 transition-all duration-300"
            >
              Contactează-ne
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
