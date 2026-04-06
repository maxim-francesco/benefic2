import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[90] bg-navy-800 flex flex-col items-center justify-center p-6 md:hidden"
        >
          <div className="flex flex-col items-center gap-8 w-full">
            <Link to="/" onClick={onClose} className="font-display text-[1.5rem] font-medium text-white tracking-[0.1em] uppercase">Acasă</Link>
            <Link to="/masini" onClick={onClose} className="font-display text-[1.5rem] font-medium text-white tracking-[0.1em] uppercase">Mașini</Link>
            <Link to="/finantare" onClick={onClose} className="font-display text-[1.5rem] font-medium text-white tracking-[0.1em] uppercase">Finanțare</Link>
            <Link to="/garantie" onClick={onClose} className="font-display text-[1.5rem] font-medium text-white tracking-[0.1em] uppercase">Garanție</Link>
            <Link to="/masini-la-comanda" onClick={onClose} className="font-display text-[1.5rem] font-medium text-white tracking-[0.1em] uppercase">Comandă Mașină</Link>
            <Link to="/contact" onClick={onClose} className="font-display text-[1.5rem] font-medium text-white tracking-[0.1em] uppercase">Contact</Link>
            
            <a href="tel:+40700000000" onClick={onClose} className="mt-8 font-display text-[0.8rem] font-semibold text-navy-800 bg-white px-8 py-[0.8rem] rounded-full tracking-[0.04em] transition-transform active:scale-95 flex items-center gap-1.5">
              <Phone size={14} />
              Sună-ne
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
