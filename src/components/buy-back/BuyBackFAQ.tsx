import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: "Ce mașini acceptați în programul Buy Back?",
    a: "Acceptăm vehicule de orice marcă, cu vârsta de până la 15 ani și maximum 300.000 km. Mașina trebuie să fie pe numele tău, fără sarcini sau litigii în curs."
  },
  {
    q: "Cum se calculează prețul oferit?",
    a: "Evaluăm pe baza mai multor factori: cotația pieței actuale, marca, modelul, anul fabricației, kilometrajul, starea generală (caroserie, interior, mecanic) și istoricul de service. Folosim baze de date de piață pentru o ofertă corectă."
  },
  {
    q: "Trebuie să cumpăr o mașină de la voi ca să vând?",
    a: "Nu, nu este obligatoriu. Poți vinde mașina independent și primești banii cash. Dar dacă alegi să faci upgrade la un vehicul din stocul nostru, valoarea mașinii tale devine avans direct — fără bătăi de cap."
  },
  {
    q: "Ce documente am nevoie?",
    a: "Carte de identitate, certificat de înmatriculare (talon), cartea mașinii (CIV), ultimul ITP valabil, și asigurarea RCA în vigoare. Dacă mașina are leasing finalizat, actul de finalizare."
  },
  {
    q: "Cât durează până primesc banii?",
    a: "După acceptarea ofertei, tranzacția se finalizează în maximum 48 de ore. Transferul bancar se face în aceeași zi sau următoarea zi lucrătoare."
  },
  {
    q: "Mașina are daune/probleme — o acceptați?",
    a: "Da, evaluăm și mașini cu daune minore sau probleme mecanice. Prețul oferit va reflecta costul estimat al reparațiilor. Transparența este prioritatea noastră."
  }
];

export default function BuyBackFAQ() {
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
          Ce Trebuie Să Știi
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
              {/* HEADER */}
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

              {/* BODY */}
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
