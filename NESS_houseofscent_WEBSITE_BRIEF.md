# NESS ATELIER — WEBSITE BRIEF FOR CLAUDE CODE

## 1. Project
Build a premium e-commerce website for **Ness Atelier**, a contemporary fragrance house.

**Brand positioning:** Accessible / contemporary luxury. The target customer is not necessarily a Tom Ford/Byredo-level luxury buyer; think customers who already shop brands such as Zara, Westside, Victoria's Secret, Bath & Body Works and other premium-accessible beauty/fragrance brands, but want something more refined and distinctive.

**Core idea:** Ness Atelier is a **House of Scents** — fragrance is the center of the brand.

Current launch focus is **Fine Fragrance only**. Do NOT build bath, body, hair, home, laundry, etc. into the main shopping catalog yet.

---

## 2. Brand identity

### Brand name
**NESS ATELIER**

### Tagline
**A HOUSE OF SCENTS**

### Monogram
The swirl symbol is an **abstract N for Ness**. It is NOT intended to be an infinity symbol or generic decorative flourish.

Use the provided monogram assets from the `ness` folder.

### Visual personality
- Soft quiet luxury
- Elegant
- Sensual
- Contemporary
- Warm
- Editorial
- Refined but approachable
- Not flashy or tacky
- Not an imitation of high-end designer fragrance brands

### Color direction
Use the supplied brand assets as the visual source of truth. The current palette is approximately:
- Black
- White
- Warm ivory / cream
- Deep burgundy
- Chocolate / espresso brown
- Dark red-burgundy

Do not introduce a large unrelated color palette.

### Typography direction
Elegant high-contrast serif typography for the main brand/hero moments, paired with a clean understated sans-serif where needed for UI/body copy.

The exact fonts can be selected by Claude Code based on the assets, but the result should feel editorial and luxury rather than corporate.

---

## 3. Existing assets

There is already a folder named:

`ness/`

It contains the PNG assets/designs created for the brand.

**IMPORTANT:**
Before designing the site, inspect every relevant PNG in the `ness` folder.

Use the supplied assets wherever appropriate. Do not redraw, replace, recolor, or invent a different logo/monogram unless necessary for technical reasons.

The monogram should be treated as a major recurring brand element.

If an asset's purpose is unclear, inspect it visually and choose the most appropriate use.

---

## 4. Product direction

Fine Fragrance is the first category.

The planned product formats are:

- Eau de Parfum (EDP) — primary/core product
- Eau de Toilette (EDT)
- Parfum / Extrait
- Body Mist
- Hair Mist
- Perfume Oils
- Roll-on Perfumes
- Solid Perfumes
- Discovery Sets
- Travel-size Perfumes
- Layering Fragrances
- Custom / Bespoke Perfumes

### Launch strategy
Do NOT assume all formats are available immediately.

The website should be structured so products can be added later without redesigning the entire site.

For the initial catalog, prioritize:
- EDP
- Travel-size fragrance
- Discovery sets
- Body mist
- Perfume oil

Other formats can appear as **Coming Soon** only if visually useful, but do not pretend they are available for purchase.

---

## 5. Fragrance collection

The first fragrance collection is still being finalized.

Potential fragrance directions currently being explored include:

1. Pear / Peony / White Musk — clean, fresh, pretty
2. Fig / Neroli / Sandalwood — skin-like, effortless, unisex
3. Tobacco / Vanilla / Tonka — warm, creamy, addictive
4. Cherry / Rose / Amber — sensual, evening
5. Pistachio / Almond / Caramel / Vanilla — sophisticated gourmand
6. Jasmine / Tuberose / Sandalwood — elegant floral
7. Saffron / Rose / Oud / Amber — dark, rich
8. Tea / Cedar / Vetiver / Musk — quiet luxury, woody/unisex

**IMPORTANT:** These are concept directions, NOT finalized formulas, product names, prices, or launch claims.

Do not invent final fragrance names, ingredients, prices, availability, reviews, or performance claims.

Use placeholder product data where necessary so it can easily be replaced later.

---

## 6. Website goals

The website should make a visitor feel:

> "This feels luxurious, but I can actually see myself buying from here."

It should communicate:
- Fragrance artistry
- Desire
- Discovery
- Layering
- Personal expression
- Contemporary luxury
- Strong visual identity

The site should NOT feel like:
- A generic Shopify template
- A cheap perfume website
- An overly feminine pink beauty site
- A dark/gold "fake luxury" website
- A cluttered marketplace

---

## 7. Suggested pages

### Home
Hero section with strong Ness Atelier visual identity.

Suggested flow:
1. Hero — Ness Atelier / A House of Scents
2. Featured fragrance / collection
3. Explore fragrances
4. Fragrance discovery / scent quiz concept
5. Layering concept
6. Brand story
7. Newsletter / final CTA
8. Footer

### Shop
Filters/categories for:
- Eau de Parfum
- Travel
- Discovery Sets
- Body Mist
- Perfume Oil
- Layering
- Coming Soon

### Product page
Include:
- Product imagery
- Product name
- Format
- Price placeholder
- Short description
- Fragrance notes
- Top / heart / base notes
- Scent family
- Intensity / mood if appropriate
- Size selector
- Add to bag
- Wishlist
- Layering suggestions
- Shipping/returns placeholder

### About / The House
Tell the story of Ness Atelier as a House of Scents.

### Discovery
A scent discovery experience / quiz can be added as a premium interactive feature.

### Layering
Explain how customers can combine Ness fragrances to create a personal scent.

### Bespoke / Atelier
This should be a future-facing page for custom fragrance creation. It should feel premium and editorial, not like a normal product listing.

---

## 8. UX / design requirements

- Desktop-first but fully responsive on mobile.
- Lots of whitespace.
- Strong typography.
- Large editorial imagery.
- Subtle animations only.
- Smooth scrolling and refined hover states.
- Product cards should feel premium and uncluttered.
- Avoid excessive rounded cards, gradients, glassmorphism, neon colors, or generic SaaS UI.
- Keep navigation simple.
- Make the monogram a recurring visual signature.
- Maintain excellent readability and accessibility.
- Buttons should be understated and elegant.

The website should feel like a **fragrance editorial + luxury e-commerce experience**.

---

## 9. Technical direction

Claude Code should first inspect the existing project/folder structure before changing anything.

If no existing website stack exists, choose a modern, maintainable stack appropriate for a premium e-commerce frontend.

Priorities:
- Clean component architecture
- Responsive design
- Reusable product data structure
- Easy future product additions
- Optimized image loading
- Good SEO foundations
- Accessible semantic HTML
- Fast performance

Do not create a backend/payment system unless explicitly requested.

For now, build the **frontend experience and product catalog structure** with mock/local product data.

---

## 10. Important instruction to Claude Code

Before writing the website:

1. Inspect the entire `ness` asset folder.
2. Identify what each PNG appears to be.
3. Inspect image dimensions/aspect ratios.
4. Identify the logo, monogram, palette, bottle/product visuals and other brand assets.
5. Use the existing assets as the visual foundation.
6. Do not replace the brand identity with a generic luxury template.
7. Keep product information modular so final fragrance names, notes, prices and images can be changed easily.
8. Build the first version as a polished frontend prototype, not a fully functioning store backend.
9. If something is not specified, make the least-assumptive design decision and keep it easy to change.

## Brand north star

**Ness Atelier is a House of Scents — contemporary, sensual and quietly luxurious, designed to make fragrance feel personal, expressive and attainable.**
