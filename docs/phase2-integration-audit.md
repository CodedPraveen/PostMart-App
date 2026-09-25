# Phase 2 integration status and contracts

Updated 2026-09-25. PR #3 is merged into `origin/main`. This records the worktree state, not a claim that Phase 2 is complete or deployed.

## Source of truth

The existing `com/` Next.js/Prisma application owns customers, catalog, cart, pricing, stock, checkout, Razorpay, orders, and webhooks. The mobile app uses its existing typed API client and TanStack Query. No second backend or database has been introduced.

`com/.env.local.example` named in the original brief is absent; `com/.env.example` is the backend reference. Only `EXPO_PUBLIC_POSTMART_API_URL` and `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` belong in mobile configuration. `TWO_FACTOR_API_KEY`, Clerk secrets, database URLs, Razorpay secrets, and webhook secrets are server-only.

## Current mobile-callable routes in the worktree

These routes are newly added under `com/app/api/mobile/` and have passed the backend production build. They are not yet deployed or end-to-end tested.

| Method and route | Input | Response | Authentication |
| --- | --- | --- | --- |
| `GET /api/mobile/products` | `page` (default 1), `pageSize` (1–50, default 20), `q`, `category`, repeated `size`, `color`, `priceRange`, `sort` (`latest`, `popular`, `price-asc`, `price-desc`) | `{ items, page, pageSize, total, hasMore }` using `productService.search` and its existing mapper | Public |
| `GET /api/mobile/products/[id]` | PostMart product ID | `{ product }` from `productService.getById` | Public |
| `GET /api/mobile/categories` | None | `{ items }` with ID, name, slug, collection, parent ID, public image | Public |
| `GET /api/mobile/profile` | None | `{ profile: { id, name, email, phone } }` | Customer bearer token |
| `GET /api/mobile/cart` | None | Existing `cartService.getCartSummary` result | Customer bearer |
| `POST /api/mobile/cart` | `{ productId, size, quantity }` | Authoritative cart summary | Customer bearer |
| `PATCH /api/mobile/cart/[lineId]` | `{ quantity }`; zero removes | Authoritative cart summary | Customer bearer; service scopes line to user |
| `DELETE /api/mobile/cart/[lineId]` | None | Authoritative cart summary | Customer bearer; service scopes line to user |
| `GET /api/mobile/wishlist` | None | `{ items }`, mapped products | Customer bearer |
| `POST /api/mobile/wishlist` | `{ productId }` | `{ added: true }` | Customer bearer |
| `DELETE /api/mobile/wishlist/[productId]` | None | 204 | Customer bearer |
| `GET /api/mobile/addresses` | None | `{ items }` | Customer bearer |
| `POST /api/mobile/addresses` | Address fields, optional `isDefault` | `{ address }` | Customer bearer |
| `PATCH /api/mobile/addresses/[id]` | Full address fields, optional `isDefault` | `{ address }` | Customer bearer; owner-scoped service |
| `DELETE /api/mobile/addresses/[id]` | None | 204 | Customer bearer; owner-scoped service |
| `POST /api/mobile/addresses/[id]/default` | None | `{ address }` | Customer bearer; owner-scoped service |
| `GET /api/mobile/orders` | `page`, `pageSize` | `{ items, page, total, hasMore }` | Customer bearer; user-derived query |
| `GET /api/mobile/orders/[id]` | Order ID | `{ order }` or 404 | Customer bearer; explicit ownership check |
| `POST /api/mobile/checkout/session` | `{ addressId }` | Existing checkout session response; Razorpay forced | Customer bearer; saved address ownership checked |
| `POST /api/mobile/checkout/razorpay/verify` | Razorpay order, payment, and signature IDs | Existing verification/fulfillment result or bounded error | Customer bearer; server verifies payment |
| `POST /api/mobile/auth/phone/request` and `/verify` | Phone challenge and OTP proof | Fail closed with 503 until 2Factor contract is validated | Public, rate-limited |
| `POST /api/mobile/auth/phone/logout` | Phone bearer token | Revokes its hashed server session | Phone bearer |
| `POST /api/mobile/auth/phone/link/request` and `/verify` | Phone challenge and OTP proof | Fail closed with 503 until 2Factor contract is validated | Clerk bearer plus phone proof |

Protected routes reject requests without an `Authorization: Bearer <token>` header; they do not accept browser cookies as mobile credentials. The token can be a Clerk session token, or a hashed-at-rest PostMart phone session once OTP is enabled. The backend resolves the customer, not a client-supplied `userId`. Order DTOs omit user records, payment signatures, and raw provider payloads. Mutations use the existing backend rate-limit helper, which is in-memory per instance. The phone service also records challenge windows in PostgreSQL, but distributed abuse protection and live provider behavior remain unvalidated.

The new mobile checkout routes adapt the existing website checkout and Razorpay verification services to native bearer auth, but have not been exercised with a native payment SDK or real provider. The existing webhook and fulfillment path must remain authoritative; a client payment callback is not proof of purchase. Existing `GET /api/orders/[orderId]` and `/invoice` are web routes and are not used as mobile customer DTOs.

## Current mobile wiring

The new catalog service validates `/api/mobile/products`, `/products/[id]`, and `/categories` responses. Home, category listing, search, and product detail now query real catalog data; listing uses infinite-query pagination. Featured and trending home sections use the previously verified `/api/homepage/sections/[section]` endpoint. The original mock product source remains for Phase 1-only flows and should be removed only after those flows are connected. Search currently displays the first server page only. The cart and wishlist buttons still write local Zustand state; addresses, checkout, and orders are not yet connected. Do not interpret the catalog screens as a complete commerce flow.

Clerk Expo dependencies and config plugins are installed. `PostmartAuthProvider` wraps the app, uses Clerk's secure token cache and hosted sign-in, injects the session token into the API client, and exposes sign-out that clears cached queries. Profile reads the server's `/api/mobile/profile` response. This is code wiring, **not** a validated Google/email sign-in: Clerk dashboard configuration, redirect/native allowlisting, session restoration, and Android/iOS behavior have not been exercised. Phone sign-in has no mobile UI or live provider.

## Identity and OTP decision

The new, **undeployed** Prisma migration makes `User.clerkId` and `User.email` nullable, adds unique `User.phone`, and adds phone challenge and hashed-session tables. The mobile API can resolve Clerk or phone sessions while web `requireDbUser` remains Clerk-only. `userService.upsertFromClerk` no longer silently reassigns `clerkId` on an email match. A separate phone-link request/verify route requires a Clerk bearer session and a verified phone challenge; it refuses phones already owned by another customer and does not implement account merging.

The user selected a backend `PhoneAuthProvider` abstraction now, with live 2Factor validation later. Public 2Factor pages show inconsistent API generations, and no account-specific contract or sandbox key is available. The adapter deliberately returns unavailable rather than guessing an OTP endpoint or claiming phone sign-in works. The service code includes expiry, single-use attempts, cooldown, and per-phone/IP windows; these have not been proven against PostgreSQL or a live provider. `TWO_FACTOR_API_KEY` is server-only. Linking must prove control of both identities; matching name, email, or phone is insufficient.

## Remaining Phase 2 gates

- Validate and deploy the identity migration; complete a tested 2Factor adapter when the account contract is available, then build and verify phone sign-in UI and identity linking.
- Validate mobile Clerk Google/email, bearer token injection, session restore, and logout on devices; complete server-backed cart, wishlist, addresses, checkout, and orders UI.
- Fix/validate cart variant and stock behavior, define deterministic guest-cart merge, and move list pagination to efficient database queries if catalog size warrants it.
- Verify native checkout request policy, Razorpay SDK/native flow, webhook-driven order creation, amount/signature/idempotency/inventory behavior, and IDOR/abuse test cases.
- Run backend tests, mobile tests, Expo Doctor/export, Android/iOS QA, and a real end-to-end purchase. None of these are implied by a successful compile.

## Checks so far

Backend `npm run lint` passed and `npm run build` exited 0 after the phone and checkout routes. The build emitted Prisma connection failures while statically generating pages because the configured remote database was unreachable, so a successful compile is not a database-backed pass. Mobile `npm run typecheck` and `npm run lint` passed after the Clerk/profile/catalog edits; Expo Doctor passed 21/21 checks and Expo web export succeeded. No migration application, real database integration test, Android/iOS device QA, OTP delivery, or end-to-end checkout/payment test has passed.
