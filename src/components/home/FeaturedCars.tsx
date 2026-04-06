import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import { CarCard } from '../shared/CarCard';
import type { CarProps } from '../shared/CarCard';

const MOCK_DATA: CarProps[] = [
  { id: 1, brand: "BMW", model: "Seria 3 320d", year: 2021, km: 45000, fuel: "Diesel", price: 25900, monthly: 299, badge: "NOU" },
  { id: 2, brand: "Mercedes-Benz", model: "C200 AMG Line", year: 2020, km: 62000, fuel: "Benzină", price: 28500, monthly: 329, badge: "FINANȚARE" },
  { id: 3, brand: "Audi", model: "A4 Avant 2.0 TDI", year: 2021, km: 38000, fuel: "Diesel", price: 27200, monthly: 309 },
  { id: 4, brand: "Volkswagen", model: "Golf 8 1.5 TSI", year: 2022, km: 28000, fuel: "Benzină", price: 22900, monthly: 259 },
  { id: 5, brand: "Volvo", model: "XC60 D4 AWD", year: 2020, km: 55000, fuel: "Diesel", price: 31900, monthly: 369, badge: "NOU" },
  { id: 6, brand: "Skoda", model: "Octavia Combi 2.0 TDI", year: 2022, km: 32000, fuel: "Diesel", price: 21500, monthly: 245 }
];

function ParallaxCard({ car, index, scrollYProgress }: { car: CarProps; index: number; scrollYProgress: MotionValue<number> }) {
  const speed = 1 + index * 0.03;
  // Efectul ușor de plutire a cardurilor individuale
  const y = useTransform(scrollYProgress, [0, 1], [0, -80 * speed]);

  return (
    <motion.div 
      style={{ y }}
      className="w-[85vw] md:w-[350px] lg:w-[400px] flex-shrink-0"
    >
      <div className="relative h-full p-[1px]">
        <CarCard car={car} index={index} />
      </div>
    </motion.div>
  );
}

export default function FeaturedCars() {
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      setIsMobile(window.innerWidth < 768);
      
      requestAnimationFrame(() => {
        if (trackRef.current) {
          setTrackWidth(trackRef.current.scrollWidth);
          setViewportWidth(window.innerWidth);
        }
      });
    };
    
    updateMeasurements();
    setTimeout(updateMeasurements, 500); 
    
    window.addEventListener('resize', updateMeasurements);
    return () => window.removeEventListener('resize', updateMeasurements);
  }, []);

  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-50px' });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  // Calculul exact de scroll x raportat progresiei z/y
  const x = useTransform(scrollYProgress, (v) => {
    if (!trackWidth || !viewportWidth) return 0;
    const paddingBuffer = isMobile ? 32 : 80;
    const scrollableDistance = Math.max(0, trackWidth - viewportWidth + paddingBuffer);
    return v * -(scrollableDistance);
  });

  // Mobile primeste scroll headroom variabil pentru o experienta fluida (viteza mai mare in scroll pe telefon)
  const wrapperHeight = isMobile 
    ? `calc(${MOCK_DATA.length * 50}vh + 100vh)` 
    : `calc(${MOCK_DATA.length * 40}vh + 100vh)`;

  return (
    <section 
      ref={wrapperRef}
      className="bg-white relative w-full pt-[60px]"
      style={{ height: wrapperHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        <div className="mb-8 relative z-20">
          <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 max-w-[1280px] mx-auto px-[1.2rem] md:px-12 w-full">
            <div>
              <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-[0.6rem]">
                STOC
              </div>
              <h2 className="font-display font-semibold text-navy-800 text-3xl md:text-[2.5rem] tracking-tight relative inline-block">
                Mașini în Stoc
                {/* Linia decorativa minimalista */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-2 left-0 h-0.5 w-16 bg-mauve-600 origin-left"
                />
              </h2>
              <div className="mt-5 text-navy-500 font-body text-[0.95rem]">
                Cele mai recente adăugiri
              </div>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-8">
              <a href="/masini" className="group flex items-center gap-2 font-display font-medium text-navy-500 hover:text-navy-800 transition-colors">
                <span className="relative pb-0.5">
                  Vezi Toate
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-navy-800 group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <motion.div 
          ref={trackRef}
          className="flex flex-row gap-4 md:gap-8 flex-nowrap px-[1.2rem] md:px-12 pb-12 w-max items-start pt-[60px] -mt-[60px]"
          style={{ x }}
        >
          {MOCK_DATA.map((car, index) => (
            <ParallaxCard key={car.id} car={car} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
