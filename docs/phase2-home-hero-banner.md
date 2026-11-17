# Phase 2 Step 2: Editorial Hero Banner

## Component

`components/home/hero-banner/HeroBanner.tsx` is a reusable, Home-compatible editorial banner integrated after the existing header and search entry point.

It uses the Phase 1 Deep Dark surface, white typography, muted supporting copy, and orange CTA accent. The campaign copy is:

- **STEP INTO YOUR STYLE**
- **Discover footwear made for every move.**
- **SHOP NOW**

The banner uses a minimum height, constrained headline width, and flexible vertical layout so the content remains readable across supported mobile widths.

## Image asset

The final campaign asset is `assets/images/home-hero-campaign.png`, a local 1200 × 900 px PNG (4:3). It is a generated premium footwear editorial image with a single dark neutral sneaker weighted to the right and negative space on the left for copy. It contains no text, logo, or remote dependency.

`HeroBanner` renders the asset with React Native `ImageBackground` and `resizeMode="cover"`. A restrained Deep Dark overlay (`bg-secondary/35`) keeps the white campaign copy readable while retaining the shoe detail.

## CTA and scope

The banner CTA opens the existing `routes.category('sneakers')` collection route. No new route, API, store, dependency, or business logic was introduced. Step 1 header/search behavior remains unchanged. Categories, product rails, lifestyle content, trending products, and new arrivals were not modified.

## Validation

Validation results are reported in the implementation handoff. Device/emulator testing was not available in this environment.
