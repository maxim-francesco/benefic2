import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RotateCcw, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const BENEFITS = [
  "Diferența se poate finanța prin TBI Bank / Mogo",
  "Garanție Defend Insurance pe noul vehicul",
  "Livrare la domiciliu inclusă"
];

export default function UpgradeCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ type: "spring" as const, stiffness: 100, damping: 20, duration: 0.6 }}
      className="bg-navy-700/50 border border-navy-600/30 rounded-2xl p-8 sticky top-24 group transition-all duration-300 hover:border-mauve-500/30 hover:shadow-[0_0_30px_rgba(139,111,138,0.12)] w-full"
    >
      <div className="flex flex-col items-start">
        <RotateCcw size={28} className="text-mauve-400 mb-4" strokeWidth={2} />
        
        <h3 className="font-display font-bold text-white text-xl">
          Upgrade Direct
        </h3>
        
        <p className="font-body text-navy-300 text-sm mt-3 leading-relaxed">
          Folosește valoarea mașinii tale ca avans și fă upgrade la un vehicul verificat din stocul nostru.
        </p>

        <div className="h-px bg-navy-600/50 w-full my-5" />

        <div className="space-y-3 w-full">
          {BENEFITS.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <Check size={16} className="text-mauve-400 shrink-0" strokeWidth={2.5} />
              <span className="font-body text-sm text-navy-200 leading-tight">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        <Link 
          to="/masini"
          className="inline-block w-full bg-mauve-600 text-white text-center py-3.5 rounded-full mt-8 font-display font-semibold text-sm transition-all duration-300 hover:bg-mauve-500 shadow-lg shadow-mauve-600/10"
        >
          Vezi Stocul Disponibil
        </Link>
      </div>
    </motion.div>
  );
}
