# Phase 2 Step 4: Featured and Trending Products

## Data and navigation

Featured products continue to come from `useHomepageSection('featured')`, and trending products continue to come from `useHomepageSection('trending')`. Both hooks retain their existing React Query keys, caching, API contracts, and `toUiProduct` mapping. No mock products, endpoints, stores, or dependencies were introduced.

Both sections reuse the existing `HorizontalProductRail`, `ProductCard`, `ProductImage`, `ProductPrice`, wishlist behavior, and product-detail navigation through `routes.product(product.id)`.

## UI and state handling

`HorizontalProductRail` now supports opt-in horizontal loading skeletons and useful empty states. Featured and Trending pass those states explicitly while New Arrivals continues using the existing default behavior. Cards retain consistent image proportions, product information, spacing, radius, and fallback image handling.

Featured, Trending, and New Arrivals API failures are localized beneath their section headings with the shared `ErrorState` and section-specific retry actions. New Arrivals retries only `catalogQuery.refetch()`. There is no global Home error block, avoiding duplicate messages and unrelated refetches.

## Scope and validation

Header/search, hero campaign image, category browsing, navigation architecture, authentication, APIs, stores, and New Arrivals were not redesigned. Validation results are recorded in the task handoff; device testing was not available in this environment.
