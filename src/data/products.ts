// Types only — all content data now lives in Sanity CMS.

export type ProductImage = {
  asset: { _ref: string; _type: "reference" };
  alt?: string;
};

export type Product = {
  slug: string;
  name: string;
  originalName: string;
  category: string;
  description: string;
  shortDesc: string;
  ritual: string;
  notes: string[];
  accent: string;
  price: string;
  image: ProductImage;
};
