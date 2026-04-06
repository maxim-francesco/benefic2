import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, ExternalLink, Copy, Check } from 'lucide-react';

export default function ContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.1 });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Str. Exemplu Nr. 1, București, România");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
      className="w-full max-w-lg py-16 px-5 md:py-20 md:px-12 mx-auto md:mr-auto md:ml-0 flex flex-col"
    >
      {/* MAP PLACEHOLDER */}
      <div className="bg-navy-100 rounded-2xl h-[300px] w-full flex flex-col items-center justify-center overflow-hidden border border-navy-200">
        <MapPin size={48} className="text-navy-300 mb-2" strokeWidth={1.5} />
        <span className="text-navy-400 text-sm font-body">Hartă Google Maps</span>
        {/* Înlocuiește cu iframe Google Maps embed:
          <iframe 
            src="https://www.google.com/maps/embed?..." 
            width="100%" height="100%" 
            style={{ border: 0 }} allowFullScreen loading="lazy" 
          />
        */}
      </div>

      {/* QUICK DETALII */}
      <div className="mt-8 space-y-4">
        
        {/* Adresa */}
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-mauve-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-medium text-navy-800 text-sm">Adresă</span>
            <span className="font-body text-navy-500 text-sm">Str. Exemplu Nr. 1, Oraș, România</span>
          </div>
        </div>

        {/* Program */}
        <div className="flex items-start gap-3">
          <Clock size={18} className="text-mauve-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-medium text-navy-800 text-sm">Program</span>
            <span className="font-body text-navy-500 text-sm">Luni - Sâmbătă: 09:00 - 18:00<br/>Duminică: Închis</span>
          </div>
        </div>

        {/* Telefon */}
        <div className="flex items-start gap-3">
          <Phone size={18} className="text-mauve-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-medium text-navy-800 text-sm">Telefon</span>
            <span className="font-body text-navy-500 text-sm">+40 700 000 000</span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail size={18} className="text-mauve-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-medium text-navy-800 text-sm">Email</span>
            <span className="font-body text-navy-500 text-sm">contact@beneficcars.ro</span>
          </div>
        </div>

      </div>

      {/* QUICK LINKS */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a 
          href="https://maps.google.com" 
          target="_blank" rel="noopener noreferrer"
          className="text-sm text-mauve-600 hover:text-mauve-500 transition-colors font-medium flex items-center gap-1.5"
        >
          <ExternalLink size={14} />
          Deschide în Google Maps
        </a>
        <div className="w-1 h-1 bg-navy-200 rounded-full hidden sm:block" />
        <button 
          onClick={handleCopy}
          className="text-sm text-mauve-600 hover:text-mauve-500 transition-colors font-medium flex items-center gap-1.5"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Adresă Copiată!" : "Copiază adresa"}
        </button>
      </div>

    </motion.div>
  );
}
