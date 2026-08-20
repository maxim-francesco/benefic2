import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Settings, Calendar, Fuel, Gauge, CarFront, AlertCircle } from 'lucide-react';
import { API_BASE, BUSINESS_ID, CATEGORY_ID } from '../lib/constants';
import type { APIListing, FilterState } from '../lib/attributes';
import { getAttributeValueById } from '../lib/attributes';
import { useStockFacets, DesktopFilterSidebar, StockFiltersTopBar, MobileFilterPanel } from '../components/StockFilters';

export default function CarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<APIListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // 1. Parse FilterState from useSearchParams
  const filters: FilterState = useMemo(() => {
    return {
      marca: searchParams.get("marca") ? searchParams.get("marca")!.split(",").filter(Boolean) : [],
      model: searchParams.get("model") ? searchParams.get("model")!.split(",").filter(Boolean) : [],
      combustibil: searchParams.get("combustibil") ? searchParams.get("combustibil")!.split(",").filter(Boolean) : [],
      cutie: searchParams.get("cutie") ? searchParams.get("cutie")!.split(",").filter(Boolean) : [],
      caroserie: searchParams.get("caroserie") ? searchParams.get("caroserie")!.split(",").filter(Boolean) : [],
      an_min: searchParams.get("an_min") || "",
      an_max: searchParams.get("an_max") || "",
      pret_min: searchParams.get("pret_min") || "",
      pret_max: searchParams.get("pret_max") || "",
      km_min: searchParams.get("km_min") || "",
      km_max: searchParams.get("km_max") || "",
      q: searchParams.get("q") || "",
    };
  }, [searchParams]);

  // 2. Call useStockFacets ONCE
  const facets = useStockFacets(cars, filters);

  // 3. Fetch Full Catalogue Once
  useEffect(() => {
    const fetchCarsResult = async () => {
      setLoading(true);
      setError(false);
      try {
        const url = new URL(`${API_BASE}/api/public/listings/search`);
        url.searchParams.append('businessId', BUSINESS_ID);
        url.searchParams.append('categoryId', CATEGORY_ID);
        // The backend defaults to 10 listings if limit is absent. This site performs filtering client-side over the entire catalog. limit=200 is a ceiling for client-side filtering, not a hard guarantee.
        url.searchParams.append('limit', '200');

        console.log("FETCH URL:", url.toString());
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch listings');
        
        const json = await res.json();
        setCars(json.data || []);
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
  }, []);

  // 4. Filter change handler updating searchParams
  const handleFilterChange = (newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams);

    const setOrDelete = (key: string, val: string | string[]) => {
      if (Array.isArray(val)) {
        if (val.length > 0) params.set(key, val.join(","));
        else params.delete(key);
      } else {
        if (val && val.trim()) params.set(key, val.trim());
        else params.delete(key);
      }
    };

    setOrDelete("marca", newFilters.marca);
    setOrDelete("model", newFilters.model);
    setOrDelete("combustibil", newFilters.combustibil);
    setOrDelete("cutie", newFilters.cutie);
    setOrDelete("caroserie", newFilters.caroserie);
    setOrDelete("an_min", newFilters.an_min);
    setOrDelete("an_max", newFilters.an_max);
    setOrDelete("pret_min", newFilters.pret_min);
    setOrDelete("pret_max", newFilters.pret_max);
    setOrDelete("km_min", newFilters.km_min);
    setOrDelete("km_max", newFilters.km_max);
    setOrDelete("q", newFilters.q);

    setSearchParams(params, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
    setIsMobileFiltersOpen(false);
  };

  // Helper attribute formatters using getAttributeValueById
  const formatPrice = (car: APIListing) => {
    const v = car.price ?? getAttributeValueById(car, ["attr:price"], ["pret"]);
    const num = typeof v === "number" ? v : (typeof v === "string" ? parseInt(v, 10) : null);
    return num !== null && !isNaN(num) ? `${num.toLocaleString('de-DE')} €` : 'Preț la cerere';
  };

  const formatKm = (car: APIListing) => {
    const v = getAttributeValueById(car, ["attr:mileage"], ["kilometraj", "rulaj"]);
    const num = typeof v === "number" ? v : (typeof v === "string" ? parseInt(v, 10) : null);
    return num !== null && !isNaN(num) ? `${num.toLocaleString('de-DE')} km` : '- km';
  };

  const getYear = (car: APIListing) => {
    const v = getAttributeValueById(car, ["attr:year"], ["an"]);
    return v !== null && v !== undefined ? String(v) : '-';
  };

  const getFuel = (car: APIListing) => {
    const v = getAttributeValueById(car, ["attr:fuelType"], ["combustibil"]);
    return v !== null && v !== undefined ? String(v) : '-';
  };

  const getGearbox = (car: APIListing) => {
    const v = getAttributeValueById(car, ["attr:gearbox", "attr:transmission"], ["cutie de viteze", "transmisie"]);
    return v !== null && v !== undefined ? String(v) : '-';
  };

  return (
    <>
      <Helmet>
        <title>Stoc Mașini Rulate — Benefic Car Ilfov</title>
        <meta name="description" content="Vezi toate mașinile rulate disponibile la Benefic Car. Filtrează după marcă, preț, an, combustibil. Prețuri de la importator." />
      </Helmet>
      <main id="main-content" className="w-full bg-white pt-[100px] md:pt-[120px] pb-20 px-5 md:px-8 min-h-screen relative">
        <div className="max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
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

        {/* TOP CONTROLS & ACTIVE PILLS BAR */}
        <StockFiltersTopBar
          facets={facets}
          filters={filters}
          onFilterChange={handleFilterChange}
          onOpenMobile={() => setIsMobileFiltersOpen(true)}
        />

        {/* RESULT COUNT SUMMARY */}
        {!loading && !error && (
          <div className="text-sm font-body font-medium text-navy-600 mb-6">
            Afișare <strong className="text-navy-900">{facets.filteredListings.length}</strong> din{" "}
            <strong className="text-navy-900">{cars.length}</strong> mașini
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <DesktopFilterSidebar
            facets={facets}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* MAIN RESULTS GRID CONTAINER */}
          <div className="lg:col-span-3">
            {/* STATE: LOADING */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-2.5 bg-red-100 text-red-900 rounded-full font-display font-medium hover:bg-red-200 transition-colors"
                >
                  Reîncearcă
                </button>
              </div>
            )}

            {/* STATE: EMPTY */}
            {!loading && !error && facets.filteredListings.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center bg-navy-50/50 rounded-2xl py-16 px-6 border border-navy-100 border-dashed max-w-3xl mx-auto">
                <CarFront size={64} className="text-navy-300 mb-5" strokeWidth={1.5} />
                <h2 className="font-display font-semibold text-navy-800 text-2xl">Nicio mașină găsită</h2>
                <p className="font-body text-navy-500 mt-2 max-w-md">
                  Niciun autoturism nu corespunde filtrelor selectate. Încearcă să elimini din filtre sau să cauți altceva.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-8 bg-mauve-600 text-white rounded-full px-8 py-3.5 font-display font-semibold hover:bg-mauve-500 transition-all shadow-lg shadow-mauve-600/20 min-h-[44px]"
                >
                  Șterge tot
                </button>
              </div>
            )}

            {/* GRID RESULTS */}
            {!loading && !error && facets.filteredListings.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {facets.filteredListings.map((car, idx) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.03 }}
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
          </div>
        </div>

        {/* MOBILE FILTER PANEL */}
        <MobileFilterPanel
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          facets={facets}
          filters={filters}
          onFilterChange={handleFilterChange}
          filteredCount={facets.filteredListings.length}
        />
      </div>
    </main>
    </>
  );
}
