import type { ElementType } from 'react';
import { motion } from 'framer-motion';

export interface TimelineService {
  icon: ElementType;
  title: string;
  description: string;
}

export function TimelineItem({ item, index }: { item: TimelineService; index: number }) {
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  // We detect mobile directly to ensure animations load correctly
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const fromX = isMobile ? 30 : (isEven ? -40 : 40);

  return (
    <div className="relative w-full mb-12 md:mb-20 flex items-start justify-center">
      
      {/* Progress Dot on line */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, borderColor: '#d946ef', backgroundColor: 'rgba(217, 70, 239, 0.2)' }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-navy-800 border-2 border-navy-600 rounded-full z-20 top-[12px]"
      />

      <div className={`w-full flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between`}>
         
         {/* Content Box */}
         <motion.div
           initial={{ opacity: 0, x: fromX }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-150px" }}
           transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
           className={`relative w-full pl-16 md:pl-0 md:w-[calc(50%-24px)] flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-start text-left`}
         >
           
           {/* Connector Desktop */}
           <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true, margin: "-150px" }}
             transition={{ duration: 0.4, delay: 0.4 }}
             className={`hidden md:block absolute top-[19px] h-px bg-navy-600/50 w-6 ${isEven ? '-right-6 origin-left' : '-left-6 origin-right'}`}
           />
           
           {/* Connector Mobile */}
           <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true, margin: "-150px" }}
             transition={{ duration: 0.4, delay: 0.4 }}
             className="md:hidden absolute top-[19px] left-8 h-px bg-navy-600/50 w-6 origin-left"
           />

           <div className={`w-10 h-10 bg-navy-700/50 rounded-lg flex items-center justify-center text-mauve-400 mb-4 border border-navy-600/30 ${isEven ? 'md:mx-0' : 'md:mx-0'}`}>
             <Icon size={20} className="relative z-10" />
           </div>
           
           <h3 className="font-display font-medium text-white text-[1.1rem]">
             {item.title}
           </h3>
           <p className="font-body text-navy-300 text-[0.85rem] leading-relaxed mt-2 max-w-[280px]">
             {item.description}
           </p>

         </motion.div>

         {/* Empty Spacer Half on Desktop */}
         <div className="hidden md:block w-[calc(50%-24px)]" />

      </div>
    </div>
  );
}
