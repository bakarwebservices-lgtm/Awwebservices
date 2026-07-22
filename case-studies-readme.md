# Case Study Pages — Build Brief

This document contains content and structure for four project case study pages to be built on awweb.online. Each project gets its own page under a shared template. Build all four using the same component/layout structure so they feel like one system, not four separate designs.

---

## Shared Page Template

Every case study page follows this section order:

1. **Hero** — Project name, one line positioning statement, hero image/mockup, 2-3 stat chips
2. **The Problem** — Short, business focused framing of the client's situation before the build
3. **The System We Built** — 3-4 feature blocks. Each block has a bolded outcome-first headline, a short description, and a smaller muted-text technical detail line underneath
4. **The Result** — Concrete outcome statement, before/after framing
5. **Built With** — Row of tech stack badges
6. **CTA** — "Want a system like this built for your business?" with link to contact/intake

Routing suggestion: `/work/vortex-rings`, `/work/attireburg`, `/work/zn-enterprises`, `/work/css-kro`, all linked from a `/work` index grid.

---

## 1. Vortex Rings

**Tagline:** A complete order to profit system for a COD wearable tech brand.

**Status:** Live

**Stack:** Next.js, Node.js, PostgreSQL, PostEx API, Vercel

### The Problem
Vortex Rings sells wearable tech across Pakistan on a cash on delivery model. Before this system, order tracking, shipping costs, and profit calculations lived in disconnected spreadsheets. There was no way to know true profitability on a given day without hours of manual reconciliation. Orders placed outside the normal flow had no place to live at all.

### The System We Built

**Unified Admin Portal**
Every order, whether placed through the storefront or handled manually, lives in one system. Staff manage inventory, order status, and customer data from a single dashboard instead of juggling spreadsheets and courier portals separately.
*Custom admin layer on Next.js and PostgreSQL, with role based access control.*

**PostEx Auto Sync Bridge**
Shipping and fulfillment costs used to be entered by hand after checking the courier portal. An automated bridge pulls fulfillment cost data directly from PostEx and syncs it against each order, keeping the internal database as the single source of truth.
*Scheduled sync job, decoupled from the courier's own data model so the business isn't locked to PostEx's structure.*

**Real Time P&L Engine**
Profit and loss used to be a monthly exercise. It now updates as orders move through the pipeline, accounting for product cost, shipping, and returns automatically.
*Calculation logic accounts for COD specific realities like return rates and partial fulfillment.*

**Manual Order Entry for Off System Sales**
Not every sale happens through the storefront. A manual entry flow folds P2P and off platform deals into the same inventory and accounting system instead of leaving them untracked.

### The Result
Vortex Rings went from reconciling profit once a month to seeing it update in real time, with shipping costs, returns, and manual sales all accounted for in one place.

### Built With
Next.js · Node.js · PostgreSQL · PostEx API · Vercel

---

## 2. Attireburg

**Tagline:** A fully owned e-commerce platform for a German apparel brand, built without platform lock-in.

**Status:** Live

**Stack:** Next.js, Supabase, Vercel, PayPal API

### The Problem
Attireburg needed an online store, but the client wanted to actually own their infrastructure rather than rent it through a platform like Shopify. Platform fees, limited customisation, and no real ownership of the data or codebase were the core concerns going in.

### The System We Built

**Fully Custom Storefront**
A complete e-commerce frontend and backend built from the ground up rather than assembled from a platform's theme system, giving full control over UX, performance, and future changes.
*Built on Next.js with a Supabase backend, deployed on Vercel.*

**Direct Infrastructure Ownership**
Every piece of infrastructure, the database, the code repository, and the hosting, is handed directly to the client. No dependency on a third party platform, no recurring platform fees.
*Ownership transfer covers Supabase project, GitHub repository, and Vercel deployment access.*

**Integrated Payment Processing**
Card payments through PayPal are built directly into checkout rather than redirecting customers off site, keeping the buying experience seamless for a European customer base.
*PayPal integration handling live transactions with proper sandbox to production credential separation.*

**Efficient Media Handling**
Product imagery and assets are managed within Supabase storage, with attention paid to staying within efficient limits as the catalog grows.

### The Result
Attireburg operates on infrastructure it fully owns, with no platform fees and no vendor lock-in, while running a checkout experience built specifically around its market and customers.

### Built With
Next.js · Supabase · Vercel · PayPal API

---

## 3. ZN Enterprises

**Tagline:** An AI assisted bill of quantities generator for an interior design firm.

**Status:** In development, not currently live

**Stack:** (confirm current stack before publishing — likely Next.js, AI API integration)

### The Problem
ZN Enterprises, an interior design firm, needed a faster way to generate bills of quantities (BOQs) for client projects. Manually itemizing materials, quantities, and costs for every project was slow and inconsistent between team members.

### The System We Built

**AI Powered BOQ Generation**
Instead of manually building cost breakdowns from scratch for every project, the system generates structured bills of quantities using AI, cutting down the time needed to produce accurate estimates.
*AI integration generating structured, itemized output from project inputs.*

**Client Requirements Intake**
A structured intake process captures project requirements up front, feeding directly into the estimation and BOQ process rather than being handled over email and calls.

### The Result
A faster, more consistent path from client requirements to a usable bill of quantities. *(Note: since this project is not currently live, keep result framing focused on the build itself rather than live operational metrics. Consider labeling this case study "Case Study" rather than implying an active, running product.)*

### Built With
*(confirm exact stack before publishing)*

---

## 4. CSS KRO

**Tagline:** A centralized prep platform for Pakistan's CSS exam aspirants.

**Status:** Live — csskro.com

**Stack:** (confirm — appears to be a standard web stack with AI integration for essay scoring)

### The Problem
CSS exam aspirants in Pakistan had to piece together prep material from scattered sources, newspapers, old past papers, essay feedback, with no single place to study from or get consistent feedback on their writing.

### The System We Built

**Curated Daily Newspaper Summaries**
Daily summaries pulled from major papers (Dawn, The News, Express Tribune) give students exam relevant current affairs content without needing to read multiple full papers themselves.

**Past Papers Archive**
A searchable archive of past CSS papers going back to 2000, replacing scattered PDFs and forum posts with one organized resource.

**AI Essay Checker**
Students submit essays and receive a score out of 100 along with structural, CSS-examiner-style feedback, giving them a way to practice and improve without waiting on a human reviewer.
*AI integration scoring against exam-specific structural criteria rather than generic writing feedback.*

### The Result
A single platform replacing what used to require piecing together newspapers, forums, and disconnected past paper sources, with automated essay feedback available on demand.

### Built With
*(confirm exact stack before publishing)*

---

## Notes for Build

- Keep visual language consistent across all four pages: same hero layout, same feature block styling, same CTA placement.
- Stat chips in the hero for each project should be pulled from real numbers where available (e.g. papers archived, years covered) rather than left generic.
- ZN Enterprises should not use present-tense "operates" or "currently processes" language anywhere, since it is not live. Frame everything as a completed build.
- Confirm exact tech stacks for ZN Enterprises and CSS KRO before publishing, marked above as unconfirmed.
- Each page needs one real screenshot or mockup in the hero. Placeholder acceptable for ZN Enterprises given it is offline.
