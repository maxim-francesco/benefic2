import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CircleDollarSign } from 'lucide-react';
import { FileSearch } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { Truck } from 'lucide-react';
import { Banknote } from 'lucide-react';
import { Clock } from 'lucide-react';

const ADVANTAGES = [
  { icon: CircleDollarSign, title: 'Prețuri Sub Piața Românească', desc: 'Mașinile din vestul Europei sunt adesea cu 15-30% mai ieftine decât echivalentele de pe piața locală, la aceeași stare și kilometraj.' },
  { icon: FileSearch, title: 'Istoric Transparent Garantat', desc: 'Verificăm fiecare vehicul prin baze de date europene: CarVertical, AutoDNA, service history oficial. Știi exact ce cumperi.' },
  { icon: ShieldCheck, title: 'Garanție Inclusă', desc: 'Fiecare mașină comandată vine cu garanție Defend Insurance. Alegi pachetul potrivit: de la PLUS inclus până la DELUXE.' },
  { icon: Truck, title: 'Livrare la Domiciliu', desc: 'Ne ocupăm de transport, RAR, înmatriculare și livrare. Primești mașina gata de drum cu numere provizorii 90 zile.' },
  { icon: Banknote, title: 'Finanțare Disponibilă', desc: 'Poți finanța mașina comandată prin TBI Bank sau Mogo, cu aceleași condiții avantajoase ca la mașinile din stoc.' },
  { icon: Clock, title: 'Termen Mediu: 7-14 Zile', desc: 'De la confirmarea comenzii până la livrare, procesul durează în medie 7-14 zile lucrătoare, în funcție de locația vehiculului.' }
];

export default function AdvantagesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, y: 10 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
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
          De Ce Să Comanzi Prin Noi
        </h2>
      </motion.div>

      {/* GRID */}
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12"
      >
        {ADVANTAGES.map((adv, idx) => {
          const Icon = adv.icon;
          return (
            <motion.div key={idx} variants={itemVariants} className="flex flex-row gap-4 items-start">
              <div className="w-10 h-10 bg-navy-700/50 rounded-lg flex items-center justify-center shrink-0">
                <Icon size={20} className="text-mauve-400" strokeWidth={2} />
              </div>
              <div className="flex flex-col mt-1">
                <h3 className="font-display font-medium text-white text-base leading-snug">
                  {adv.title}
                </h3>
                <p className="font-body text-navy-300 text-sm mt-1.5 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
