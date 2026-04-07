import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer aria-label="Subsol" className="bg-navy-950 pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="max-w-[1280px] mx-auto px-[1.2rem] md:px-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex flex-col items-start gap-3">
              <span className="font-display font-bold tracking-tight text-xl text-white">Benefic Cars</span>
            </Link>
            <p className="font-body text-[0.85rem] text-navy-300 leading-relaxed max-w-[280px]">
              Târg auto de mașini rulate verificate. Finanțare, garanție și livrare în toată România.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-navy-800 flex items-center justify-center text-navy-300 hover:text-white hover:bg-navy-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-navy-800 flex items-center justify-center text-navy-300 hover:text-white hover:bg-navy-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 rounded-full bg-navy-800 flex items-center justify-center text-navy-300 hover:text-white hover:bg-navy-700 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Navigare */}
          <div className="flex flex-col gap-5">
            <h3 id="footer-naviga" className="font-display font-medium text-white text-xs tracking-[0.15em] uppercase">
              Navigare
            </h3>
            <nav aria-label="Linkuri navigare">
            <ul className="flex flex-col gap-3" aria-labelledby="footer-naviga">
              <li><Link to="/" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Acasă</Link></li>
              <li><Link to="/masini" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Mașini</Link></li>
              <li><Link to="/finantare" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Finanțare</Link></li>
              <li><Link to="/garantie" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Garanție</Link></li>
              <li><Link to="/contact" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Contact</Link></li>
            </ul>
            </nav>
          </div>

          {/* Column 3 - Servicii */}
          <div className="flex flex-col gap-5">
            <h3 id="footer-serv" className="font-display font-medium text-white text-xs tracking-[0.15em] uppercase">
              Servicii
            </h3>
            <nav aria-label="Linkuri servicii">
            <ul className="flex flex-col gap-3" aria-labelledby="footer-serv">
              <li><Link to="/masini-la-comanda" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Mașini la Comandă</Link></li>
              <li><Link to="/buyback" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Buy Back</Link></li>
              <li><Link to="/contact" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Livrare Acasă</Link></li>
              <li><Link to="/garantie" className="font-body text-[0.85rem] text-navy-300 hover:text-mauve-400 transition-colors">Garanție Extend</Link></li>
            </ul>
            </nav>
          </div>

          {/* Column 4 - Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="font-display font-medium text-white text-xs tracking-[0.15em] uppercase">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 font-body text-[0.85rem] text-navy-300">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="min-w-[14px] mt-[0.15rem] text-navy-400" />
                <span>Șos. Siliștea Ciolpani Nr. 178, Siliștea Snagovului, Ilfov</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="min-w-[14px] text-navy-400" />
                <a href="tel:+40721703507" className="hover:text-mauve-400 transition-colors">0721 703 507</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="min-w-[14px] text-navy-400" />
                <a href="mailto:contact@beneficcar.ro" className="hover:text-mauve-400 transition-colors">contact@beneficcar.ro</a>
              </li>
              <li className="mt-2 text-navy-400 flex items-start gap-2">
                <Clock size={14} className="min-w-[14px] mt-[0.15rem]" />
                <span>Luni - Sâmbătă: 09:00 - 18:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-navy-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-navy-300">
            &copy; 2026 BENEFIC DARIUS AUTOS S.R.L. | CUI 49835667. Toate drepturile rezervate.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link to="/termeni-si-conditii" className="font-body text-navy-300 hover:text-navy-200 transition-colors">Termeni și Condiții</Link>
            <span className="text-navy-300 font-bold text-[0.85rem]">&middot;</span>
            <Link to="/politica-confidentialitate" className="font-body text-navy-300 hover:text-navy-200 transition-colors">Confidențialitate</Link>
            <span className="text-navy-300 font-bold text-[0.85rem]">&middot;</span>
            <Link to="/politica-cookies" className="font-body text-navy-300 hover:text-navy-200 transition-colors">Cookies</Link>
            <span className="text-navy-300 font-bold text-[0.85rem]">&middot;</span>
            <Link to="/anpc" className="font-body text-navy-300 hover:text-navy-200 transition-colors">ANPC</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
