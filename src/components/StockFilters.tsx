import { useState, useMemo, useEffect, useRef } from "react";
import { Search, ChevronDown, ChevronUp, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import type { APIListing, FilterState } from "../lib/attributes";
import { getAttributeValueById, normalizeText } from "../lib/attributes";

/**
 * Minimum fraction of total listings that must carry a non-null attribute value for a
 * multi-select facet to be rendered in the UI. 0.6 (60%) is a judgement call, not a
 * measured optimum, to prevent sparse attributes (such as bodyType with 2/25 = 8% coverage)
 * from hiding legitimate inventory when selected.
 */
export const MIN_FACET_COVERAGE = 0.6;

export function useStockFacets(allListings: APIListing[], filters: FilterState) {
  const matchListingExcluding = (car: APIListing, excludeKeys: string[]) => {
    // 1. Text search
    if (!excludeKeys.includes("q") && filters.q.trim()) {
      const words = normalizeText(filters.q).split(/\s+/).filter(Boolean);
      const title = normalizeText(car.title);
      const make = normalizeText(String(getAttributeValueById(car, ["attr:brand", "attr:make"], ["marca", "brand"]) ?? ""));
      const model = normalizeText(String(getAttributeValueById(car, ["attr:model"], ["model"]) ?? ""));
      const fuel = normalizeText(String(getAttributeValueById(car, ["attr:fuelType"], ["combustibil"]) ?? ""));

      const allMatch = words.every(
        (w) => title.includes(w) || make.includes(w) || model.includes(w) || fuel.includes(w)
      );
      if (!allMatch) return false;
    }

    // 2. Marca
    if (!excludeKeys.includes("marca") && filters.marca.length > 0) {
      const val = getAttributeValueById(car, ["attr:brand", "attr:make"], ["marca", "brand"]);
      if (!val || !filters.marca.some((m) => normalizeText(String(val)) === normalizeText(m))) {
        return false;
      }
    }

    // 3. Model
    if (!excludeKeys.includes("model") && filters.model.length > 0) {
      const val = getAttributeValueById(car, ["attr:model"], ["model"]);
      if (!val || !filters.model.some((m) => normalizeText(String(val)) === normalizeText(m))) {
        return false;
      }
    }

    // 4. Combustibil
    if (!excludeKeys.includes("combustibil") && filters.combustibil.length > 0) {
      const val = getAttributeValueById(car, ["attr:fuelType"], ["combustibil"]);
      if (!val || !filters.combustibil.some((c) => normalizeText(String(val)) === normalizeText(c))) {
        return false;
      }
    }

    // 5. Cutie de viteze
    if (!excludeKeys.includes("cutie") && filters.cutie.length > 0) {
      const val = getAttributeValueById(car, ["attr:gearbox", "attr:transmission"], ["cutie de viteze", "transmisie"]);
      if (!val || !filters.cutie.some((g) => normalizeText(String(val)) === normalizeText(g))) {
        return false;
      }
    }

    // 6. Caroserie
    if (!excludeKeys.includes("caroserie") && filters.caroserie.length > 0) {
      const val = getAttributeValueById(car, ["attr:bodyType"], ["caroserie"]);
      if (!val || !filters.caroserie.some((b) => normalizeText(String(val)) === normalizeText(b))) {
        return false;
      }
    }

    // 7. An
    if (!excludeKeys.includes("an")) {
      const yearVal = getAttributeValueById(car, ["attr:year"], ["an"]);
      const year = typeof yearVal === "number" ? yearVal : (typeof yearVal === "string" ? parseInt(yearVal, 10) : null);
      if (year !== null && !isNaN(year)) {
        if (filters.an_min && year < Number(filters.an_min)) return false;
        if (filters.an_max && year > Number(filters.an_max)) return false;
      }
    }

    // 8. Preț
    if (!excludeKeys.includes("pret") && car.price !== null && car.price !== undefined) {
      if (filters.pret_min && car.price < Number(filters.pret_min)) return false;
      if (filters.pret_max && car.price > Number(filters.pret_max)) return false;
    }

    // 9. Kilometraj
    if (!excludeKeys.includes("km")) {
      const kmVal = getAttributeValueById(car, ["attr:mileage"], ["kilometraj", "rulaj"]);
      const km = typeof kmVal === "number" ? kmVal : (typeof kmVal === "string" ? parseInt(kmVal, 10) : null);
      if (km !== null && !isNaN(km)) {
        if (filters.km_min && km < Number(filters.km_min)) return false;
        if (filters.km_max && km > Number(filters.km_max)) return false;
      }
    }

    return true;
  };

  return useMemo(() => {
    const totalListings = allListings.length;

    // Helper: compute coverage ratio of a non-null attribute across ALL listings
    const getCoverage = (getter: (car: APIListing) => any) => {
      if (totalListings === 0) return 0;
      let count = 0;
      allListings.forEach((c) => {
        const val = getter(c);
        if (val !== null && val !== undefined && String(val).trim() !== "") {
          count += 1;
        }
      });
      return count / totalListings;
    };

    // Coverage Ratios
    const marcaCoverage = getCoverage((c) =>
      getAttributeValueById(c, ["attr:brand", "attr:make"], ["marca", "brand"])
    );
    const modelCoverage = getCoverage((c) =>
      getAttributeValueById(c, ["attr:model"], ["model"])
    );
    const fuelCoverage = getCoverage((c) =>
      getAttributeValueById(c, ["attr:fuelType"], ["combustibil"])
    );
    const gearboxCoverage = getCoverage((c) =>
      getAttributeValueById(c, ["attr:gearbox", "attr:transmission"], ["cutie de viteze", "transmisie"])
    );
    const bodyCoverage = getCoverage((c) =>
      getAttributeValueById(c, ["attr:bodyType"], ["caroserie"])
    );

    // 1. Marca facet
    const marcaSubset = allListings.filter((c) => matchListingExcluding(c, ["marca"]));
    const marcaCountsMap = new Map<string, { display: string; count: number }>();
    marcaSubset.forEach((c) => {
      const val = getAttributeValueById(c, ["attr:brand", "attr:make"], ["marca", "brand"]);
      if (val && typeof val === "string") {
        const key = val.trim();
        const normKey = normalizeText(key);
        const existing = Array.from(marcaCountsMap.values()).find(
          (item) => normalizeText(item.display) === normKey
        );
        if (existing) {
          existing.count += 1;
        } else {
          marcaCountsMap.set(key, { display: key, count: 1 });
        }
      }
    });
    const marcaOptions = Array.from(marcaCountsMap.values()).sort((a, b) =>
      a.display.localeCompare(b.display)
    );

    // 2. Model facet (DEPENDENT)
    const modelSubset = allListings.filter((c) => matchListingExcluding(c, ["model"]));
    const modelCountsMap = new Map<string, { display: string; count: number }>();
    modelSubset.forEach((c) => {
      const val = getAttributeValueById(c, ["attr:model"], ["model"]);
      if (val && typeof val === "string") {
        const key = val.trim();
        const normKey = normalizeText(key);
        const existing = Array.from(modelCountsMap.values()).find(
          (item) => normalizeText(item.display) === normKey
        );
        if (existing) {
          existing.count += 1;
        } else {
          modelCountsMap.set(key, { display: key, count: 1 });
        }
      }
    });
    const modelOptions = Array.from(modelCountsMap.values()).sort((a, b) =>
      a.display.localeCompare(b.display)
    );

    // 3. Combustibil facet
    const fuelSubset = allListings.filter((c) => matchListingExcluding(c, ["combustibil"]));
    const fuelCountsMap = new Map<string, { display: string; count: number }>();
    fuelSubset.forEach((c) => {
      const val = getAttributeValueById(c, ["attr:fuelType"], ["combustibil"]);
      if (val && typeof val === "string") {
        const key = val.trim();
        const normKey = normalizeText(key);
        const existing = Array.from(fuelCountsMap.values()).find(
          (item) => normalizeText(item.display) === normKey
        );
        if (existing) {
          existing.count += 1;
        } else {
          fuelCountsMap.set(key, { display: key, count: 1 });
        }
      }
    });
    const fuelOptions = Array.from(fuelCountsMap.values()).sort((a, b) =>
      a.display.localeCompare(b.display)
    );

    // 4. Cutie facet
    const gearboxSubset = allListings.filter((c) => matchListingExcluding(c, ["cutie"]));
    const gearboxCountsMap = new Map<string, { display: string; count: number }>();
    gearboxSubset.forEach((c) => {
      const val = getAttributeValueById(c, ["attr:gearbox", "attr:transmission"], ["cutie de viteze", "transmisie"]);
      if (val && typeof val === "string") {
        const key = val.trim();
        const normKey = normalizeText(key);
        const existing = Array.from(gearboxCountsMap.values()).find(
          (item) => normalizeText(item.display) === normKey
        );
        if (existing) {
          existing.count += 1;
        } else {
          gearboxCountsMap.set(key, { display: key, count: 1 });
        }
      }
    });
    const gearboxOptions = Array.from(gearboxCountsMap.values()).sort((a, b) =>
      a.display.localeCompare(b.display)
    );

    // 5. Caroserie facet
    const bodySubset = allListings.filter((c) => matchListingExcluding(c, ["caroserie"]));
    const bodyCountsMap = new Map<string, { display: string; count: number }>();
    bodySubset.forEach((c) => {
      const val = getAttributeValueById(c, ["attr:bodyType"], ["caroserie"]);
      if (val && typeof val === "string") {
        const key = val.trim();
        const normKey = normalizeText(key);
        const existing = Array.from(bodyCountsMap.values()).find(
          (item) => normalizeText(item.display) === normKey
        );
        if (existing) {
          existing.count += 1;
        } else {
          bodyCountsMap.set(key, { display: key, count: 1 });
        }
      }
    });
    const bodyOptions = Array.from(bodyCountsMap.values()).sort((a, b) =>
      a.display.localeCompare(b.display)
    );

    // 6. An range bounds
    const anSubset = allListings.filter((c) => matchListingExcluding(c, ["an"]));
    let minYear = Infinity;
    let maxYear = -Infinity;
    anSubset.forEach((c) => {
      const yearVal = getAttributeValueById(c, ["attr:year"], ["an"]);
      const y = typeof yearVal === "number" ? yearVal : (typeof yearVal === "string" ? parseInt(yearVal, 10) : null);
      if (y !== null && !isNaN(y)) {
        if (y < minYear) minYear = y;
        if (y > maxYear) maxYear = y;
      }
    });
    const yearBounds =
      minYear !== Infinity && maxYear !== -Infinity ? { min: minYear, max: maxYear } : null;

    // 7. Preț range bounds
    const pretSubset = allListings.filter((c) => matchListingExcluding(c, ["pret"]));
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    pretSubset.forEach((c) => {
      if (c.price !== null && c.price !== undefined) {
        if (c.price < minPrice) minPrice = c.price;
        if (c.price > maxPrice) maxPrice = c.price;
      }
    });
    const priceBounds =
      minPrice !== Infinity && maxPrice !== -Infinity
        ? { min: minPrice, max: maxPrice }
        : null;

    // 8. Kilometraj range bounds
    const kmSubset = allListings.filter((c) => matchListingExcluding(c, ["km"]));
    let minKm = Infinity;
    let maxKm = -Infinity;
    kmSubset.forEach((c) => {
      const kmVal = getAttributeValueById(c, ["attr:mileage"], ["kilometraj", "rulaj"]);
      const km = typeof kmVal === "number" ? kmVal : (typeof kmVal === "string" ? parseInt(kmVal, 10) : null);
      if (km !== null && !isNaN(km)) {
        if (km < minKm) minKm = km;
        if (km > maxKm) maxKm = km;
      }
    });
    const kmBounds =
      minKm !== Infinity && maxKm !== -Infinity ? { min: minKm, max: maxKm } : null;

    // 9. Fully filtered listings
    const filteredListings = allListings.filter((c) => matchListingExcluding(c, []));

    return {
      marcaOptions,
      marcaCoverage,
      modelOptions,
      modelCoverage,
      fuelOptions,
      fuelCoverage,
      gearboxOptions,
      gearboxCoverage,
      bodyOptions,
      bodyCoverage,
      yearBounds,
      priceBounds,
      kmBounds,
      filteredListings,
    };
  }, [allListings, filters]);
}

// Subcomponent: Facet Option List
function FacetOptionList({
  options,
  selectedValues,
  onToggle,
}: {
  options: { display: string; count: number }[];
  selectedValues: string[];
  onToggle: (val: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const norm = normalizeText(search);
    return options.filter((o) => normalizeText(o.display).includes(norm));
  }, [options, search]);

  const visibleOptions = expanded ? filteredOptions : filteredOptions.slice(0, 8);

  return (
    <div className="space-y-1">
      {options.length > 12 && (
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Caută..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-navy-50/50 border border-navy-200 rounded-lg text-navy-800 outline-none focus:border-mauve-500"
          />
        </div>
      )}

      {visibleOptions.map((opt) => {
        const isChecked = selectedValues.some(
          (v) => normalizeText(v) === normalizeText(opt.display)
        );
        return (
          <label
            key={opt.display}
            onClick={(e) => {
              e.preventDefault();
              onToggle(opt.display);
            }}
            className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-navy-50 cursor-pointer min-h-[44px] select-none transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="w-4 h-4 text-mauve-600 rounded border-navy-300 focus:ring-mauve-500 cursor-pointer"
              />
              <span className="text-sm font-body text-navy-800 truncate">
                {opt.display}
              </span>
            </div>
            <span className="text-xs font-body text-navy-400 tabular-nums ml-2 shrink-0">
              {opt.count}
            </span>
          </label>
        );
      })}

      {filteredOptions.length > 8 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-body font-semibold text-mauve-600 hover:text-mauve-700 flex items-center gap-1 pt-1 min-h-[44px]"
        >
          {expanded ? (
            <>
              Arată mai puține <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Arată toate ({filteredOptions.length}) <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

// Subcomponent: Accordion Content with auto-open tracking & MIN_FACET_COVERAGE checks
interface FacetsAccordionContentProps {
  facets: ReturnType<typeof useStockFacets>;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

function FacetsAccordionContent({
  facets,
  filters,
  onFilterChange,
}: FacetsAccordionContentProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const prevActiveKeysRef = useRef<Set<string>>(new Set());

  // Determine current active facet keys
  const currentActiveKeys = useMemo(() => {
    const keys = new Set<string>();
    if (filters.marca.length > 0) keys.add("marca");
    if (filters.model.length > 0) keys.add("model");
    if (filters.combustibil.length > 0) keys.add("combustibil");
    if (filters.cutie.length > 0) keys.add("cutie");
    if (filters.caroserie.length > 0) keys.add("caroserie");
    if (filters.an_min || filters.an_max) keys.add("an");
    if (filters.pret_min || filters.pret_max) keys.add("pret");
    if (filters.km_min || filters.km_max) keys.add("km");
    return keys;
  }, [filters]);

  useEffect(() => {
    const newlyActivatedKeys: string[] = [];
    currentActiveKeys.forEach((key) => {
      if (!prevActiveKeysRef.current.has(key)) {
        newlyActivatedKeys.push(key);
      }
    });

    if (newlyActivatedKeys.length > 0) {
      setOpenItems((prev) => {
        const next = new Set(prev);
        newlyActivatedKeys.forEach((k) => next.add(k));
        return Array.from(next);
      });
    }

    prevActiveKeysRef.current = currentActiveKeys;
  }, [currentActiveKeys]);

  const toggleAccordion = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleOption = (facetKey: keyof FilterState, val: string) => {
    const currentList = (filters[facetKey] as string[]) || [];
    const normVal = normalizeText(val);
    const exists = currentList.some((v) => normalizeText(v) === normVal);
    const updatedList = exists
      ? currentList.filter((v) => normalizeText(v) !== normVal)
      : [...currentList, val];

    onFilterChange({
      ...filters,
      [facetKey]: updatedList,
    });
  };

  return (
    <div className="space-y-3 font-body">
      {/* 1. Marca */}
      {facets.marcaOptions.length > 0 && facets.marcaCoverage >= MIN_FACET_COVERAGE && (
        <div className="border-b border-navy-100 pb-3">
          <button
            type="button"
            onClick={() => toggleAccordion("marca")}
            className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
          >
            <span>Marcă</span>
            {openItems.includes("marca") ? (
              <ChevronUp className="w-4 h-4 text-navy-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-navy-400" />
            )}
          </button>
          {openItems.includes("marca") && (
            <div className="pt-2">
              <FacetOptionList
                options={facets.marcaOptions}
                selectedValues={filters.marca}
                onToggle={(val) => handleToggleOption("marca", val)}
              />
            </div>
          )}
        </div>
      )}

      {/* 2. Model */}
      {facets.modelOptions.length > 0 && facets.modelCoverage >= MIN_FACET_COVERAGE && (
        <div className="border-b border-navy-100 pb-3">
          <button
            type="button"
            onClick={() => toggleAccordion("model")}
            className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
          >
            <span>Model</span>
            {openItems.includes("model") ? (
              <ChevronUp className="w-4 h-4 text-navy-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-navy-400" />
            )}
          </button>
          {openItems.includes("model") && (
            <div className="pt-2">
              <FacetOptionList
                options={facets.modelOptions}
                selectedValues={filters.model}
                onToggle={(val) => handleToggleOption("model", val)}
              />
            </div>
          )}
        </div>
      )}

      {/* 3. Combustibil */}
      {facets.fuelOptions.length > 0 && facets.fuelCoverage >= MIN_FACET_COVERAGE && (
        <div className="border-b border-navy-100 pb-3">
          <button
            type="button"
            onClick={() => toggleAccordion("combustibil")}
            className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
          >
            <span>Combustibil</span>
            {openItems.includes("combustibil") ? (
              <ChevronUp className="w-4 h-4 text-navy-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-navy-400" />
            )}
          </button>
          {openItems.includes("combustibil") && (
            <div className="pt-2">
              <FacetOptionList
                options={facets.fuelOptions}
                selectedValues={filters.combustibil}
                onToggle={(val) => handleToggleOption("combustibil", val)}
              />
            </div>
          )}
        </div>
      )}

      {/* 4. Cutie de viteze */}
      {facets.gearboxOptions.length > 0 && facets.gearboxCoverage >= MIN_FACET_COVERAGE && (
        <div className="border-b border-navy-100 pb-3">
          <button
            type="button"
            onClick={() => toggleAccordion("cutie")}
            className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
          >
            <span>Cutie de viteze</span>
            {openItems.includes("cutie") ? (
              <ChevronUp className="w-4 h-4 text-navy-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-navy-400" />
            )}
          </button>
          {openItems.includes("cutie") && (
            <div className="pt-2">
              <FacetOptionList
                options={facets.gearboxOptions}
                selectedValues={filters.cutie}
                onToggle={(val) => handleToggleOption("cutie", val)}
              />
            </div>
          )}
        </div>
      )}

      {/* 5. Caroserie */}
      {facets.bodyOptions.length > 0 && facets.bodyCoverage >= MIN_FACET_COVERAGE && (
        <div className="border-b border-navy-100 pb-3">
          <button
            type="button"
            onClick={() => toggleAccordion("caroserie")}
            className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
          >
            <span>Caroserie</span>
            {openItems.includes("caroserie") ? (
              <ChevronUp className="w-4 h-4 text-navy-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-navy-400" />
            )}
          </button>
          {openItems.includes("caroserie") && (
            <div className="pt-2">
              <FacetOptionList
                options={facets.bodyOptions}
                selectedValues={filters.caroserie}
                onToggle={(val) => handleToggleOption("caroserie", val)}
              />
            </div>
          )}
        </div>
      )}

      {/* 6. An Range */}
      <div className="border-b border-navy-100 pb-3">
        <button
          type="button"
          onClick={() => toggleAccordion("an")}
          className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
        >
          <span>An fabricație</span>
          {openItems.includes("an") ? (
            <ChevronUp className="w-4 h-4 text-navy-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-navy-400" />
          )}
        </button>
        {openItems.includes("an") && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            <input
              type="number"
              placeholder={`Min ${facets.yearBounds ? `(${facets.yearBounds.min})` : ""}`}
              value={filters.an_min}
              onChange={(e) => onFilterChange({ ...filters, an_min: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-navy-200 rounded-lg text-navy-800 outline-none focus:border-mauve-500 min-h-[44px]"
            />
            <input
              type="number"
              placeholder={`Max ${facets.yearBounds ? `(${facets.yearBounds.max})` : ""}`}
              value={filters.an_max}
              onChange={(e) => onFilterChange({ ...filters, an_max: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-navy-200 rounded-lg text-navy-800 outline-none focus:border-mauve-500 min-h-[44px]"
            />
          </div>
        )}
      </div>

      {/* 7. Preț Range */}
      <div className="border-b border-navy-100 pb-3">
        <button
          type="button"
          onClick={() => toggleAccordion("pret")}
          className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
        >
          <span>Preț (€)</span>
          {openItems.includes("pret") ? (
            <ChevronUp className="w-4 h-4 text-navy-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-navy-400" />
          )}
        </button>
        {openItems.includes("pret") && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            <input
              type="number"
              placeholder={`Min ${facets.priceBounds ? `(${facets.priceBounds.min}€)` : ""}`}
              value={filters.pret_min}
              onChange={(e) => onFilterChange({ ...filters, pret_min: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-navy-200 rounded-lg text-navy-800 outline-none focus:border-mauve-500 min-h-[44px]"
            />
            <input
              type="number"
              placeholder={`Max ${facets.priceBounds ? `(${facets.priceBounds.max}€)` : ""}`}
              value={filters.pret_max}
              onChange={(e) => onFilterChange({ ...filters, pret_max: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-navy-200 rounded-lg text-navy-800 outline-none focus:border-mauve-500 min-h-[44px]"
            />
          </div>
        )}
      </div>

      {/* 8. Kilometraj Range */}
      <div className="border-b border-navy-100 pb-3">
        <button
          type="button"
          onClick={() => toggleAccordion("km")}
          className="w-full flex items-center justify-between py-2 text-[11px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 text-left min-h-[44px]"
        >
          <span>Kilometraj</span>
          {openItems.includes("km") ? (
            <ChevronUp className="w-4 h-4 text-navy-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-navy-400" />
          )}
        </button>
        {openItems.includes("km") && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            <input
              type="number"
              placeholder={`Min ${facets.kmBounds ? `(${facets.kmBounds.min})` : ""}`}
              value={filters.km_min}
              onChange={(e) => onFilterChange({ ...filters, km_min: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-navy-200 rounded-lg text-navy-800 outline-none focus:border-mauve-500 min-h-[44px]"
            />
            <input
              type="number"
              placeholder={`Max ${facets.kmBounds ? `(${facets.kmBounds.max})` : ""}`}
              value={filters.km_max}
              onChange={(e) => onFilterChange({ ...filters, km_max: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-navy-200 rounded-lg text-navy-800 outline-none focus:border-mauve-500 min-h-[44px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Component 1: Desktop Filter Sidebar
export function DesktopFilterSidebar({
  facets,
  filters,
  onFilterChange,
}: {
  facets: ReturnType<typeof useStockFacets>;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}) {
  const hasActive =
    filters.marca.length > 0 ||
    filters.model.length > 0 ||
    filters.combustibil.length > 0 ||
    filters.cutie.length > 0 ||
    filters.caroserie.length > 0 ||
    filters.an_min ||
    filters.an_max ||
    filters.pret_min ||
    filters.pret_max ||
    filters.km_min ||
    filters.km_max ||
    filters.q;

  const clearAll = () => {
    onFilterChange({
      marca: [],
      model: [],
      combustibil: [],
      cutie: [],
      caroserie: [],
      an_min: "",
      an_max: "",
      pret_min: "",
      pret_max: "",
      km_min: "",
      km_max: "",
      q: "",
    });
  };

  return (
    <aside className="hidden lg:block lg:col-span-1">
      <div className="bg-white rounded-2xl p-6 border border-navy-100 shadow-sm sticky top-28">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-navy-100">
          <h2 className="font-display font-bold text-navy-900 text-lg flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-mauve-600" />
            Filtrează
          </h2>
          {hasActive && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-body text-red-500 hover:text-red-700 flex items-center gap-1 min-h-[36px]"
            >
              <RotateCcw className="w-3 h-3" />
              Resetează
            </button>
          )}
        </div>

        <FacetsAccordionContent
          facets={facets}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>
    </aside>
  );
}

// Component 2: Main Top Controls & Active Filter Pills Bar
export function StockFiltersTopBar({
  facets,
  filters,
  onFilterChange,
  onOpenMobile,
}: {
  facets: ReturnType<typeof useStockFacets>;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onOpenMobile: () => void;
}) {
  const hasActiveFilters =
    (filters.marca.length > 0 && facets.marcaCoverage >= MIN_FACET_COVERAGE) ||
    (filters.model.length > 0 && facets.modelCoverage >= MIN_FACET_COVERAGE) ||
    (filters.combustibil.length > 0 && facets.fuelCoverage >= MIN_FACET_COVERAGE) ||
    (filters.cutie.length > 0 && facets.gearboxCoverage >= MIN_FACET_COVERAGE) ||
    (filters.caroserie.length > 0 && facets.bodyCoverage >= MIN_FACET_COVERAGE) ||
    Boolean(filters.an_min || filters.an_max) ||
    Boolean(filters.pret_min || filters.pret_max) ||
    Boolean(filters.km_min || filters.km_max) ||
    Boolean(filters.q.trim());

  const clearAllFilters = () => {
    onFilterChange({
      marca: [],
      model: [],
      combustibil: [],
      cutie: [],
      caroserie: [],
      an_min: "",
      an_max: "",
      pret_min: "",
      pret_max: "",
      km_min: "",
      km_max: "",
      q: "",
    });
  };

  return (
    <div className="w-full mb-6 space-y-4">
      {/* Top Search Input & Mobile Trigger */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Caută model sau marcă..."
            value={filters.q}
            onChange={(e) => onFilterChange({ ...filters, q: e.target.value })}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-navy-200 bg-white text-sm font-body text-navy-800 outline-none focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 shadow-sm transition-all"
          />
          {filters.q && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, q: "" })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700 min-w-[24px] min-h-[24px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-navy-800 text-white rounded-full px-6 py-3 font-display font-semibold hover:bg-navy-700 shadow-sm min-h-[44px]"
        >
          <SlidersHorizontal size={18} />
          <span>Filtrează</span>
        </button>
      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {facets.marcaCoverage >= MIN_FACET_COVERAGE &&
            filters.marca.map((m) => (
              <span
                key={`marca-${m}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0"
              >
                Marcă: {m}
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      marca: filters.marca.filter((item) => item !== m),
                    })
                  }
                  className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                  aria-label={`Șterge marca ${m}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

          {facets.modelCoverage >= MIN_FACET_COVERAGE &&
            filters.model.map((m) => (
              <span
                key={`model-${m}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0"
              >
                Model: {m}
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      model: filters.model.filter((item) => item !== m),
                    })
                  }
                  className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                  aria-label={`Șterge modelul ${m}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

          {facets.fuelCoverage >= MIN_FACET_COVERAGE &&
            filters.combustibil.map((c) => (
              <span
                key={`combustibil-${c}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0"
              >
                Combustibil: {c}
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      combustibil: filters.combustibil.filter((item) => item !== c),
                    })
                  }
                  className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                  aria-label={`Șterge combustibil ${c}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

          {facets.gearboxCoverage >= MIN_FACET_COVERAGE &&
            filters.cutie.map((g) => (
              <span
                key={`cutie-${g}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0"
              >
                Cutie: {g}
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      cutie: filters.cutie.filter((item) => item !== g),
                    })
                  }
                  className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                  aria-label={`Șterge cutie de viteze ${g}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

          {facets.bodyCoverage >= MIN_FACET_COVERAGE &&
            filters.caroserie.map((b) => (
              <span
                key={`caroserie-${b}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0"
              >
                Caroserie: {b}
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      caroserie: filters.caroserie.filter((item) => item !== b),
                    })
                  }
                  className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                  aria-label={`Șterge caroserie ${b}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

          {(filters.an_min || filters.an_max) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0">
              An: {filters.an_min || "Min"} - {filters.an_max || "Max"}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, an_min: "", an_max: "" })}
                className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                aria-label="Șterge filtru an"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.pret_min || filters.pret_max) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0">
              Preț: {filters.pret_min ? `${filters.pret_min} €` : "Min"} - {filters.pret_max ? `${filters.pret_max} €` : "Max"}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, pret_min: "", pret_max: "" })}
                className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                aria-label="Șterge filtru preț"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.km_min || filters.km_max) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs shrink-0">
              KM: {filters.km_min || "Min"} - {filters.km_max || "Max"}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, km_min: "", km_max: "" })}
                className="hover:text-mauve-600 min-w-[20px] min-h-[20px] flex items-center justify-center"
                aria-label="Șterge filtru kilometraj"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-body font-semibold text-mauve-600 hover:underline px-2 py-1 min-h-[44px] flex items-center shrink-0"
          >
            Șterge tot
          </button>
        </div>
      )}
    </div>
  );
}

// Component 3: Mobile Filter Panel
export function MobileFilterPanel({
  isOpen,
  onClose,
  facets,
  filters,
  onFilterChange,
  filteredCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  facets: ReturnType<typeof useStockFacets>;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  filteredCount: number;
}) {
  if (!isOpen) return null;

  const clearAll = () => {
    onFilterChange({
      marca: [],
      model: [],
      combustibil: [],
      cutie: [],
      caroserie: [],
      an_min: "",
      an_max: "",
      pret_min: "",
      pret_max: "",
      km_min: "",
      km_max: "",
      q: "",
    });
  };

  return (
    <div className="fixed inset-0 z-[100] lg:hidden flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-navy-100">
        <h2 className="font-display font-bold text-navy-900 text-xl flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-mauve-600" />
          Filtrează
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center text-navy-600 hover:bg-navy-100 min-h-[44px]"
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <FacetsAccordionContent
          facets={facets}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Sticky Footer */}
      <div className="p-5 border-t border-navy-100 bg-white flex items-center gap-4">
        <button
          type="button"
          onClick={clearAll}
          className="w-1/3 py-3 rounded-full border border-navy-200 text-navy-700 font-display text-sm font-semibold hover:bg-navy-50 min-h-[44px]"
        >
          Resetează
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-2/3 py-3 rounded-full bg-navy-800 text-white font-display text-sm font-semibold hover:bg-navy-700 min-h-[44px]"
        >
          Vezi {filteredCount} mașini
        </button>
      </div>
    </div>
  );
}
