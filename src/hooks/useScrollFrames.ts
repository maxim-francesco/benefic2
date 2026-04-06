import { useState, useEffect, useRef, useCallback } from 'react';

export interface FrameConfig {
  totalFrames: number;
  framesPath: string;
  framePrefix: string;
  frameExt: string;
  introEndFrame: number;
  introDurationMs: number;
}

export function useScrollFrames({
  totalFrames,
  framesPath,
  framePrefix,
  frameExt,
  introEndFrame,
  introDurationMs,
}: FrameConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const phaseRef = useRef<'loading' | 'intro' | 'scroll'>('loading');
  const introStartTimeRef = useRef(0);

  const ease = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    idx = Math.max(0, Math.min(totalFrames - 1, Math.round(idx)));
    const img = imagesRef.current[idx];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, [totalFrames]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(currentFrameRef.current);
  }, [draw]);

  useEffect(() => {
    let loadedCount = 0;
    const urls = Array.from({ length: totalFrames }, (_, i) => 
      `${framesPath}/${framePrefix}${String(i + 1).padStart(3, '0')}${frameExt}`
    );

    urls.forEach((url, i) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        imagesRef.current[i] = img;
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
        
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      img.src = url;
    });
  }, [totalFrames, framesPath, framePrefix, frameExt]);

  useEffect(() => {
    if (!isLoaded || phaseRef.current !== 'loading') return;
    phaseRef.current = 'intro';
    introStartTimeRef.current = performance.now();
    
    handleResize();
    window.addEventListener('resize', handleResize);
    document.body.style.overflow = 'hidden';

    let animFrame: number;
    const LERP = 0.18;

    const tick = (now: number) => {
      if (phaseRef.current === 'intro') {
        const t = Math.min(1, (now - introStartTimeRef.current) / introDurationMs);
        currentFrameRef.current = ease(t) * introEndFrame;
        draw(currentFrameRef.current);

        if (t >= 1) {
          phaseRef.current = 'scroll';
          document.body.style.overflow = '';
          targetFrameRef.current = introEndFrame;
          currentFrameRef.current = introEndFrame;
          setIsIntroComplete(true);
        }
      } else if (phaseRef.current === 'scroll') {
        if (Math.abs(targetFrameRef.current - currentFrameRef.current) > 0.08) {
          currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * LERP;
          draw(currentFrameRef.current);
        }
      }
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isLoaded, draw, handleResize, introDurationMs, introEndFrame]);

  useEffect(() => {
    if (!isIntroComplete) return;

    const handleScroll = () => {
      const parent = canvasRef.current?.parentElement?.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const scrollable = parent.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProgress(p);
      targetFrameRef.current = introEndFrame + p * (totalFrames - 1 - introEndFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isIntroComplete, introEndFrame, totalFrames]);

  return { canvasRef, loadingProgress, isLoaded, isIntroComplete, scrollProgress };
}
