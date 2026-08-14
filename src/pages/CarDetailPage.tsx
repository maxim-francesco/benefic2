import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { X } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Fuel } from 'lucide-react';
import { Gauge } from 'lucide-react';
import { Settings } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Info } from 'lucide-react';
import { API_BASE } from '../lib/constants';

interface APICarDetail {
  id: string;
  title: string;
  price: number;
  description?: string;
  images: { url: string; order?: number }[];
  attributeValues: {
    attribute: { name: string; attributeGroup?: { name: string } | null };
    stringValue?: string | null;
    numberValue?: number | null;
    booleanValue?: boolean | null;
  }[];
  category?: { name: string };
}

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<APICarDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      window.scrollTo(0, 0); // extra safety scroll
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API_BASE}/api/public/listings/${id}`);
        if (!res.ok) throw new Error('Listing not found');
        
        const json = await res.json();
        
        // Sort images by order if it exists
        if (json.images && Array.isArray(json.images)) {
           json.images.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        }
        
        setCar(json);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('Fetch car details error:', err);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCar();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') {
        setImgIndex(prev => (car?.images && car.images.length > 1) ? (prev === car.images.length - 1 ? 0 : prev + 1) : prev);
      } else if (e.key === 'ArrowLeft') {
        setImgIndex(prev => (car?.images && car.images.length > 1) ? (prev === 0 ? car.images.length - 1 : prev - 1) : prev);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen, car?.images]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const distance = touchStart - e.changedTouches[0].clientX;
    if (distance > 50 && car?.images && car.images.length > 1) {
      setImgIndex(prev => prev === car.images.length - 1 ? 0 : prev + 1);
    } else if (distance < -50 && car?.images && car.images.length > 1) {
      setImgIndex(prev => prev === 0 ? car.images.length - 1 : prev - 1);
    }
  };

  // UI Handlers
  const nextImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!car?.images?.length) return;
    setImgIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!car?.images?.length) return;
    setImgIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1));
  };

  // Helper selections
  const getAttr = (name: string) => car?.attributeValues?.find(a => a.attribute.name === name);
  
  const priceAttr = getAttr('Pret');
  const actualPrice = car?.price || priceAttr?.numberValue;

  const year = getAttr('An')?.numberValue;
  const km = getAttr('Kilometraj')?.numberValue;
  const fuel = getAttr('Combustibil')?.stringValue;
  const gb = getAttr('Cutie de viteze')?.stringValue;

  // Group attributes
  const specsByGroup = car?.attributeValues?.reduce((acc, attr) => {
    const groupName = attr.attribute.attributeGroup?.name || 'Alte Dotări';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(attr);
    return acc;
  }, {} as Record<string, typeof car.attributeValues>);


  if (loading) {
    return (
      <main className="w-full bg-white pt-[120px] pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-[60%] animate-pulse">
              <div className="w-full aspect-[4/3] bg-navy-100 rounded-2xl"></div>
            </div>
            <div className="lg:w-[40%] animate-pulse py-4">
              <div className="h-10 bg-navy-100 rounded-md w-3/4 mb-4"></div>
              <div className="h-12 bg-navy-100 rounded-md w-1/2 mb-10"></div>
              <div className="flex gap-3 mb-10">
                <div className="h-10 bg-navy-100 rounded-full w-24"></div>
                <div className="h-10 bg-navy-100 rounded-full w-24"></div>
              </div>
              <div className="h-16 bg-navy-100 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !car) {
    return (
      <main className="w-full bg-white pt-[140px] pb-20 min-h-screen flex items-center justify-center">
         <div className="flex flex-col items-center justify-center text-center bg-navy-50/50 rounded-2xl py-20 px-6 border border-navy-100 border-dashed max-w-xl mx-auto w-[90%]">
          <AlertCircle size={64} className="text-red-400 mb-5" strokeWidth={1.5} />
          <h2 className="font-display font-semibold text-navy-800 text-2xl">Mașina nu a fost găsită</h2>
          <p className="font-body text-navy-500 mt-2">
            Ne pare rău, dar oferta pe care o cauți nu mai este disponibilă sau link-ul este greșit.
          </p>
          <Link 
            to="/masini" 
            className="mt-8 bg-navy-800 text-white rounded-full px-8 py-3.5 font-display font-semibold hover:bg-navy-700 hover:scale-[1.02] transition-all shadow-lg shadow-navy-900/20"
          >
            Înapoi la Stoc
          </Link>
        </div>
      </main>
    );
  }

  const images = car.images && car.images.length > 0 ? car.images : [{ url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200', order: 0 }];
  const currentImgUrl = images[imgIndex].url;
  const isMultipleImages = images.length > 1;

  return (
    <>
      <Helmet>
        <title>{car.title} — Benefic Car</title>
        <meta name="description" content={`${getAttr('Marca')?.stringValue || ''} ${getAttr('Model')?.stringValue || ''}, ${getAttr('An')?.numberValue || ''}, ${getAttr('Kilometraj')?.numberValue || ''} km, ${getAttr('Combustibil')?.stringValue || ''} — disponibil la Benefic Car cu garanție și finanțare.`} />
      </Helmet>
      <main id="main-content" className="w-full bg-white pt-[100px] md:pt-[120px] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
          
          {/* Stânga: Galerie */}
          <div className="w-full lg:w-[60%]">
            <div 
              role="button"
              tabIndex={0}
              aria-label="Mărește fotografia"
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-navy-50 border border-navy-100/50 group cursor-zoom-in shadow-sm shadow-navy-900/5 text-left block p-0"
              onClick={() => setLightboxOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxOpen(true);
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentImgUrl}
                  alt={`${car.title} - Foto ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Controale Săgeți */}
              {isMultipleImages && (
                <>
                  <button 
                    type="button"
                    aria-label="Fotografia anterioară"
                    onClick={(e) => { e.stopPropagation(); prevImg(e); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-navy-800 hover:bg-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    type="button"
                    aria-label="Fotografia următoare"
                    onClick={(e) => { e.stopPropagation(); nextImg(e); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-navy-800 hover:bg-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {/* Navigatie Mici */}
            {isMultipleImages && (
              <div className="mt-4 flex items-center justify-center text-navy-500 font-body text-sm tracking-wide">
                Foto {imgIndex + 1} din {images.length}
              </div>
            )}
          </div>

          {/* Dreapta: Info principal */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center">
            <div className="inline-block bg-mauve-50 text-mauve-600 font-semibold px-3 py-1 rounded-md text-[0.7rem] uppercase tracking-[0.2em] w-fit mb-4">
              OFERTĂ AUTO
            </div>
            <h1 className="font-display font-bold text-navy-900 text-3xl xl:text-4xl leading-tight mb-3">
              {car.title}
            </h1>
            <div className="font-display font-bold text-mauve-600 text-4xl mb-8">
              {actualPrice ? `${actualPrice.toLocaleString('de-DE')} €` : 'Preț la cerere'}
            </div>

            {/* Badges rapide grid-ish */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {year && (
                <div className="flex items-center gap-2 bg-navy-50 border border-navy-100 px-4 py-2.5 rounded-xl text-navy-700 font-body text-sm font-medium">
                  <Calendar size={16} className="text-navy-400" />
                  {year}
                </div>
              )}
              {km !== undefined && (
                <div className="flex items-center gap-2 bg-navy-50 border border-navy-100 px-4 py-2.5 rounded-xl text-navy-700 font-body text-sm font-medium">
                  <Gauge size={16} className="text-navy-400" />
                  {km?.toLocaleString('de-DE')} km
                </div>
              )}
              {fuel && (
                <div className="flex items-center gap-2 bg-navy-50 border border-navy-100 px-4 py-2.5 rounded-xl text-navy-700 font-body text-sm font-medium">
                  <Fuel size={16} className="text-navy-400" />
                  {fuel}
                </div>
              )}
              {gb && (
                <div className="flex items-center gap-2 bg-navy-50 border border-navy-100 px-4 py-2.5 rounded-xl text-navy-700 font-body text-sm font-medium">
                  <Settings size={16} className="text-navy-400" />
                  {gb}
                </div>
              )}
            </div>

            <a 
              href="tel:+40721703507"
              className="w-full bg-navy-900 text-white py-4 px-8 rounded-full font-display font-semibold text-lg hover:bg-navy-800 hover:scale-[1.02] shadow-lg shadow-navy-900/20 transition-all flex justify-center items-center gap-2 text-center"
            >
              <Phone size={20} />
              Contactează-ne Recomandat
            </a>
            <div className="mt-4 text-center font-body text-sm text-navy-400">
              Menționați că sunați pentru modelul id: {car.id.slice(-6)}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICAȚII TEHNICE */}
      <section className="bg-navy-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center md:text-left mb-12">
            <h2 className="font-display font-bold text-navy-900 text-3xl">Specificații și Dotări</h2>
          </div>

          <div className="flex flex-col gap-10">
            {Object.entries(specsByGroup || {}).map(([groupName, attributes]) => {
              // Filtrăm atributele booleene care sunt false
              const validAttributes = attributes.filter(attr => {
                const isBool = attr.booleanValue !== null && attr.booleanValue !== undefined;
                if (isBool && attr.booleanValue !== true) return false;
                return true;
              });

              if (validAttributes.length === 0) return null;

              return (
                <div key={groupName}>
                  <h3 className="font-display font-semibold text-navy-800 text-xl border-b border-navy-200/60 pb-3 mb-6 flex items-center gap-2">
                    <Info size={18} className="text-navy-400" />
                    {groupName}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                    {validAttributes.map((attr, idx) => {
                      const { name } = attr.attribute;
                      const isBoolean = attr.booleanValue === true;
                      
                      let valueDisplay: React.ReactNode = null;
                      if (isBoolean) {
                         valueDisplay = <span className="font-body text-navy-800 font-medium">{name}</span>;
                      } else if (attr.stringValue !== null && attr.stringValue !== undefined && attr.stringValue !== "") {
                         valueDisplay = (
                            <div className="flex flex-col">
                              <span className="font-body text-navy-400 text-xs">{name}</span>
                              <span className="font-body text-navy-800 font-medium whitespace-pre-wrap">{attr.stringValue}</span>
                            </div>
                         );
                      } else if (attr.numberValue !== null && attr.numberValue !== undefined) {
                          let formatValue = attr.numberValue.toLocaleString('de-DE');
                          const lowerName = name.toLowerCase();
                          if (lowerName.includes('putere') || lowerName.includes('cp')) formatValue += ' CP';
                          else if (lowerName === 'capacitate cilindrica') formatValue += ' cm³';
                          else if (lowerName.includes('km') || lowerName.includes('rulaj')) formatValue += ' km';
                          
                          valueDisplay = (
                            <div className="flex flex-col">
                              <span className="font-body text-navy-400 text-xs">{name}</span>
                              <span className="font-body text-navy-800 font-medium">{formatValue}</span>
                            </div>
                         );
                      } else {
                          return null;
                      }

                      return (
                        <div key={idx} className="flex items-start gap-4 p-2">
                          {isBoolean ? (
                            <CheckCircle size={22} className="text-green-500 shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-navy-100 shrink-0 shadow-sm mt-0.5">
                              <Settings size={16} className="text-navy-500" />
                            </div>
                          )}
                          {valueDisplay}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DESCRIERE */}
      {car.description && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <h2 className="font-display font-bold text-navy-900 text-3xl mb-8">Descrierea Vehiculului</h2>
            <div className="font-body text-navy-600 text-lg leading-relaxed whitespace-pre-wrap p-6 md:p-10 bg-navy-50/50 rounded-2xl border border-navy-100/50">
              {car.description}
            </div>
          </div>
        </section>
      )}

      {/* 4. CTA FINAL */}
      <section className="bg-navy-900 py-16 md:py-20 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="font-display font-bold text-white text-3xl mb-4">Ești interesat de această mașină?</h2>
          <p className="font-body text-navy-300 mb-10 max-w-lg mx-auto">
            Contactează-ne telefonic pentru a stabili o vizionare sau trimite-ne un mesaj pentru a primi mai multe detalii.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a 
              href="tel:+40721703507"
              className="w-full sm:w-auto bg-mauve-600 text-white rounded-full px-8 py-4 font-display font-semibold transition-all duration-300 hover:bg-mauve-500 hover:scale-105 shadow-lg shadow-mauve-600/20 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Sună Acum
            </a>
            <Link 
              to="/contact"
              className="w-full sm:w-auto bg-navy-800 text-white border border-navy-700 rounded-full px-8 py-4 font-display font-semibold transition-all duration-300 hover:bg-navy-700 shadow-lg shadow-navy-950/20 flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Trimite Mesaj
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[101]"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            {isMultipleImages && (
              <>
                <button 
                  onClick={prevImg}
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[101]"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={nextImg}
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[101]"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Main Lightbox Image */}
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              key={currentImgUrl} // Re-animate if image changes
              src={currentImgUrl}
              alt={`View ${imgIndex}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()} // don't close when clicking image
            />
            
            {/* Counter */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full font-body text-sm backdrop-blur-md">
              {imgIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
    </>
  );
}
