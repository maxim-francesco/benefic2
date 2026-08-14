import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Fuel } from 'lucide-react';
import { Gauge } from 'lucide-react';
import { CarFront } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Search } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import { X } from 'lucide-react';
import { API_BASE, BUSINESS_ID, CATEGORY_ID } from '../lib/constants';

interface APIListing {
  id: string;
  title: string;
  images: { url: string }[];
  attributeValues: {
    attribute: { name: string };
    stringValue?: string | null;
    numberValue?: number | null;
    booleanValue?: boolean | null;
  }[];
  category?: { name: string };
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FilterMeta {
  marca: string[];
  combustibil: string[];
  cutie: string[];
  pret: { min: number; max: number };
  an: { min: number; max: number };
  km: { min: number; max: number };
}

export default function CarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<APIListing[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({ total: 0, page: 1, limit: 12, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Refined Local UI States
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [localInputs, setLocalInputs] = useState<Record<string, string>>({});

  // Meta States
  const [filterMeta, setFilterMeta] = useState<FilterMeta>({
    marca: [],
    combustibil: [],
    cutie: [],
    pret: { min: 0, max: 100000 },
    an: { min: 2000, max: 2026 },
    km: { min: 0, max: 300000 },
  });

  // Sync Input States With URL
  useEffect(() => {
    const current: Record<string, string> = {};
    searchParams.forEach((val, key) => { current[key] = val; });
    setLocalInputs(current);
  }, [searchParams]);

  // Fetch Filters Metadata Once
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [marcaRes, combRes, cutieRes, pretRes, anRes, kmRes] = await Promise.all([
          fetch(`${API_BASE}/api/public/attributes/cmnmfqjv602jmxi27sdfn8bsf/unique-values`).then(r => r.json()),
          fetch(`${API_BASE}/api/public/attributes/cmnmfqhzr02hyxi27c0luo0km/unique-values`).then(r => r.json()),
          fetch(`${API_BASE}/api/public/attributes/cmnmfqi6l02i4xi27hof6g4fk/unique-values`).then(r => r.json()),
          fetch(`${API_BASE}/api/public/attributes/cmnmfqjqx02jixi275e0ecjqt/stats`).then(r => r.json()),
          fetch(`${API_BASE}/api/public/attributes/cmnmfqjt102jkxi27tfu6crga/stats`).then(r => r.json()),
          fetch(`${API_BASE}/api/public/attributes/cmnmfqjzs02jqxi278nk9ghl7/stats`).then(r => r.json()),
        ]);

        setFilterMeta({
          marca: Array.isArray(marcaRes) ? marcaRes : [],
          combustibil: Array.isArray(combRes) ? combRes : [],
          cutie: Array.isArray(cutieRes) ? cutieRes : [],
          pret: { min: pretRes.min || 0, max: pretRes.max || 0 },
          an: { min: anRes.min || 0, max: anRes.max || 0 },
          km: { min: kmRes.min || 0, max: kmRes.max || 0 }
        });
      } catch (e) {
        if (import.meta.env.DEV) {
          console.error('Filter meta error', e);
        }
      }
    };
    fetchMeta();
  }, []);

  // Fetch Current Cars
  useEffect(() => {
    const fetchCarsResult = async () => {
      setLoading(true);
      setError(false);
      try {
        const url = new URL(`${API_BASE}/api/public/listings/search`);
        url.searchParams.append('businessId', BUSINESS_ID);
        url.searchParams.append('categoryId', CATEGORY_ID);

        const filtersMap = ['q', 'Marca', 'Combustibil', 'Pret_min', 'Pret_max', 'An_min', 'An_max', 'Kilometraj_min', 'Kilometraj_max', 'Cutie de viteze'];
        filtersMap.forEach(key => {
          const v = searchParams.get(key);
          if (v) url.searchParams.append(key, v);
        });

        const targetPage = Number(searchParams.get('page')) || 1;
        if (targetPage > 1) {
          url.searchParams.append('page', targetPage.toString());
        }

        console.log("FETCH URL:", url.toString());
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch listings');
        
        const json = await res.json();
        setCars(json.data || []);
        setPagination(json.pagination || null);
        
        if (targetPage > 1) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('Listings Fetch Error:', err);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCarsResult();
  }, [searchParams]);

  // Handle Global Filters URL Builder
  const applyFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.delete('page'); // force reset page
    setSearchParams(newParams);
  };

  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams()); 
    setLocalInputs({});
    setIsMobileFiltersOpen(false);
  };

  // Lock mobile body scroll when drawer is open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileFiltersOpen]);

  // Helpers Local UI
  const handleInputChange = (key: string, value: string) => setLocalInputs(prev => ({ ...prev, [key]: value }));
  const handleInputBlur = (key: string) => applyFilter(key, localInputs[key] || '');

  const getAttr = (car: APIListing, name: string) => car.attributeValues.find(a => a.attribute.name === name);
  const formatPrice = (car: APIListing) => { const v = getAttr(car, 'Pret')?.numberValue; return v ? `${v.toLocaleString('de-DE')} €` : 'Preț la cerere'; };
  const formatKm = (car: APIListing) => { const v = getAttr(car, 'Kilometraj')?.numberValue; return v != null ? `${v.toLocaleString('de-DE')} km` : '- km'; };
  const getYear = (car: APIListing) => getAttr(car, 'An')?.numberValue || '-';
  const getFuel = (car: APIListing) => getAttr(car, 'Combustibil')?.stringValue || '-';
  const getGearbox = (car: APIListing) => getAttr(car, 'Cutie de viteze')?.stringValue || '-';

  // Extract shared Filter Layout
  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. ROW MAIN */}
      <div className={`grid grid-cols-1 ${!isMobile && 'lg:grid-cols-4'} gap-4`}>
        {/* Search */}
        <div className="flex flex-col relative w-full lg:col-span-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
          <input 
            type="text" 
            placeholder="Caută model..."
            value={localInputs.q || ''}
            onChange={(e) => handleInputChange('q', e.target.value)}
            onBlur={() => handleInputBlur('q')}
            onKeyDown={(e) => e.key === 'Enter' && handleInputBlur('q')}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 transition-all shadow-sm"
          />
        </div>

        {/* Marca */}
        <div className="flex flex-col w-full lg:col-span-1">
          <select
            value={searchParams.get('Marca') || ''}
            onChange={(e) => applyFilter('Marca', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 appearance-none transition-all shadow-sm"
          >
            <option value="">Toate mărcile</option>
            {filterMeta.marca.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        {/* Combustibil */}
        <div className="flex flex-col w-full lg:col-span-1">
          <select
             value={searchParams.get('Combustibil') || ''}
             onChange={(e) => applyFilter('Combustibil', e.target.value)}
             className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 appearance-none transition-all shadow-sm"
          >
            <option value="">Orice combustibil</option>
            {filterMeta.combustibil.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        {/* Pret */}
        <div className="grid grid-cols-2 gap-2 lg:col-span-1 w-full">
          <input 
            type="number" placeholder="Preț min (€)" min={filterMeta.pret.min}
            value={localInputs.Pret_min || ''}
            onChange={e => handleInputChange('Pret_min', e.target.value)}
            onBlur={() => handleInputBlur('Pret_min')}
            onKeyDown={(e) => e.key === 'Enter' && handleInputBlur('Pret_min')}
            className="w-full px-3 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 transition-all shadow-sm"
          />
          <input 
            type="number" placeholder="Preț max (€)" max={filterMeta.pret.max}
            value={localInputs.Pret_max || ''}
            onChange={e => handleInputChange('Pret_max', e.target.value)}
            onBlur={() => handleInputBlur('Pret_max')}
            onKeyDown={(e) => e.key === 'Enter' && handleInputBlur('Pret_max')}
            className="w-full px-3 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. ROW EXPANDED */}
      <AnimatePresence>
        {(isExpanded || isMobile) && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`grid grid-cols-1 ${!isMobile && 'lg:grid-cols-3'} gap-4 overflow-hidden pt-2`}
          >
             {/* Box Cutie Viteze */}
             <div className="flex flex-col w-full">
              <select
                 value={searchParams.get('Cutie de viteze') || ''}
                 onChange={(e) => applyFilter('Cutie de viteze', e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 appearance-none transition-all shadow-sm"
              >
                <option value="">Orice transmisie</option>
                {filterMeta.cutie.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Box An */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <input 
                type="number" placeholder="An min"
                value={localInputs.An_min || ''}
                onChange={e => handleInputChange('An_min', e.target.value)}
                onBlur={() => handleInputBlur('An_min')}
                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur('An_min')}
                className="w-full px-3 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 transition-all shadow-sm"
              />
              <input 
                type="number" placeholder="An max"
                value={localInputs.An_max || ''}
                onChange={e => handleInputChange('An_max', e.target.value)}
                onBlur={() => handleInputBlur('An_max')}
                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur('An_max')}
                className="w-full px-3 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 transition-all shadow-sm"
              />
            </div>

            {/* Box Kilometraj */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <input 
                type="number" placeholder="Km min"
                value={localInputs.Kilometraj_min || ''}
                onChange={e => handleInputChange('Kilometraj_min', e.target.value)}
                onBlur={() => handleInputBlur('Kilometraj_min')}
                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur('Kilometraj_min')}
                className="w-full px-3 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 transition-all shadow-sm"
              />
              <input 
                type="number" placeholder="Km max"
                value={localInputs.Kilometraj_max || ''}
                onChange={e => handleInputChange('Kilometraj_max', e.target.value)}
                onBlur={() => handleInputBlur('Kilometraj_max')}
                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur('Kilometraj_max')}
                className="w-full px-3 py-3 rounded-xl border border-navy-200 bg-white focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 outline-none text-sm font-body text-navy-800 transition-all shadow-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Utilities Container */}
      <div className={`flex items-center justify-between mt-2 pt-4 border-t border-navy-100 ${isMobile && 'flex-col gap-4'}`}>
        {!isMobile && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-body font-semibold text-navy-600 hover:text-navy-900 transition-colors"
          >
            <SlidersHorizontal size={16} />
            {isExpanded ? 'Ascunde Detaliile' : 'Mai multe filtre'}
          </button>
        )}
        
        <button 
          onClick={resetFilters}
          className="text-sm font-body text-red-500 hover:text-red-700 font-medium ml-auto"
        >
          Resetează filtrele
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Stoc Mașini Rulate — Benefic Car Ilfov</title>
        <meta name="description" content="Vezi toate mașinile rulate disponibile la Benefic Car. Filtrează după marcă, preț, an, combustibil. Prețuri de la importator." />
      </Helmet>
      <main id="main-content" className="w-full bg-white pt-[100px] md:pt-[120px] pb-20 px-5 md:px-8 min-h-screen relative">
        <div className="max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <div className="text-[0.7rem] font-semibold tracking-[0.3em] text-mauve-600 uppercase mb-2">
            INVENTAR AUTO
          </div>
          <h1 className="font-display font-bold text-navy-800 text-3xl md:text-4xl">
            Descoperă Mașinile Din Stoc
          </h1>
          <p className="font-body text-navy-500 mt-3 max-w-xl mx-auto">
            Vehicule rulate riguros verificate, disponibile imediat la sediul nostru sau cu livrare acasă.
          </p>
        </div>

        {/* FILTER BAR DESKTOP / BTN MOBILE */}
        <div className="mb-10 lg:bg-navy-50/50 lg:rounded-2xl lg:p-6 lg:border lg:border-navy-100/60">
          <div className="hidden lg:block">
            <FilterContent />
          </div>
          
          <div className="lg:hidden flex items-center justify-center">
            <button
               onClick={() => setIsMobileFiltersOpen(true)}
               className="w-full sm:w-auto flex items-center justify-center gap-2 bg-navy-800 text-white rounded-xl px-6 py-4 font-display font-semibold hover:bg-navy-700 shadow-lg shadow-navy-900/10"
            >
              <SlidersHorizontal size={18} />
              Filtrează Rezultatele
            </button>
          </div>
        </div>

        {/* MOBILE FILTER DRAWER */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Închide overlay filtre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden w-full h-full border-none p-0 cursor-default"
                onClick={() => setIsMobileFiltersOpen(false)}
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl z-[100] lg:hidden p-6 overflow-y-auto flex flex-col"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-navy-100">
                  <h2 className="font-display font-bold text-navy-900 text-xl flex items-center gap-2">
                    <SlidersHorizontal size={20} className="text-mauve-600" />
                    Filtrează
                  </h2>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center text-navy-600">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1">
                   <FilterContent isMobile={true} />
                </div>
                
                <div className="mt-8 pt-4 border-t border-navy-100 flex gap-4 bg-white sticky bottom-0 pb-4">
                   <button 
                     onClick={() => setIsMobileFiltersOpen(false)}
                     className="w-full bg-navy-800 text-white rounded-lg py-3 font-display font-semibold hover:bg-navy-700 transition-colors shadow-lg shadow-navy-900/10"
                   >
                     Aplică Filtre
                   </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* STATE: LOADING */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-navy-100 p-2 h-[420px] animate-pulse flex flex-col">
                <div className="bg-navy-100 rounded-xl w-full aspect-[4/3]" />
                <div className="p-4 flex flex-col flex-1">
                  <div className="mt-2 bg-navy-100 h-6 w-3/4 rounded-md" />
                  <div className="mt-2 bg-navy-100 h-6 w-1/2 rounded-md" />
                  <div className="mt-6 bg-navy-100 h-8 w-1/3 rounded-md" />
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-auto pt-4 border-t border-navy-100/50">
                    <div className="bg-navy-100 h-4 w-3/4 rounded-md" />
                    <div className="bg-navy-100 h-4 w-3/4 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STATE: ERROR */}
        {!loading && error && (
          <div className="flex flex-col items-center text-center bg-red-50/50 border border-red-100 rounded-2xl py-16 px-6 max-w-2xl mx-auto">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <h2 className="font-display font-semibold text-red-900 text-xl">Nu am putut încărca ofertele</h2>
            <p className="font-body text-red-800/80 mt-2">
              A apărut o problemă de conexiune cu serverul.
            </p>
            <button 
              onClick={() => { searchParams.toString(); window.location.reload(); }}
              className="mt-6 px-6 py-2.5 bg-red-100 text-red-900 rounded-full font-display font-medium hover:bg-red-200 transition-colors"
            >
              Reîncearcă
            </button>
          </div>
        )}

        {/* STATE: EMPTY */}
        {!loading && !error && cars.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center bg-navy-50/50 rounded-2xl py-20 px-6 border border-navy-100 border-dashed max-w-3xl mx-auto">
            <CarFront size={64} className="text-navy-300 mb-5" strokeWidth={1.5} />
            <h2 className="font-display font-semibold text-navy-800 text-2xl">Nu am găsit rezultate</h2>
            <p className="font-body text-navy-500 mt-2 max-w-md">
              În acest moment nu există nicio mașină activă pe acești parametri de filtrare.
            </p>
            <button 
              onClick={resetFilters}
              className="mt-8 bg-mauve-600 text-white rounded-full px-8 py-3.5 font-display font-semibold hover:bg-mauve-500 transition-all shadow-lg shadow-mauve-600/20"
            >
              Curăță Filtrele
            </button>
          </div>
        )}

        {/* GRID RESULTS */}
        {!loading && !error && cars.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="h-full"
              >
                <Link 
                  to={`/masini/${car.id}`} 
                  className="group flex flex-col h-full bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-[0_12px_40px_-12px_rgba(26,31,61,0.15)] transition-all duration-300 hover:-translate-y-1.5 p-2"
                >
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-navy-50 border border-navy-100/50 shrink-0">
                    <img 
                      src={car.images?.[0]?.url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'} 
                      alt={car.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                      loading="lazy"
                      width={400}
                      height={300}
                    />
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-display font-semibold text-navy-800 text-lg leading-snug">
                      {car.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-4 mt-auto">
                      <div className="flex items-center gap-1.5 text-navy-600 font-body text-xs font-medium">
                        <Calendar size={14} className="text-navy-400 shrink-0" />
                        <span className="truncate">{getYear(car)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-navy-600 font-body text-xs font-medium">
                        <Gauge size={14} className="text-navy-400 shrink-0" />
                        <span className="truncate">{formatKm(car)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-navy-600 font-body text-xs font-medium">
                        <Fuel size={14} className="text-navy-400 shrink-0" />
                        <span className="truncate">{getFuel(car)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-navy-600 font-body text-xs font-medium">
                        <Settings size={14} className="text-navy-400 shrink-0" />
                        <span className="truncate">{getGearbox(car)}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-navy-100/60 mt-4 flex items-center justify-between">
                      <div className="font-display font-bold text-mauve-600 text-xl">
                        {formatPrice(car)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PAGINATION */}
        {!loading && !error && pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16 pb-8">
            <button 
              disabled={Number(searchParams.get('page') || 1) <= 1} 
              onClick={() => changePage(Number(searchParams.get('page') || 1) - 1)}
              className="w-11 h-11 rounded-full bg-white border border-navy-200 flex items-center justify-center text-navy-600 hover:bg-navy-50 hover:border-navy-300 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="font-body text-navy-700 text-sm font-medium w-[120px] text-center">
              Pagina {searchParams.get('page') || 1} din {pagination.totalPages}
            </div>
            <button 
              disabled={Number(searchParams.get('page') || 1) >= pagination.totalPages} 
              onClick={() => changePage(Number(searchParams.get('page') || 1) + 1)}
              className="w-11 h-11 rounded-full bg-white border border-navy-200 flex items-center justify-center text-navy-600 hover:bg-navy-50 hover:border-navy-300 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      </div>
    </main>
    </>
  );
}
