import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Pot veni fără programare?",
    answer: "Da, ne poți vizita oricând în programul de lucru (Luni - Sâmbătă, 09:00 - 18:00). Totuși, pentru o experiență mai bună, îți recomandăm să ne suni înainte ca să avem mașina pregătită pentru test drive."
  },
  {
    question: "Faceți test drive?",
    answer: "Absolut. Orice mașină din stoc poate fi testată la sediul nostru. Ai nevoie doar de permis de conducere valid și un act de identitate."
  },
  {
    question: "Pot veni cu un mecanic propriu la inspecție?",
    answer: "Cu siguranță, încurajăm asta. Transparența este una din valorile noastre și primim cu plăcere orice inspecție independentă."
  },
  {
    question: "Pot rezerva o mașină online?",
    answer: "Da, poți rezerva orice mașină din stoc contactându-ne telefonic sau prin formularul de pe site. Rezervarea se confirmă cu un avans."
  }
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="font-display font-bold text-navy-800 text-2xl">
          Întrebări Rapide
        </h2>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden border border-navy-100 shadow-sm"
          >
            <button 
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 cursor-pointer hover:bg-navy-50/50 transition-colors text-left"
            >
              <span className="font-display font-medium text-navy-800 pr-8">
                {faq.question}
              </span>
              <ChevronDown 
                size={20} 
                className={`text-navy-400 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`} 
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="p-5 pt-0">
                    <div className="w-full h-px bg-navy-100 mb-4" />
                    <p className="font-body text-navy-500 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
