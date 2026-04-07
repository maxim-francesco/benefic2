import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { Copy } from 'lucide-react';
import { Check } from 'lucide-react';

export default function ContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%', amount: 0.1 });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Șos. Siliștea Ciolpani Nr. 178, Siliștea Snagovului, Ilfov");
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
      {/* GOOGLE MAPS EMBED */}
      <div className="bg-navy-100 rounded-2xl h-[300px] md:h-[350px] w-full overflow-hidden border border-navy-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2833.7728621659253!2d26.170569875718527!3d44.74465058116047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2237c94b95f69%3A0xc3a80757d20f3b72!2s%C8%98oseaua%20Sili%C8%99tea%20-%20Ciolpani%20178%2C%20077117%20Sili%C8%99tea%20Snagovului!5e0!3m2!1sen!2sro!4v1775559925946!5m2!1sen!2sro" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* QUICK DETALII */}
      <div className="mt-8 space-y-4">
        
        {/* Adresa */}
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-mauve-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-medium text-navy-800 text-sm">Adresă</span>
            <span className="font-body text-navy-500 text-sm">Șos. Siliștea Ciolpani Nr. 178, Siliștea Snagovului, Ilfov</span>
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
            <span className="font-body text-navy-500 text-sm">0721 703 507</span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail size={18} className="text-mauve-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-display font-medium text-navy-800 text-sm">Email</span>
            <span className="font-body text-navy-500 text-sm">contact@beneficcar.ro</span>
          </div>
        </div>

      </div>

      {/* QUICK LINKS */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a 
          href="https://maps.google.com/?q=Sos+Silistea+Ciolpani+178+Silistea+Snagovului+Ilfov" 
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
