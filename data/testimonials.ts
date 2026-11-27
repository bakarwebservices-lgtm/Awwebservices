/**
 * Highlights are exact excerpts from each client's own note; never reword them.
 * Only named, real client notes. (Removed Nov 2026: unnamed "Team" quotes with star ratings and a second
 * CSS Kro quote credited to a different person — they could not be verified.)
 */
export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  highlight: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'css-kro',
    name: 'Sobaan Saeed',
    title: 'Founder & Lead Educator',
    company: 'CSS Kro',
    avatar: '/images/reviews/csskro.webp',
    highlight: 'He treated CSS Kro like his own company, proactively optimizing workflows long after launch.',
    quote:
      'When we conceptualized CSS Kro, we needed to centralize 24 years of competitive exam archives and introduce instant, examiner-grade AI essay evaluation. Abubakar immediately understood the FPSC grading criteria, studied examiner rubrics, and engineered a custom evaluation pipeline that delivers actionable critiques in seconds rather than weeks of manual marking. What sets Abubakar apart is his genuine ownership: he treated CSS Kro like his own company, proactively optimizing workflows long after launch. We achieved our goals because of his dedication, and we will definitely continue working with him and his team on all future developments.',
  },
  {
    id: 'zn-enterprises',
    name: 'Saad Zaffar',
    title: 'CEO & Founder',
    company: 'ZN Enterprises',
    avatar: '/images/reviews/zn-enterprises.jpeg',
    highlight: 'An intelligent BOQ engine that slashed our project estimation cycle from days to minutes.',
    quote:
      'In the interior design industry, generating comprehensive Bills of Quantities meant manually calculating dimensions, material tiers, and supplier markups across tedious spreadsheets. Abubakar personally immersed himself in our internal formulas and built an automated multi-step intake wizard with a dynamic room-by-room pricing matrix that eliminated errors completely. The speed, attention to detail, and transparent communication from Abubakar and his team made this the smoothest tech partnership we have ever had. We will definitely work with Abubakar and AW Web Services on all our upcoming projects.',
  },
];
