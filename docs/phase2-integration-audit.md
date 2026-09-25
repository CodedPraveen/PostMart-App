# Phase 2 integration audit

Inspected on 2026-09-25. This document records the existing `com/` contracts without changing that project.

## Existing backend surface

| Area | Existing implementation | Mobile callable route today |
| --- | --- | --- |
| Featured and trending shoes | `productService` and `storefrontService` | `GET /api/homepage/sections/featured` and `/trending` |
| Full catalog, product detail, category, search | `productService`, server-rendered pages | None found |
| Cart | `cartService`, `cart-actions.js` | None found |
| Wishlist | `wishlistService`, `wishlist-actions.js` | None found |
| Addresses | `addressService`, `address-actions.js` | None found |
| Orders | `orderService`, `order-actions.js`; detail and invoice routes | `GET /api/orders/[orderId]` and `/invoice`, Clerk protected |
| Checkout | `checkoutService`, `checkout-flow-service`, Razorpay webhook and verification | `POST /api/checkout/session`, `/api/checkout/razorpay/verify` |

The customer action functions marked `use server` are not a stable mobile JSON API. The customer services can be reused by new route handlers once backend changes are approved. Cart and wishlist mutations already scope database operations to a resolved user ID. Checkout already creates the Razorpay order on the server and verifies payment through the server; mobile must use the same flow once authentication and contracts are settled.

## Authentication and identity gap

`requireDbUser` resolves the Clerk session to a PostMart `User`. The `User` model requires unique `clerkId` and unique `email`; there is no phone identity table, phone session verifier, OTP provider interface, or verified linking flow. Phone sign-in cannot be connected safely by changing only the mobile app. Account linking must verify ownership of both identities on the backend and keep one PostMart user ID.

The current checkout route rejects cross-site browser requests and uses the Clerk context established by the website middleware. A native bearer token must be tested against that context before enabling checkout in mobile. No client payment success flag may create an order.

## Environment

The brief names `com/.env.local.example`, but that file is absent. `com/.env.example` is present. The only values identified for the mobile app are the public application origin and the existing Clerk publishable key. Database, Clerk secret, Razorpay secret, webhook, Redis, Google server, and SMS keys remain server side. The mobile `.env.example` contains only public values.

## Proposed backend contracts requiring explicit approval

Expose the existing service behavior through customer JSON routes for catalog detail/list/search, cart, wishlist, profile, addresses, and order list. Reuse the current checkout session and verification services after their native auth and request policy are checked. Each protected route must resolve a PostMart user on the server, validate inputs, enforce rate limits where appropriate, and scope reads and writes to that user. Add a backend phone provider interface and identity/linking model before enabling phone OTP. The future provider implementation and credentials remain undecided.

Do not enable guest cart merge until the backend contract specifies how duplicate variants, stock limits, unavailable products, and existing cart lines are reconciled. The server must return the authoritative merged cart and any rejected lines.

## Current mobile progress

TanStack Query and a typed API client are present. The API client validates its HTTPS origin, attaches a supplied short-lived token for protected requests, times out, and maps HTTP and network failures to user-safe errors. The public homepage route has a validated response type and a query hook. Phase 1 screens still use local mock catalog and cart data until the full customer contracts can be connected safely.
