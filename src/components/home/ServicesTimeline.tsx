import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Banknote, RotateCcw, Search, Truck, FileCheck } from 'lucide-react';
import { TimelineItem } from '../shared/TimelineItem';

const SERVICES = [
  { icon: Shield, title: "Garanție 12 Luni", description: "Fiecare mașină vine cu garanție inclusă. Extinde până la 3 ani prin Defend Insurance." },
  { icon: Banknote, title: "Finanțare Flexibilă", description: "Rate avantajoase prin TBI Bank și Mogo. Răspuns în 24h." },
  { icon: RotateCcw, title: "Program Buy Back", description: "Îți oferim cel mai bun preț pentru vehiculul tău actual." },
  { icon: Search, title: "Mașini la Comandă", description: "Nu găsești ce cauți? Îți aducem mașina dorită din stoc european." },
  { icon: Truck, title: "Livrare la Domiciliu", description: "Oriunde în România. Numere provizorii 90 zile incluse." },
  { icon: FileCheck, title: "Istoric Verificat", description: "Documentație completă și istoric transparent." }
];

export default function ServicesTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-navy-800 relative py-20 px-5 md:py-28 md:px-8 overflow-hidden z-10 border-t border-navy-700/50">
      
      {/* Decorative gradients */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
        style={{
          background: `
            radial-gradient(circle at 80% 20%, rgba(139,111,138,0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(139,111,138,0.06) 0%, transparent 50%)
          `
        }}
      />
      
      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Header - Fade-up motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <div className="font-body text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-400 uppercase mb-[0.6rem]">
            SERVICII
          </div>
          <h2 className="font-display text-4xl font-semibold text-white tracking-tight">
            De Ce Benefic Cars?
          </h2>
          <p className="font-body text-navy-300 text-[0.95rem] md:text-base mt-4 max-w-lg">
            Tot ce ai nevoie, sub un singur acoperiș
          </p>
        </motion.div>

        {/* Timeline Core */}
        <div ref={containerRef} className="max-w-4xl mx-auto relative">
          
          {/* Background Line */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-navy-600 to-transparent opacity-50" />
          
          {/* Animated Glow Line Tracker */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 w-px bg-mauve-500 origin-top shadow-[0_0_12px_rgba(217,70,239,0.5)] z-10"
          />

          {/* Follow Dot */}
          <motion.div 
            style={{ top: lineHeight }}
            className="absolute left-8 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-mauve-500 rounded-full shadow-[0_0_12px_rgba(217,70,239,0.8)] z-30"
          />

          {/* Mapping Items */}
          <div className="pt-8 pb-8 flex flex-col relative z-20">
            {SERVICES.map((service, idx) => (
              <TimelineItem key={idx} item={service} index={idx} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
