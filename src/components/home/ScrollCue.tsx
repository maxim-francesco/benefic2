interface Props {
  isIntroComplete: boolean;
  scrollProgress: number;
}

export default function ScrollCue({ isIntroComplete, scrollProgress }: Props) {
  const show = isIntroComplete && scrollProgress < 0.03;

  return (
    <div 
      className={`absolute bottom-[1rem] md:bottom-[1.5rem] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-[0.4rem] transition-opacity duration-800 pointer-events-none ${show ? 'opacity-100' : 'opacity-0'}`}
    >
      <p className="text-[#8d94c9] text-[0.58rem] font-medium tracking-[0.35em] uppercase">
        Scroll
      </p>
      <div className="w-[2px] h-[24px] rounded-sm bg-gradient-to-b from-[#8b6f8a] to-transparent animate-pipDrop" />
    </div>
  );
}
