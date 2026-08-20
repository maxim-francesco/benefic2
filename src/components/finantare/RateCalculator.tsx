import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';

function CustomSlider({ min, max, step, value, onChange }: { min: number, max: number, step: number, value: number, onChange: (v: number) => void }) {
  // Evităm împărțirea la zero în cazul extrem
  const percent = max > min ? Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)) : 0;
  
  return (
    <div className="relative w-full h-6 flex items-center">
      {/* Background track */}
      <div className="absolute w-full h-2 bg-navy-100 rounded-full pointer-events-none" />
      {/* Fill roșu mauve */}
      <motion.div 
        className="absolute h-2 bg-mauve-600 rounded-full pointer-events-none" 
        animate={{ width: `${percent}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {/* Thumb-ul custom */}
      <motion.div 
        className="absolute w-5 h-5 bg-white border-2 border-mauve-600 rounded-full shadow-md pointer-events-none flex items-center justify-center z-10"
        animate={{ left: `calc(${percent}% - 10px)` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
      </motion.div>
      {/* Hiden native input pentru acuratețea interacțiunii (touch, drag, keyboard) */}
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-full opacity-0 cursor-pointer m-0 p-0 z-20"
      />
    </div>
  )
}

export default function RateCalculator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%', amount: 0.2 });

  const [pret, setPret] = useState(3000); // Pornim de la min pentru spring
  const [avans, setAvans] = useState(0); 
  const [luni, setLuni] = useState(6);

  // Jump animation pe mount cand sectiunea e vizibila
  useEffect(() => {
    if (isInView) {
      animate(3000, 15000, { duration: 1.5, ease: "easeOut", onUpdate: v => setPret(Math.round(v/500)*500) });
      animate(0, 3000, { duration: 1.5, ease: "easeOut", onUpdate: v => setAvans(Math.round(v/500)*500) });
      animate(6, 48, { duration: 1.5, ease: "easeOut", onUpdate: v => setLuni(Math.round(v/6)*6) });
    }
  }, [isInView]);

  // Corecție dinamică avans
  useEffect(() => {
    if (pret > 0 && avans > pret / 2) {
      setAvans(Math.floor(pret / 2));
    }
  }, [pret, avans]);

  const sumaFinantata = Math.max(0, pret - avans);
  const DAE = 7.9;
  const rataDobanda = (DAE / 100) / 12; 
  const rata = sumaFinantata > 0 
    ? (sumaFinantata * (rataDobanda * Math.pow(1 + rataDobanda, luni)) / (Math.pow(1 + rataDobanda, luni) - 1)) 
    : 0;
  const totalPlata = rata * luni;

  const fmt = (num: number, decimals: number = 0) => {
    return new Intl.NumberFormat('ro-RO', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    }).format(num);
  };

  const leftVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25, delay: 0.3 } }
  };

  const rataKey = Math.round(rata);

  return (
    <section id="calculator" className="relative py-20 px-5 md:py-28 md:px-8 bg-gradient-to-b from-white via-mauve-50/30 to-white overflow-hidden">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        
        {/* HEADER */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
           className="flex flex-col text-center items-center mb-12"
        >
          <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-2">
            CALCULATOR
          </div>
          <h2 className="font-display font-bold text-navy-800 text-3xl">
            Calculează-ți Rata Lunară
          </h2>
          <p className="font-body text-navy-500 mt-3 max-w-md leading-relaxed">
            Simulare orientativă cu DAE 7.9%. Suma exactă poate varia.
          </p>
        </motion.div>

        {/* CALCULATOR LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* COLOANA STÂNGA - INPUTS */}
          <motion.div 
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col space-y-10"
          >
            {/* Input Pret */}
            <div className="flex flex-col">
              <div className="flex justify-between items-end mb-3">
                <label className="font-display font-medium text-navy-700 text-sm">Prețul Mașinii (€)</label>
                <div className="font-display font-semibold text-navy-800 text-lg">{fmt(pret)} €</div>
              </div>
              <CustomSlider min={3000} max={60000} step={500} value={pret} onChange={setPret} />
            </div>

            {/* Input Avans */}
            <div className="flex flex-col">
              <div className="flex justify-between items-end mb-3">
                <label className="font-display font-medium text-navy-700 text-sm">Avans (€)</label>
                <div className="font-display font-semibold text-navy-800 text-lg">{fmt(avans)} €</div>
              </div>
              <CustomSlider min={0} max={Math.floor(pret / 2)} step={500} value={avans} onChange={setAvans} />
              <div className="text-[0.75rem] text-navy-400 mt-2">
                Sumă finanțată: {fmt(sumaFinantata)} €
              </div>
            </div>

            {/* Input Luni */}
            <div className="flex flex-col">
              <div className="flex justify-between items-end mb-3">
                <label className="font-display font-medium text-navy-700 text-sm">Perioada (luni)</label>
                <div className="font-display font-semibold text-navy-800 text-lg">{luni} luni ({fmt(luni/12, 1)} ani)</div>
              </div>
              <CustomSlider min={6} max={84} step={6} value={luni} onChange={setLuni} />
            </div>
          </motion.div>

          {/* COLOANA DREAPTA - REZULTAT */}
          <motion.div 
            variants={rightVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-navy-800 rounded-2xl p-8 sticky top-24 w-full"
          >
            <div className="font-body text-navy-300 text-sm mb-2">Rata ta lunară estimată</div>
            
            <div className="font-display font-bold text-white text-[clamp(2.5rem,5vw,4rem)] leading-none flex items-baseline gap-2 overflow-hidden h-[clamp(3.5rem,6vw,5rem)]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={rataKey}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {fmt(rata, 2)}
                </motion.span>
              </AnimatePresence>
              <span className="text-xl md:text-2xl font-semibold text-navy-300">€/lună</span>
            </div>

            <div className="h-px w-full bg-navy-700 my-6" />

            <div className="flex flex-col space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-navy-300">Preț mașină</span>
                <span className="text-white">{fmt(pret)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-300">Avans</span>
                <span className="text-white">{fmt(avans)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-300">Sumă finanțată</span>
                <span className="text-white">{fmt(sumaFinantata)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-300">Perioadă</span>
                <span className="text-white">{luni} luni</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-300">DAE</span>
                <span className="text-white">7.9%</span>
              </div>
              
              <div className="h-px w-full bg-navy-700 my-1" />
              
              <div className="flex justify-between font-semibold text-[1.05rem]">
                <span className="text-white">Total de plată</span>
                <span className="text-white">{fmt(totalPlata)} €</span>
              </div>
            </div>

            <a 
              href="#form-finantare"
              className="block text-center mt-6 w-full py-3.5 bg-mauve-600 text-white rounded-full font-display font-semibold transition-colors hover:bg-mauve-500 tracking-wide min-h-[44px] flex items-center justify-center"
            >
              Solicită Finanțare
            </a>

            <div className="text-[0.75rem] text-navy-400 mt-4 leading-relaxed">
              * Calculul este orientativ. Rata finală depinde de analiza dosarului. DAE 7.9%.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
