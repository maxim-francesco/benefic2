import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  isIntroStarted: boolean;
  scrollProgress: number;
}

export default function HeroContent({ isIntroStarted, scrollProgress }: Props) {
  const opacity = scrollProgress < 0.08 ? 1 : scrollProgress < 0.22 ? 1 - (scrollProgress - 0.08) / 0.14 : 0;
  const transform = `translateY(${(1 - opacity) * -30}px)`;

  const line1 = ['Mașina', 'Ta', 'Perfectă'];
  const line2 = ['La', 'Cel', 'Mai', 'Bun', 'Preț'];

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.8 }
    }
  };

  const wordVars = {
    hidden: { y: '105%', opacity: 0 },
    show: { y: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none px-5 pb-[3rem] md:pb-[5rem] flex flex-col items-center"
      style={{ opacity, transform }}
    >
      {isIntroStarted && (
        <motion.h1 
          variants={containerVars} initial="hidden" animate="show"
          className="font-display font-bold text-navy-800 text-[clamp(2rem,10vw,3rem)] md:text-[clamp(2.4rem,7vw,5rem)] text-center leading-[1.05] tracking-[-0.03em]"
          style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)' }}
        >
          <span className="block overflow-hidden">
            {line1.map((w, i) => (
              <span key={i} className="inline-block whitespace-pre">
                <motion.span variants={wordVars} className="inline-block">{w}</motion.span>
                {i < line1.length - 1 && ' '}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden mt-3">
            {line2.map((w, i) => (
              <span key={i} className="inline-block whitespace-pre">
                <motion.span variants={wordVars} className="inline-block">{w}</motion.span>
                {i < line2.length - 1 && ' '}
              </span>
            ))}
          </span>
        </motion.h1>
      )}

      {isIntroStarted && (
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 1.4 }}
          className="flex flex-col md:flex-row gap-[0.7rem] mt-[1.6rem] w-full max-w-[300px] md:max-w-none pointer-events-auto items-center justify-center"
        >
          <Link to="/masini" className="text-center font-display font-semibold text-[0.82rem] md:text-[0.85rem] bg-navy-800 text-white px-6 py-[0.85rem] md:px-8 md:py-3 w-full md:w-auto rounded-full tracking-[0.03em] shadow-[0_4px_20px_rgba(26,31,61,0.2)] hover:shadow-[0_6px_30px_rgba(26,31,61,0.3)] hover:scale-[1.04] hover:bg-navy-700 transition-all duration-300">
            Explorează Ofertele
          </Link>
        </motion.div>
      )}
    </div>
  );
}
