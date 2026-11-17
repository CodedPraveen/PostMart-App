# Phase 2 Step 2: Editorial Hero Banner

## Component

`components/home/hero-banner/HeroBanner.tsx` is a reusable, Home-compatible editorial banner integrated after the existing header and search entry point.

It uses the Phase 1 Deep Dark surface, white typography, muted supporting copy, and orange CTA accent. The campaign copy is:

- **STEP INTO YOUR STYLE**
- **Discover footwear made for every move.**
- **SHOP NOW**

The banner uses a minimum height, constrained headline width, and flexible vertical layout so the content remains readable across supported mobile widths.

## Image asset

No suitable local footwear campaign image exists in the repository. The existing local assets are the PostMart logo and app icons; the previous `HomeHero` used a remote Unsplash URL, which was not reused. The missing asset should be an editorial footwear image at approximately **1200 × 900 px** (4:3), with the subject positioned to leave negative space for light text and a dark, premium neutral palette. It should be added under `assets/images/` before replacing the fallback surface.

## CTA and scope

The banner CTA opens the existing `routes.category('sneakers')` collection route. No new route, API, store, dependency, or business logic was introduced. Step 1 header/search behavior remains unchanged. Categories, product rails, lifestyle content, trending products, and new arrivals were not modified.

## Validation

Validation results are reported in the implementation handoff. Device/emulator testing was not available in this environment, and the missing campaign image remains the only visual limitation.
