# Phase 2 Step 3: Premium Category Browsing

## Existing data and navigation

Home continues to use `useCategories()`, backed by `GET /api/mobile/categories`. The mobile API returns category `id`, `name`, `slug`, `collection`, `parentId`, and nullable `image` values. The existing client parser preserves categories in the `SHOES` collection and does not discard parent or child categories; `CategoryStrip` displays the full returned set so valid categories remain browseable.

Each card navigates through the existing `routes.category(item.slug)` route. The category screen and its catalog query were not changed.

## UI changes

`CategoryStrip` now provides consistent 160px cards with bordered white surfaces, rounded corners, fixed image proportions, readable two-line names, hidden horizontal scroll indicators, and accessible card labels. Existing `ProductImage` loading/error behavior is reused for remote category images. Null images receive an explicit neutral fallback rather than a blank surface.

The strip includes a small loading skeleton that follows the existing `Skeleton` component and an empty state when the API returns no categories. API errors continue to use Home’s existing shared `ErrorState`; no duplicate category error message was added.

## Scope and validation

Only Home category browsing was changed. The header, search, hero campaign image, product sections, API calls, stores, and navigation architecture remain unchanged. Validation results are recorded in the task handoff; device testing was not available in this environment.
