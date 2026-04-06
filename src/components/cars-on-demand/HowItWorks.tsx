import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';

const STEPS = [
  {
    num: "1",
    title: "Cererea Ta",
    desc: "Completezi formularul cu marca, modelul, bugetul și preferințele tale."
  },
  {
    num: "2",
    title: "Căutare Europeană",
    desc: "Echipa noastră caută mașina în rețeaua de dealeri din UE: Germania, Belgia, Olanda, Austria."
  },
  {
    num: "3",
    title: "Verificare Completă",
    desc: "Inspectăm istoricul, kilometrajul real, starea tehnică și documentele. Zero surprize."
  },
  {
    num: "4",
    title: "Livrare Acasă",
    desc: "Transportăm mașina în România, o înmatriculăm și ți-o livrăm la ușă cu numere provizorii 90 zile."
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%', amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth scroll progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Înălțime progress mobil
  const scaleY = scaleX;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
  };

  return (
    <section className="bg-white py-20 px-5 md:py-28 md:px-8 relative z-10" id="proces">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center flex flex-col items-center"
        >
          <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-2">
            PROCES
          </div>
          <h2 className="font-display font-bold text-navy-800 text-3xl">
            Cum Funcționează
          </h2>
          <p className="font-body text-navy-500 mt-3 max-w-md">
            4 pași simpli de la cerere la livrare
          </p>
        </motion.div>

        {/* TIMELINE */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mt-16 md:mt-24"
        >
          
          {/* Orizontal Line (Desktop) */}
          <div className="hidden md:block absolute top-[1.95rem] left-[10%] right-[10%] h-px bg-navy-100 z-0">
             <motion.div 
               className="h-full bg-mauve-600 origin-left"
               style={{ scaleX }}
             />
          </div>

          {/* Vertical Line (Mobile) */}
          <div className="md:hidden absolute top-4 bottom-4 left-8 w-px bg-navy-100 z-0">
             <motion.div 
               className="w-full bg-mauve-600 origin-top"
               style={{ scaleY }}
             />
          </div>

          {/* Steps Grid */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-4 relative z-10">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="flex flex-row md:flex-col items-center text-left md:text-center gap-6 md:gap-0 w-full md:w-[22%]"
              >
                {/* Număr / Cerc */}
                <motion.div 
                  variants={circleVariants}
                  className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center shrink-0 ring-4 ring-white border-[3px] border-navy-100 relative z-10"
                >
                  <span className="font-display font-bold text-white text-lg">{step.num}</span>
                </motion.div>
                
                {/* Conținut */}
                <div className="flex flex-col md:items-center mt-0 md:mt-6">
                  <h3 className="font-display font-semibold text-navy-800 text-[1.1rem]">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-navy-500 mt-2 md:max-w-[180px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
