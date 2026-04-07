import { Building2 } from 'lucide-react';

const PARTNERS = [
  "TBI Bank",
  "Mogo",
  "Defend Insurance",
  "RAR Verificat",
  "ANPC"
];

const PartnerItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 group cursor-default whitespace-nowrap">
    <Building2 
      size={18} 
      className="text-navy-500 transition-colors duration-300" 
      strokeWidth={1.5}
    />
    <span className="font-body font-medium text-navy-300 text-sm transition-colors duration-300 tracking-wide">
      {text}
    </span>
  </div>
);

export default function TrustBadges() {
  // We duplicate the array 4 times to ensure it covers even the widest ultrawide screens
  // and maintains a seamless 50% shift loop.
  const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-navy-900 py-12 w-full overflow-hidden border-t border-navy-700/50">
      
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade masks pe margins */}
      <div 
        className="w-full mx-auto"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}
      >
        <div className="flex animate-marquee w-max items-center">
          {MARQUEE_ITEMS.map((partner, index) => (
            <div key={index} className="flex items-center gap-8 md:gap-12 flex-shrink-0 pr-8 md:pr-12">
              <PartnerItem text={partner} />
              <span className="text-navy-600 font-bold opacity-50 shrink-0">&middot;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
