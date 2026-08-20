export interface AttributeValue {
  id?: string;
  listingId?: string;
  attributeId?: string;
  stringValue: string | null;
  numberValue: number | null;
  booleanValue: boolean | null;
  attribute: {
    id?: string;
    name: string;
    type?: "STRING" | "NUMBER" | "BOOLEAN";
    attributeGroup?: { name: string } | null;
  };
}

export interface ListingImage {
  id?: string;
  url: string;
  order?: number;
}

export interface APIListing {
  id: string;
  title: string;
  description: string;
  price: number | null;
  createdAt: string;
  status?: 'AVAILABLE' | 'SOLD';
  attributeValues: AttributeValue[];
  images: ListingImage[];
}

export interface FilterState {
  marca: string[];
  model: string[];
  combustibil: string[];
  cutie: string[];
  caroserie: string[];
  an_min: string;
  an_max: string;
  pret_min: string;
  pret_max: string;
  km_min: string;
  km_max: string;
  q: string;
}

export const normalizeText = (text: string | null | undefined): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, " ");
};

/**
 * Gets an attribute value by attributeId (or candidate list of attributeIds) first,
 * then falls back to display name matching.
 * Numeric 0 and boolean false values are preserved.
 */
export function getAttributeValueById(
  listing: { attributeValues?: AttributeValue[] },
  attrIds: string | string[],
  fallbackNames: string[] = []
): string | number | boolean | null {
  if (!listing || !listing.attributeValues) return null;

  const idList = Array.isArray(attrIds) ? attrIds : [attrIds];

  // 1. Match by attributeId
  for (const attrId of idList) {
    if (!attrId) continue;
    const byId = listing.attributeValues.find(
      (av) => av.attributeId === attrId || av.attribute?.id === attrId
    );
    if (byId) {
      if (byId.stringValue !== null && byId.stringValue !== undefined) return byId.stringValue;
      if (byId.numberValue !== null && byId.numberValue !== undefined) return byId.numberValue;
      if (byId.booleanValue !== null && byId.booleanValue !== undefined) return byId.booleanValue;
    }
  }

  // 2. Fallback to name matching
  for (const name of fallbackNames) {
    const norm = normalizeText(name);
    const byName = listing.attributeValues.find(
      (av) => normalizeText(av.attribute?.name) === norm
    );
    if (byName) {
      if (byName.stringValue !== null && byName.stringValue !== undefined) return byName.stringValue;
      if (byName.numberValue !== null && byName.numberValue !== undefined) return byName.numberValue;
      if (byName.booleanValue !== null && byName.booleanValue !== undefined) return byName.booleanValue;
    }
  }

  return null;
}
