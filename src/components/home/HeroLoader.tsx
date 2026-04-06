import { motion, AnimatePresence } from 'framer-motion';

export default function HeroLoader({ progress, isLoaded }: { progress: number, isLoaded: boolean }) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.5 }}
          className="fixed inset-0 z-[9999] bg-navy-800 flex flex-col items-center justify-center"
        >
          <div className="font-display font-semibold text-[0.85rem] text-white/40 tracking-[0.35em] uppercase mb-10">
            Benefic Cars
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white/[0.08] border-t-mauve-600/60 animate-spin" />
          <div className="mt-6 text-[0.65rem] text-white/25 tracking-[0.2em] tabular-nums">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
