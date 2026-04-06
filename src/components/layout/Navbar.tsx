import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Phone } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path ? 'opacity-100' : 'opacity-50';

  const isDarkHero = ['/finantare', '/garantie', '/masini-la-comanda', '/buyback', '/contact'].includes(pathname);
  const linkColor = scrolled ? 'text-navy-800' : (isDarkHero ? 'text-white' : 'text-navy-800');
  const spanBg = isOpen ? 'bg-white' : (scrolled ? 'bg-navy-800' : (isDarkHero ? 'bg-white' : 'bg-navy-800'));

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500 md:px-12 px-[1.2rem] h-[56px] md:h-[64px] ${scrolled && !isOpen ? 'bg-white/90 backdrop-blur-[20px] shadow-[0_1px_0_rgba(26,31,61,0.06)]' : 'bg-transparent'}`}
      >
        <Link to="/" onClick={() => setIsOpen(false)} className={`z-[101] flex items-center`}>
          <img src="/logo.png" alt="Benefic Cars" className="h-8 md:h-10 object-contain" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-[2.2rem]">
          <li><Link to="/" className={`font-body text-[0.8rem] font-medium transition-opacity ${linkColor} ${isActive('/')}`}>Acasă</Link></li>
          <li><Link to="/masini" className={`font-body text-[0.8rem] font-medium transition-opacity ${linkColor} ${isActive('/masini')}`}>Mașini</Link></li>
          <li><Link to="/finantare" className={`font-body text-[0.8rem] font-medium transition-opacity ${linkColor} ${isActive('/finantare')}`}>Finanțare</Link></li>
          <li><Link to="/garantie" className={`font-body text-[0.8rem] font-medium transition-opacity ${linkColor} ${isActive('/garantie')}`}>Garanție</Link></li>
          <li className="relative group py-4">
            <span className={`font-body text-[0.8rem] font-medium transition-opacity cursor-pointer flex items-center gap-1 ${linkColor} ${pathname.includes('masini-la-comanda') || pathname.includes('buyback') ? 'opacity-100' : 'opacity-50'}`}>
              Servicii
              <ChevronDown size={12} className="transition-transform duration-300 group-hover:rotate-180" />
            </span>
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-48 bg-white shadow-lg rounded-xl flex flex-col p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-navy-100/50">
              <Link to="/masini-la-comanda" className="px-4 py-2 text-[0.8rem] font-body text-navy-800 hover:bg-navy-50 rounded-lg transition-colors">Mașini la Comandă</Link>
              <Link to="/buyback" className="px-4 py-2 text-[0.8rem] font-body text-navy-800 hover:bg-navy-50 rounded-lg transition-colors">Buy Back</Link>
            </div>
          </li>
          <li><Link to="/contact" className={`font-body text-[0.8rem] font-medium transition-opacity ${linkColor} ${isActive('/contact')}`}>Contact</Link></li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block z-[101]">
          <a href="tel:+40700000000" className={`font-display text-[0.75rem] font-semibold px-[1.4rem] py-[0.5rem] rounded-full tracking-[0.04em] transition-all duration-300 hover:scale-[1.03] inline-flex items-center gap-1.5 ${scrolled ? 'bg-navy-800 text-white hover:bg-navy-700' : (isDarkHero ? 'bg-white text-navy-900 hover:bg-white/90' : 'bg-navy-800 text-white hover:bg-navy-700')}`}>
            <Phone size={14} />
            Sună-ne
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[101] relative gap-[5px] outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className={`w-6 h-[1.5px] block rounded-full transition-colors duration-300 ${spanBg}`} />
          <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className={`w-6 h-[1.5px] block rounded-full transition-colors duration-300 ${spanBg}`} />
          <motion.span animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className={`w-6 h-[1.5px] block rounded-full transition-colors duration-300 ${spanBg}`} />
        </button>

      </motion.nav>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
