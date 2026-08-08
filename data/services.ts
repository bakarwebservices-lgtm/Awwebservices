export interface ServiceItem {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  longTailKeywords: string[];
  heading: string;
  intro: string;
  whatWeHandle: string[];
  whyItMatters: string;
  cta?: string;
  updatedAt: string;
}

export const services: ServiceItem[] = [
  {
    slug: "e-commerce",
    title: "Custom E-Commerce Development",
    metaDescription: "Custom e-commerce platforms built for Pakistani COD brands and international stores. Own your infrastructure instead of renting it through Shopify.",
    primaryKeyword: "custom e-commerce development",
    longTailKeywords: [
      "COD e-commerce website development",
      "cash on delivery website development Pakistan",
      "PostEx courier integration developer",
      "custom e-commerce platform vs Shopify",
      "own your e-commerce platform no monthly fees"
    ],
    heading: "E-commerce built to be owned, not rented",
    intro: "Most e-commerce platforms charge a monthly fee for the rest of your business's life and cap what you can actually build. We build custom storefronts, admin systems, and order pipelines you fully own, from the database to the codebase to the hosting.",
    whatWeHandle: [
      "Custom storefront design and checkout flow, built for your market rather than a generic theme",
      "Payment integration: PayPal, Stripe, local gateways, or cash-on-delivery workflows",
      "Courier and fulfillment integration (PostEx and similar) with automated cost syncing",
      "Admin dashboards for inventory, orders, and staff access, built around how your team actually works",
      "Real-time profit and loss tracking instead of monthly spreadsheet reconciliation",
      "Full infrastructure handoff: database, repository, and hosting access are yours, not locked to us"
    ],
    whyItMatters: "A platform like Shopify takes a percentage of every sale and limits what you can customize. For COD brands specifically, most platforms weren't built with cash-on-delivery, return rates, or courier reconciliation in mind, so businesses end up bolting on spreadsheets anyway. We build the courier sync and profit tracking into the system from day one.",
    updatedAt: "2026-08-01"
  },
  {
    slug: "business-automation",
    title: "Business Automation & Workflow Systems",
    metaDescription: "Custom workflow automation replacing manual spreadsheets and disconnected tools with real-time systems for order tracking, reporting, and operations.",
    primaryKeyword: "business workflow automation",
    longTailKeywords: [
      "custom business automation solutions",
      "automate order management system",
      "real-time profit and loss dashboard",
      "automated invoice and shipping sync"
    ],
    heading: "Replace the spreadsheets with a system that updates itself",
    intro: "Most growing businesses hit a point where spreadsheets and manual reconciliation can't keep up. We build custom automation that connects the tools you already use so data moves on its own instead of someone re-entering it every day.",
    whatWeHandle: [
      "Order-to-profit systems that calculate margins automatically as orders move through your pipeline",
      "Courier and shipping cost syncing, pulled directly from provider APIs instead of manual entry",
      "Custom admin dashboards that give a single source of truth across sales, inventory, and fulfillment",
      "Workflow automation between your existing tools (CRM, accounting, communication platforms)",
      "Automated reporting so daily or weekly numbers are ready without someone compiling them by hand"
    ],
    whyItMatters: "Off-the-shelf automation tools solve generic problems. Most real businesses have workflows specific enough that a generic tool needs constant workarounds. We build automation around how your business actually operates, not around a template that assumes you're identical to every other client.",
    updatedAt: "2026-08-01"
  },
  {
    slug: "website-design",
    title: "Custom Website Design & Development",
    metaDescription: "Custom-built, fast-loading websites for local businesses and growing brands. If you have a Facebook page but no website, this is where you start.",
    primaryKeyword: "custom website design",
    longTailKeywords: [
      "business website development",
      "Next.js website developer",
      "website for local business no online presence"
    ],
    heading: "If your business only has a Facebook page, you're losing customers to Google",
    intro: "A lot of businesses run entirely on a Facebook page and word of mouth. That works until someone searches for you on Google and finds nothing, or finds a competitor instead. We build fast, custom websites that give a business an actual presence people can find and trust.",
    whatWeHandle: [
      "Custom design built around your business, not a recycled template",
      "Mobile-first, fast-loading pages (most visitors are on their phone, and slow sites lose them before they read anything)",
      "Built on modern infrastructure (Next.js, Vercel) rather than page builders that slow down as content grows",
      "Booking, quote, or contact forms built directly into the site so visitors can act immediately",
      "SEO structure from day one, so the site is actually findable, not just online"
    ],
    whyItMatters: "A website isn't a formality, it's usually the first real interaction a potential customer has with a business before they call or visit. A slow, generic, or missing website costs more in lost customers than most businesses realize.",
    updatedAt: "2026-08-01"
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Meta Ads Management",
    metaDescription: "Meta ads management and lead funnels for local and D2C businesses, including WhatsApp qualification flows and AI-generated ad creative.",
    primaryKeyword: "Meta ads management",
    longTailKeywords: [
      "Facebook ads agency",
      "WhatsApp lead funnel setup",
      "Meta ads for interior design business",
      "lead generation for local business"
    ],
    heading: "Ads that lead somewhere, not just clicks that disappear",
    intro: "Running ads without a clear path from click to customer just spends money. We build the full funnel: the ad creative, the landing experience, and the qualification flow (often through WhatsApp, since that's where most conversations actually happen) so leads don't fall through the gaps.",
    whatWeHandle: [
      "Meta (Facebook and Instagram) ad campaign setup and management",
      "WhatsApp-based lead qualification templates so inbound interest gets sorted automatically",
      "AI-generated video walkthroughs and ad creative for product or project showcases",
      "Landing pages built specifically to convert ad traffic, not a generic homepage",
      "Pixel and conversion tracking set up correctly from the start, so ad spend decisions are based on real data"
    ],
    whyItMatters: "A lot of ad spend gets wasted because the funnel breaks somewhere after the click, no clear next step, no fast follow-up, no qualification. We build the ad and everything after it as one connected system.",
    updatedAt: "2026-08-01"
  },
  {
    slug: "virtual-assistance",
    title: "Virtual Assistance & Admin Support",
    metaDescription: "Remote admin and operations support for growing businesses, covering email management, scheduling, data entry, and day-to-day coordination.",
    primaryKeyword: "virtual assistant services",
    longTailKeywords: [
      "business admin support outsourcing",
      "email and calendar management outsourcing",
      "remote admin support for small business"
    ],
    heading: "Free up your time from the admin work that eats it",
    intro: "Growing businesses spend real hours on email, scheduling, and coordination that don't need the owner or founder doing them directly. We provide reliable admin support so that time goes back into the work that actually grows the business.",
    whatWeHandle: [
      "Email and calendar management",
      "Customer service support and inbox triage",
      "Data entry and record organization",
      "Social media scheduling and basic management",
      "Project coordination and follow-up so things don't fall through the cracks"
    ],
    whyItMatters: "Admin work is necessary but rarely the best use of a founder's time. Offloading it consistently, rather than in occasional bursts, is what actually gives that time back.",
    cta: "Get in touch to discuss ongoing support",
    updatedAt: "2026-08-01"
  }
];
