import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, animate } from 'framer-motion';
import { User, Building2 } from 'lucide-react';

const FIZICE = [
  "Vârsta: 18-75 ani (la terminarea creditului)",
  "Minim 3 luni la actualul angajator",
  "Salariu minim: 2.000 lei / Pensie minimă: 1.250 lei",
  "Acceptăm: salarii, pensii, PFA, diurne, chirii, dividende",
  "Se acceptă codebitor (nu obligatoriu din familie)",
  "Venituri din străinătate: contract nedeterminat, minim 6 luni vechime"
];

const JURIDICE = [
  "Cifră de afaceri minimă: 500.000 RON (1.500.000 RON transport/construcții)",
  "Vechime firmă: minim 1 an",
  "Bilanțul pe anul anterior depus",
  "Sumă maximă: 250.000 RON (până la 10% din cifra de afaceri)"
];

// Helper animat pentru numărătoare
function CountUpNumber({ from = 0, to, duration = 2, decimals = 0 }: { from?: number, to: number, duration?: number, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  const [val, setVal] = useState(from.toString());

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setVal(new Intl.NumberFormat('ro-RO', { 
            minimumFractionDigits: decimals, 
            maximumFractionDigits: decimals 
          }).format(latest));
        }
      });
      return controls.stop;
    }
  }, [isInView, from, to, duration, decimals]);

  return <span ref={nodeRef}>{val}</span>;
}

const CriteriuItem = ({ text }: { text: string }) => {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%', amount: 0.5 });

  return (
    <li ref={ref} className="relative pl-6 mb-[0.8rem] text-navy-600 font-body text-[0.85rem] leading-relaxed">
      {/* Dot animat */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute left-[-3.5px] top-[6px] w-2 h-2 bg-mauve-500 rounded-full z-10 origin-center" 
      />
      {/* Text animat cu x: 15 -> 0 */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }} // stagger simulate
      >
        {text}
      </motion.div>
    </li>
  );
};

const SectionTitle = ({ icon: Icon, text }: { icon: any, text: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%', amount: 0.5 });

  return (
    <motion.h4 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="font-display font-medium text-navy-700 text-base flex items-center gap-2 mb-4"
    >
      <motion.div
        initial={{ rotate: -90, opacity: 0 }}
        animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
      >
        <Icon size={16} className="text-navy-400" />
      </motion.div>
      {text}
    </motion.h4>
  );
}

export default function TBISection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%', amount: 0.15 });

  // Pentru linia verticală care se desenează
  const trackFiziceRef = useRef<HTMLUListElement>(null);
  const trackJuridiceRef = useRef<HTMLUListElement>(null);
  
  const { scrollYProgress: fpScroll } = useScroll({ target: trackFiziceRef, offset: ["start center", "end center"] });
  const { scrollYProgress: jpScroll } = useScroll({ target: trackJuridiceRef, offset: ["start center", "end center"] });

  return (
    <section id="tbi" className="py-20 px-5 md:py-28 md:px-8 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch" ref={containerRef}>
        
        {/* COLOANA STÂNGA - Info (stretches to full height pt sticky corect) */}
        <div className="flex flex-col h-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase">
              PARTENER PRINCIPAL
            </div>
            <h2 className="font-display font-bold text-navy-800 text-3xl md:text-4xl mt-2">
              TBI Bank
            </h2>
            <p className="font-body text-navy-500 text-[0.95rem] mt-4 leading-relaxed">
              Finanțare rapidă cu răspuns în 15 minute - 2 ore. Acceptăm o gamă largă de venituri: salarii, pensii, PFA, diurne, chirii, dividende.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 bg-navy-50 rounded-2xl p-6 md:p-8 border border-navy-100 sticky top-24"
          >
            <div>
              <div className="font-display font-semibold text-navy-800 text-xl flex gap-1">
                <CountUpNumber from={0} to={3000} duration={1.5} /> - <CountUpNumber from={0} to={150000} duration={2} /> RON
              </div>
              <div className="font-body text-navy-500 text-sm mt-1">
                Sumă finanțată disponibilă
              </div>
            </div>
            <div className="h-px w-full bg-navy-100/80 my-5" />
            <div>
              <div className="font-display font-semibold text-mauve-600 text-xl">
                <CountUpNumber from={0} to={7.9} duration={2} decimals={1} />% DAE
              </div>
              <div className="font-body text-navy-500 text-sm mt-1">
                Dobândă Anuală Efectivă
              </div>
            </div>
          </motion.div>
        </div>

        {/* COLOANA DREAPTA - Criterii */}
        <div className="flex flex-col">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display font-medium text-navy-800 text-lg mb-2"
          >
            Criterii de Eligibilitate
          </motion.h3>

          {/* Persoane Fizice */}
          <div className="mt-5">
            <SectionTitle icon={User} text="Persoane Fizice" />
            <ul className="relative ml-[5px]" ref={trackFiziceRef}>
              {/* Linia de background estompată */}
              <div className="absolute left-0 top-2 bottom-3 w-px bg-navy-100" />
              {/* Linia activată pe scroll */}
              <motion.div 
                style={{ scaleY: fpScroll }}
                className="absolute left-0 top-2 bottom-3 w-px bg-navy-300 origin-top z-0" 
              />
              {FIZICE.map((item, idx) => (
                <CriteriuItem key={`fizice-${idx}`} text={item} />
              ))}
            </ul>
          </div>

          {/* Persoane Juridice */}
          <div className="mt-6">
            <SectionTitle icon={Building2} text="Persoane Juridice" />
            <ul className="relative ml-[5px]" ref={trackJuridiceRef}>
              <div className="absolute left-0 top-2 bottom-3 w-px bg-navy-100" />
              <motion.div 
                style={{ scaleY: jpScroll }}
                className="absolute left-0 top-2 bottom-3 w-px bg-navy-300 origin-top z-0" 
              />
              {JURIDICE.map((item, idx) => (
                <CriteriuItem key={`juridice-${idx}`} text={item} />
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
