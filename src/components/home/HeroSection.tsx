import { useScrollFrames } from '../../hooks/useScrollFrames';
import HeroLoader from './HeroLoader';
import HeroCanvas from './HeroCanvas';
import HeroContent from './HeroContent';


export default function HeroSection() {
  const { 
    canvasRef, loadingProgress, isLoaded, scrollProgress 
  } = useScrollFrames({
    totalFrames: 192,
    framesPath: '/frames',
    framePrefix: 'f_',
    frameExt: '.jpg',
    introEndFrame: 55,
    introDurationMs: 2000,
  });

  return (
    <>
      <HeroLoader progress={loadingProgress} isLoaded={isLoaded} />
      
      <section className="relative h-[400vh]">
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden bg-white">
          <HeroCanvas canvasRef={canvasRef} scrollProgress={scrollProgress} />
          <HeroContent isIntroStarted={isLoaded} scrollProgress={scrollProgress} />
        </div>
      </section>
    </>
  );
}
