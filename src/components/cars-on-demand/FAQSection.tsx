import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: "Cât costă serviciul de mașini la comandă?",
    a: "Serviciul de căutare și intermediere este gratuit. Plătești doar prețul mașinii convenit, transportul și taxele de înmatriculare. Prețul final este stabilit înainte de confirmarea comenzii — fără costuri ascunse."
  },
  {
    q: "Pot vedea mașina înainte de a o cumpăra?",
    a: "Îți trimitem un dosar complet: poze detaliate, raport de inspecție, istoric service, verificare kilometraj. Pentru mașini peste 20.000€, putem organiza o inspecție video live cu dealer-ul."
  },
  {
    q: "Ce se întâmplă dacă mașina are probleme după livrare?",
    a: "Fiecare mașină comandată vine cu garanție Defend Insurance (minim pachetul PLUS inclus). În plus, ai 14 zile de la livrare să semnalezi orice neconformitate."
  },
  {
    q: "Cât durează tot procesul?",
    a: "În medie 7-14 zile lucrătoare de la confirmarea comenzii: 2-3 zile căutare, 1-2 zile verificare, 3-5 zile transport, 1-2 zile înmatriculare și livrare."
  },
  {
    q: "Pot finanța o mașină la comandă?",
    a: "Da, absolut. Beneficiezi de aceleași opțiuni de finanțare ca la mașinile din stoc: TBI Bank (de la 7.9% DAE) sau Mogo (inclusiv pentru istoric negativ)."
  },
  {
    q: "Din ce țări aduceți mașini?",
    a: "Lucrăm cu dealeri verificați din Germania, Belgia, Olanda, Austria și Italia. La cerere, putem căuta și în alte piețe europene."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.2 });

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col items-center text-center"
      >
        <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-2">
          ÎNTREBĂRI FRECVENTE
        </div>
        <h2 className="font-display font-bold text-navy-800 text-3xl">
          Ai Întrebări?
        </h2>
      </motion.div>

      {/* ACCORDION */}
      <div className="mt-12 space-y-3" ref={ref}>
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-navy-50 rounded-xl overflow-hidden border border-navy-100 relative"
            >
              {/* HEADER (Clickable) */}
              <button 
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-center p-5 cursor-pointer hover:bg-navy-100/50 transition-colors duration-300 select-none text-left"
              >
                <h3 className="font-display font-medium text-navy-800 pr-4">
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-navy-400"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              {/* BODY (Animated) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5">
                      <p className="font-body text-sm text-navy-600 leading-relaxed border-t border-navy-100/50 pt-4 mt-1">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
