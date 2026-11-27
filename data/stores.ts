/**
 * Live work for real clients (stores and sites people buy from today) and the concept demos we build
 * for prospects. Keep the two lists apart: a concept never goes in `liveWork`.
 * Screenshots live in /public/images/work/<id>-desktop.webp and <id>-mobile.webp.
 */

export interface LiveItem {
  id: string;
  name: string;
  niche: string;
  /** One line, in our words, about what the store does well. */
  line: string;
  url: string;
  domain: string;
  kind: 'store' | 'site';
  country: string;
}

export const liveWork: LiveItem[] = [
  {
    id: 'baytak',
    name: 'Baytak Noor',
    niche: 'Bedding & home',
    line: 'Bed sheets by collection, size and fabric, with every COD order confirmed on WhatsApp.',
    url: 'https://www.baytaknoor.com',
    domain: 'baytaknoor.com',
    kind: 'store',
    country: 'Pakistan',
  },
  {
    id: 'moonvogue',
    name: 'The Moon Vogue',
    niche: "Women's fashion",
    line: 'Clothing, watches and jewellery in one editorial storefront.',
    url: 'https://www.themoonvogue.com',
    domain: 'themoonvogue.com',
    kind: 'store',
    country: 'Pakistan',
  },
  {
    id: 'hma',
    name: 'HMA Perfumes',
    niche: 'Fragrance',
    line: 'A dark, gold-lit perfume house with a concierge for picking a scent.',
    url: 'https://www.hmaperfumes.com',
    domain: 'hmaperfumes.com',
    kind: 'store',
    country: 'Pakistan',
  },
  {
    id: 'vortex',
    name: 'Vortex',
    niche: 'Smart rings & glasses',
    line: 'Wearable tech sold COD, with courier sync and live profit behind the scenes.',
    url: 'https://www.vortexwearables.com',
    domain: 'vortexwearables.com',
    kind: 'store',
    country: 'Pakistan',
  },
  {
    id: 'homegood',
    name: 'HomeGood',
    niche: 'Home essentials, dropshipping',
    line: 'A wide catalogue across kitchen, bath and home, dropshipped across Pakistan.',
    url: 'https://www.homegood.pk',
    domain: 'homegood.pk',
    kind: 'store',
    country: 'Pakistan',
  },
  {
    id: 'hairoil',
    name: 'Hair Oil',
    niche: 'Herbal hair care',
    line: 'A single-hero-product store built to sell one bottle, very well.',
    url: 'https://www.hairoil.online',
    domain: 'hairoil.online',
    kind: 'store',
    country: 'Pakistan',
  },
  {
    id: 'attireburg',
    name: 'Attireburg',
    niche: 'Apparel & print on demand',
    line: 'A German clothing brand on its own platform: PayPal checkout, EU compliance, no platform fees.',
    url: 'https://www.attireburg.de',
    domain: 'attireburg.de',
    kind: 'store',
    country: 'Germany',
  },
  {
    id: 'rehman',
    name: 'Rehman Corporation',
    niche: 'Greenhouse manufacturing',
    line: 'A company site built around one action: ask for a quote.',
    url: 'https://rehmancorporation.org',
    domain: 'rehmancorporation.org',
    kind: 'site',
    country: 'Pakistan',
  },
];

export interface ConceptItem {
  id: string;
  name: string;
  niche: string;
  url: string;
}

/** Free homepage mockups made for prospects. Concepts, not client work. */
export const concepts: ConceptItem[] = [
  { id: 'dawn', name: 'Dawn Store', niche: 'Oud & watches', url: 'https://dawnstore-pk.netlify.app' },
  { id: 'swannah', name: 'Swanah', niche: 'Luxury fashion', url: 'https://swannah.netlify.app' },
  { id: 'hairaura', name: 'Hair Aura', niche: 'Hair extensions', url: 'https://hair-aura.netlify.app' },
  { id: 'matchball', name: 'Matchball Co.', niche: 'Sports gear', url: 'https://matchball-01.netlify.app' },
  { id: 'gull', name: 'Gull Flowers', niche: 'Florist', url: 'https://gul-flowers.netlify.app' },
  { id: 'ventura', name: 'Ventura Auto', niche: 'Auto repair, Texas', url: 'https://ventura-auto.netlify.app' },
  { id: 'hvac1', name: 'Waco HVAC', niche: 'Heating & cooling', url: 'https://jazzy-stroopwafel-546ba5.netlify.app' },
  { id: 'hvac2', name: 'Reliable HVAC', niche: 'Heating & cooling', url: 'https://frolicking-youtiao-605e21.netlify.app' },
  { id: 'n8n', name: 'Workflow Pack', niche: 'Digital product', url: 'https://automation-workflows.netlify.app' },
  { id: 'arena', name: 'Champions Arena', niche: 'Slot booking', url: 'https://arena-booking-xi.vercel.app' },
];

/** What every store we build ships with. Sourced from the sales playbook; keep it true. */
export const storeFeatures = [
  { title: 'Every COD order confirmed on WhatsApp', text: 'The customer gets a message the moment they order. Fake orders drop before they ship.' },
  { title: 'Couriers booked from the admin', text: 'Book and track Pakistani couriers without opening another portal.' },
  { title: 'Run it from ChatGPT or Claude', text: 'Type “saare kurtay 15% off kar do” and it is done. Your store listens to plain words.' },
  { title: 'Real profit, not just sales', text: 'Product cost, delivery and returns counted against every order. (Add-on.)' },
  { title: 'Your store as a phone app', text: 'Installable on your phone, with an alert for every new order.' },
  { title: 'Design it yourself', text: 'A visual Storefront Studio for banners, sections and colours. No developer needed for small changes.' },
  { title: 'Everything a store needs', text: 'SEO, Meta pixel and catalogue feed, coupons, reviews, blog and staff roles.' },
  { title: 'Nothing is ever hard-deleted', text: 'Removed a product or order by mistake? It comes back.' },
];
