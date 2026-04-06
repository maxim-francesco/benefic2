import type { RefObject } from 'react';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  scrollProgress: number;
}

export default function HeroCanvas({ canvasRef, scrollProgress }: Props) {
  // Fade out text + gradient based on precise scroll thresholds from reference
  const opacity = scrollProgress < 0.08 ? 1 : scrollProgress < 0.22 ? 1 - (scrollProgress - 0.08) / 0.14 : 0;

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" />
      
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[35vh] z-[3] pointer-events-none bg-gradient-to-b from-white/85 via-white/40 to-transparent" />
      
      {/* Bottom Gradient (fades automatically on scroll) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[65vh] md:h-[50vh] z-[3] pointer-events-none bg-gradient-to-t from-white/92 via-white/50 to-transparent"
        style={{ opacity }}
      />
    </>
  );
}
