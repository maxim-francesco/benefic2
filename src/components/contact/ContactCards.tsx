import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';

export default function ContactCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full"
    >
      {/* 1. Phone */}
      <motion.div variants={cardVariants} className="bg-navy-50 border border-navy-100 rounded-2xl p-8 text-center flex flex-col items-center hover:border-mauve-300 hover:shadow-md hover:-translate-y-1 transition duration-300 group">
        <div className="w-14 h-14 bg-mauve-100 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Phone size={24} className="text-mauve-600" />
        </div>
        <h3 className="font-display font-medium text-navy-800 text-lg mt-5">
          Sună-ne
        </h3>
        <a href="tel:+40721703507" className="font-display font-semibold text-navy-800 text-xl mt-2 outline-none focus:text-mauve-600 focus:ring-2 focus:ring-mauve-500 rounded transition-colors">
          0721 703 507
        </a>
        <p className="font-body text-navy-500 text-sm mt-1">
          Luni - Sâmbătă, 09:00 - 18:00
        </p>
      </motion.div>

      {/* 2. Mail */}
      <motion.div variants={cardVariants} className="bg-navy-50 border border-navy-100 rounded-2xl p-8 text-center flex flex-col items-center hover:border-mauve-300 hover:shadow-md hover:-translate-y-1 transition duration-300 group">
        <div className="w-14 h-14 bg-mauve-100 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Mail size={24} className="text-mauve-600" />
        </div>
        <h3 className="font-display font-medium text-navy-800 text-lg mt-5">
          Scrie-ne
        </h3>
        <a href="mailto:contact@beneficcar.ro" className="font-display font-semibold text-navy-800 text-xl mt-2 outline-none focus:text-mauve-600 focus:ring-2 focus:ring-mauve-500 rounded transition-colors">
          contact@beneficcar.ro
        </a>
        <p className="font-body text-navy-500 text-sm mt-1">
          Răspundem în maxim 24h
        </p>
      </motion.div>

      {/* 3. Location */}
      <motion.div variants={cardVariants} className="bg-navy-50 border border-navy-100 rounded-2xl p-8 text-center flex flex-col items-center hover:border-mauve-300 hover:shadow-md hover:-translate-y-1 transition duration-300 group">
        <div className="w-14 h-14 bg-mauve-100 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <MapPin size={24} className="text-mauve-600" />
        </div>
        <h3 className="font-display font-medium text-navy-800 text-lg mt-5">
          Vizitează-ne
        </h3>
        <p className="font-display font-semibold text-navy-800 text-lg mt-2 cursor-pointer transition-colors hover:text-mauve-600">
          Șos. Siliștea Ciolpani Nr. 178
        </p>
        <p className="font-body text-navy-500 text-sm mt-1">
          Siliștea Snagovului, Ilfov
        </p>
        <p className="font-body text-navy-400 text-xs mt-2">
          Program: Luni - Sâmbătă, 09:00 - 18:00
        </p>
      </motion.div>

    </motion.div>
  );
}
