export interface ProjectSolutionItem {
  heading: string;
  text: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  client: string | null;
  status: string;
  liveUrl: string | null;
  tag: string | null;
  heroImage: string;
  screenshots: string[];
  builtWith: string[];
  location: string | null;
  body: {
    problem: string;
    solution: ProjectSolutionItem[];
    result: string;
    before: string | null;
    after: string | null;
  };
  updatedAt: string;
}

export const projects: ProjectItem[] = [
  {
    slug: "vortex-rings",
    title: "Vortex Rings — Real-Time COD Profit Engine",
    metaDescription: "Custom order-to-profit system for a Pakistani COD wearable tech brand with automated PostEx sync and real-time P&L tracking. Built with Next.js and PostgreSQL.",
    category: "Order & Profit Engine · PostEx API",
    client: "Vortex Rings (Wearable Tech)",
    status: "Live System",
    liveUrl: null,
    tag: null,
    heroImage: "/images/project-4.jpeg",
    screenshots: [
      "/images/vortexwearables/Screenshot 2026-07-18 121042.png",
      "/images/vortexwearables/Screenshot 2026-07-18 121149.png",
      "/images/vortexwearables/Screenshot 2026-07-18 121219.png",
      "/images/vortexwearables/Screenshot 2026-07-18 121243.png",
      "/images/vortexwearables/Screenshot 2026-07-18 121303.png"
    ],
    builtWith: ["Next.js", "Node.js", "PostgreSQL", "PostEx API", "Tailwind CSS"],
    location: "Pakistan (COD E-Commerce)",
    body: {
      problem: "Vortex Rings sells wearable tech across Pakistan on a cash-on-delivery model. Before this system, order tracking, shipping costs, and profit calculations lived in disconnected spreadsheets, with no way to know true daily profitability without hours of manual reconciliation.",
      solution: [
        {
          heading: "Unified Admin Portal",
          text: "Every order, whether placed through the storefront or handled manually, lives in one system. Built with a custom Next.js admin layer on PostgreSQL with role-based access control."
        },
        {
          heading: "PostEx Auto Sync Bridge",
          text: "An automated bridge pulls fulfillment cost data directly from PostEx and syncs it against each order, replacing manual courier-portal checks. Runs as a scheduled sync job, decoupled from PostEx's own data model."
        },
        {
          heading: "Real-Time P&L Engine",
          text: "Profit and loss updates as orders move through the pipeline, accounting for product cost, shipping, and returns automatically, including COD-specific realities like return rates and partial fulfillment."
        },
        {
          heading: "Manual Off-System Sale Entry",
          text: "A manual entry flow folds P2P and off-platform deals into the same inventory and accounting system, with a shippedViaPostex flag to keep courier-shipped and manually-shipped orders distinct."
        }
      ],
      result: "Vortex Rings went from reconciling profit once a month to seeing it update in real time, with shipping costs, returns, and manual sales all accounted for in one place.",
      before: "3+ Hours Daily Spreadsheet Reconciliation",
      after: "Real-Time Automated P&L Engine"
    },
    updatedAt: "2026-08-01"
  },
  {
    slug: "attireburg",
    title: "Attireburg — Fully Owned E-Commerce Platform",
    metaDescription: "Custom e-commerce platform for a German apparel brand built on Next.js and Supabase, with zero platform fees and full infrastructure ownership.",
    category: "E-Commerce · Custom Infrastructure",
    client: "Attireburg (German Apparel)",
    status: "Live Platform",
    liveUrl: null,
    tag: null,
    heroImage: "/images/project-3.jpeg",
    screenshots: [
      "/images/attireburg/Screenshot 2026-08-08 014800.png",
      "/images/attireburg/Screenshot 2026-08-08 015037.png",
      "/images/attireburg/Screenshot 2026-08-08 015227.png"
    ],
    builtWith: ["Next.js", "Supabase", "PayPal API", "Prisma", "TypeScript"],
    location: "Germany & EU",
    body: {
      problem: "Attireburg needed an online store but wanted to actually own their infrastructure rather than rent it through a platform like Shopify — platform fees, limited customization, and no real ownership of data or codebase were the core concerns.",
      solution: [
        {
          heading: "Fully Custom Storefront",
          text: "A complete e-commerce frontend and backend built from the ground up rather than assembled from a platform's theme system, built on Next.js with a Supabase backend (Frankfurt region)."
        },
        {
          heading: "Direct Infrastructure Ownership",
          text: "Every piece of infrastructure — database, code repository, hosting — is handed directly to the client. No dependency on a third-party platform, no recurring platform fees."
        },
        {
          heading: "Native Payment Processing",
          text: "Card payments through PayPal Hosted Fields are built directly into checkout rather than redirecting customers off-site, with Google OAuth layered onto a custom JWT auth system for account access."
        },
        {
          heading: "Security-Hardened",
          text: "Full OWASP Top 10 audit completed, closing IDOR vulnerabilities and unauthenticated routes discovered during review."
        }
      ],
      result: "Attireburg operates on infrastructure it fully owns, with no platform fees and no vendor lock-in, running a checkout experience built specifically for its European customer base.",
      before: "Platform Rent & Third-Party Fees",
      after: "100% Owned Infrastructure & $0 Platform Rent"
    },
    updatedAt: "2026-08-01"
  },
  {
    slug: "css-kro",
    title: "CSS Kro — AI-Powered Exam Prep Platform",
    metaDescription: "Centralized CSS exam prep platform for Pakistani aspirants with a 24-year past papers archive and instant AI essay scoring. Built with Next.js and OpenAI API.",
    category: "EdTech · AI Evaluation",
    client: "CSS Kro (EdTech)",
    status: "Live Platform",
    liveUrl: null,
    tag: null,
    heroImage: "/images/project-2.jpeg",
    screenshots: [
      "/images/css-kro/Screenshot 2026-08-08 015410.png",
      "/images/css-kro/Screenshot 2026-08-08 015424.png",
      "/images/css-kro/Screenshot 2026-08-08 015437.png",
      "/images/css-kro/Screenshot 2026-08-08 015539.png",
      "/images/css-kro/Screenshot 2026-08-08 015609.png"
    ],
    builtWith: ["Next.js", "Python", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    location: "Pakistan",
    body: {
      problem: "CSS exam aspirants in Pakistan had to piece together prep material from scattered sources — newspapers, old past papers, essay feedback — with no single place to study from or get consistent feedback on their writing.",
      solution: [
        {
          heading: "Curated Daily Newspaper Summaries",
          text: "Daily summaries pulled from major papers (Dawn, The News, Express Tribune) give students exam-relevant current affairs content without reading multiple full papers."
        },
        {
          heading: "Past Papers Archive",
          text: "A searchable archive of past CSS papers going back to 2000, with subject and year filtering, replacing scattered PDFs and forum posts."
        },
        {
          heading: "AI Essay Checker",
          text: "Students submit essays and receive a score out of 100 with structural, examiner-style feedback, scored against exam-specific structural criteria rather than generic writing feedback."
        }
      ],
      result: "A single platform replacing what used to require piecing together newspapers, forums, and disconnected past-paper sources, with automated essay feedback available on demand.",
      before: "Scattered Forums & Delayed Human Marking",
      after: "Centralized Hub & Instant Examiner AI Feedback"
    },
    updatedAt: "2026-08-01"
  },
  {
    slug: "zn-enterprises",
    title: "ZN Enterprises — AI-Powered BOQ Generator",
    metaDescription: "AI-assisted bill of quantities generator for an interior design firm, cutting estimation time with automated room-by-room material breakdowns.",
    category: "Interior Design · AI Automation",
    client: "ZN Enterprises (Interior Design)",
    status: "Completed Build",
    liveUrl: null,
    tag: null,
    heroImage: "/images/project-1.jpeg",
    screenshots: [
      "/images/zn-enterprises/Screenshot 2026-08-08 015936.png",
      "/images/zn-enterprises/Screenshot 2026-08-08 015955.png"
    ],
    builtWith: ["Next.js", "Node.js", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    location: "Pakistan",
    body: {
      problem: "ZN Enterprises needed a faster way to generate bills of quantities for client projects. Manually itemizing materials, quantities, and costs for every project was slow and inconsistent between team members.",
      solution: [
        {
          heading: "AI-Powered BOQ Generation",
          text: "The system generates structured bills of quantities using AI vision extraction from room specifications, cutting down time needed to produce accurate estimates."
        },
        {
          heading: "Client Requirements Intake",
          text: "A structured multi-step intake wizard captures space requirements, material tiers, and specifications up front, feeding directly into the estimation process."
        },
        {
          heading: "Material Catalog & Pricing Engine",
          text: "A centralized matrix for interior materials, unit pricing, and labor estimates with dynamic volume scaling, ensuring consistency across all generated proposals."
        }
      ],
      result: "A faster, more consistent path from client requirements to a usable bill of quantities with automated, room-by-room estimation.",
      before: "Days Spent Building Manual BOQ Spreadsheets",
      after: "Instant AI-Generated Itemized Cost Estimates"
    },
    updatedAt: "2026-08-01"
  },
  {
    slug: "ventura-auto",
    title: "Ventura Auto — Local Service Business Concept Site",
    metaDescription: "A concept website design for a local auto repair shop, featuring AI-generated animation sequences, service booking flow, and mobile-optimized design.",
    category: "Local Business · Service Booking",
    client: null,
    status: "Concept Project",
    liveUrl: null,
    tag: "Concept Project",
    heroImage: "/images/project-7.jpeg",
    screenshots: [
      "/images/ventura-autoshop/Screenshot 2026-08-08 011220.png",
      "/images/ventura-autoshop/Screenshot 2026-08-08 011308.png",
      "/images/ventura-autoshop/Screenshot 2026-08-08 011346.png",
      "/images/ventura-autoshop/Screenshot 2026-08-08 011415.png"
    ],
    builtWith: ["Next.js", "Google Flow (Imagen + Veo)", "Tailwind CSS"],
    location: null,
    body: {
      problem: "Many local service businesses (auto shops, repair services) have a Facebook page but no real website, losing potential customers who search on Google before calling.",
      solution: [
        {
          heading: "Custom Frame-Sequence Animation",
          text: "AI-generated hero animations built with Google Flow (Imagen + Veo/Omni Flash), optimized to WebP for a 92% size reduction versus raw video, keeping load times fast."
        },
        {
          heading: "Scroll-Stitched Services Page",
          text: "An animated services page with a mobile static-carousel fallback, covering 8 distinct service categories with individual sub-pages."
        },
        {
          heading: "Booking Flow",
          text: "An online appointment scheduling form with vehicle details, service selection, and preferred time slot, designed to convert a Google search into a booked appointment."
        }
      ],
      result: "A concept build demonstrating how a local service business can move from a Facebook-only presence to a full booking-capable website.",
      before: null,
      after: null
    },
    updatedAt: "2026-08-01"
  },
  {
    slug: "swanah",
    title: "SWANAH — Owned Luxury Fashion Storefront Concept",
    metaDescription: "A concept luxury fashion e-commerce storefront demonstrating a fully owned checkout flow with zero platform subscription fees.",
    category: "E-Commerce · Fashion",
    client: null,
    status: "Concept Project",
    liveUrl: null,
    tag: "Concept Project",
    heroImage: "/images/project-6.jpeg",
    screenshots: [
      "/images/swannah-clothing/Screenshot 2026-08-08 011042.png",
      "/images/swannah-clothing/Screenshot 2026-08-08 011113.png",
      "/images/swannah-clothing/Screenshot 2026-08-08 011136.png"
    ],
    builtWith: ["Next.js", "Tailwind CSS", "TypeScript"],
    location: null,
    body: {
      problem: "Fashion brands often default to Shopify and accept recurring platform fees and limited design control as the cost of doing business online.",
      solution: [
        {
          heading: "Full Storefront Build",
          text: "Shop, lookbook, cart, and checkout flow built from scratch rather than themed on a platform, including a size guide and returns flow."
        },
        {
          heading: "Editorial-Grade Presentation",
          text: "A lookbook and product presentation designed around luxury fashion visual standards, showing the design range possible outside a templated storefront."
        },
        {
          heading: "Owned Checkout Architecture",
          text: "A checkout flow built to demonstrate what a zero-monthly-subscription, fully owned alternative to Shopify actually looks like end to end."
        }
      ],
      result: "A concept build showing the same 'own your platform' architecture used in the Attireburg project, applied to a luxury fashion context.",
      before: null,
      after: null
    },
    updatedAt: "2026-08-01"
  },
  {
    slug: "gull-flowers",
    title: "Gull Flowers — Luxury Local Florist Concept Site",
    metaDescription: "A concept e-commerce website for a luxury florist, featuring curated collections, occasion-based ordering, and a bespoke consultation flow.",
    category: "Local Business · E-Commerce",
    client: null,
    status: "Concept Project",
    liveUrl: null,
    tag: "Concept Project",
    heroImage: "/images/project-5.jpeg",
    screenshots: [
      "/images/gull-flowers/Screenshot 2026-08-08 010905.png",
      "/images/gull-flowers/Screenshot 2026-08-08 010920.png",
      "/images/gull-flowers/Screenshot 2026-08-08 010955.png"
    ],
    builtWith: ["Next.js", "Tailwind CSS", "TypeScript"],
    location: null,
    body: {
      problem: "Local florists competing on quality and presentation need a storefront that reflects a premium positioning, not a generic template.",
      solution: [
        {
          heading: "Curated Collection Structure",
          text: "Signature and occasion-based collections (weddings, celebrations, corporate) each with their own pricing tier and presentation."
        },
        {
          heading: "Bespoke Consultation Flow",
          text: "A concierge-style booking path alongside standard ordering, reflecting how premium local businesses often mix self-serve and white-glove service."
        },
        {
          heading: "Occasion-Based Navigation",
          text: "Structured browsing by occasion (birthdays, anniversaries, weddings, sympathy) rather than just by product type, matching how customers actually search for flowers."
        }
      ],
      result: "A concept build demonstrating premium local e-commerce design for a service-based, occasion-driven business.",
      before: null,
      after: null
    },
    updatedAt: "2026-08-01"
  }
];
