import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PackageProps {
  id: string;
  name: string;
  shortDesc: string;
  badge?: 'PLUS' | 'DELUXE';
  isComfort?: boolean;
  specs: string[];
  btnLabel: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const, stiffness: 200, damping: 20 } }
};

export default function PackageCard({ pkg }: { pkg: PackageProps }) {
  const isComfort = pkg.isComfort;
  const isPlus = pkg.badge === 'PLUS';
  const isDeluxe = pkg.badge === 'DELUXE';

  const btnClass = isComfort 
    ? "bg-mauve-600 text-white hover:bg-mauve-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] border border-mauve-600" 
    : isPlus
    ? "bg-navy-50 text-navy-800 border border-navy-200 hover:bg-navy-100"
    : "bg-navy-800 text-white hover:bg-navy-700 border border-navy-800";

  return (
    <motion.div 
      variants={itemVariants}
      className={`relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-800/5 ${isComfort ? 'border-2 border-mauve-600 ring-4 ring-mauve-100' : 'border border-navy-100'}`}
    >
      {isComfort && (
        <div className="absolute top-0 right-0 bg-mauve-600 text-white text-[0.65rem] px-3 py-1 font-semibold rounded-bl-lg tracking-wider z-10">
          RECOMANDAT
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-4 relative z-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display font-bold text-navy-800 text-xl">{pkg.name}</h3>
          {isPlus && <span className="bg-mauve-600 text-white text-[0.65rem] font-semibold px-2 py-0.5 rounded-full">INCLUS ÎN PREȚ</span>}
          {isDeluxe && <span className="bg-navy-800 text-white text-[0.65rem] font-semibold px-2 py-0.5 rounded-full">PREMIUM</span>}
        </div>
        <p className="font-body text-navy-500 text-sm mt-2 leading-relaxed h-[42px]">{pkg.shortDesc}</p>
      </div>

      {/* Body */}
      <div className="px-6 flex-1 flex flex-col">
        <div className="h-px bg-navy-100 w-full" />
        <ul className="py-5 space-y-3.5">
          {pkg.specs.map((spec, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-[2px]"><Check size={14} className="text-mauve-600 shrink-0" strokeWidth={3} /></div>
              <span className="font-body text-[0.85rem] text-navy-600 leading-snug">{spec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-6 pt-4 mt-auto">
        <Link 
          to="/contact"
          className={`block w-full text-center rounded-full py-3.5 font-display font-semibold text-[0.85rem] transition-all duration-300 hover:scale-[1.02] ${btnClass}`}
        >
          {pkg.btnLabel}
        </Link>
      </div>
    </motion.div>
  );
}
