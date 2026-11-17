# Phase 2 Step 5: New Arrivals and Promotions

## New Arrivals

New Arrivals reuses the existing `useCatalog({ sort: 'latest' })` query and its React Query cache. Home continues to filter the first catalog page by the real `isNew` field; no mock products or additional requests were introduced.

The section reuses `HorizontalProductRail`, `ProductCard`, `ProductImage`, `ProductPrice`, and existing product-detail navigation. It now supports the shared horizontal loading skeleton, a useful empty state when no products are marked new, and a localized retryable `ErrorState` that calls only `catalogQuery.refetch()`.

## Promotions and offers

No mobile promotions/offers API or promotion feed model is available. The backend roadmap lists coupons/promotions as planned, and the mobile homepage/product contracts do not expose an active promotion collection. No artificial offer banner, discount percentage, coupon code, expiry date, or new endpoint was added.

Future promotion work requires a backend-supported contract defining active promotions, display content, eligibility, dates, and supported navigation/verification behavior.

## Scope and validation

Header/search, hero, categories, Featured, Trending, authentication, stores, APIs, and navigation architecture remain unchanged. Validation results are recorded in the task handoff; device testing was not available in this environment.
