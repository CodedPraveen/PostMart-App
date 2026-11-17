# PostMart Phase 1 Design System

This document describes the implemented Phase 1 theme and reusable UI tokens. Home remains visually unchanged; its premium layout is reserved for Phase 2.

## Colors

`constants/palette.json` is the single source of truth for the approved palette. `constants/colors.ts` exposes semantic names for React Native, and `tailwind.config.js` consumes the same JSON values for NativeWind.

| Token | Value | Use |
| --- | --- | --- |
| Deep Dark | `#171717` | Primary actions, headings, dark surfaces |
| Warm Off-White | `#F7F7F5` | Screen background |
| Orange | `#E54503` | Limited brand accent and discount emphasis |
| White | `#FFFFFF` | Cards, inputs, and surfaces |
| Muted Grey | `#737373` | Supporting text and icons |
| Border Grey | `#E5E5E3` | Borders and dividers |
| Success | `#18794E` | Positive status |
| Warning | `#A86200` | Low-stock and warning status |
| Error | `#C62828` | Validation and destructive status |

## Typography

`constants/typography.ts` provides the shared React Native metrics: `screenTitle`, `sectionHeading`, `cardTitle`, `productName`, `productPrice`, `body`, `caption`, `button`, `inputLabel`, `helper`, and `error`. Existing `display`, `h1`, `h2`, `h3`, and `bodyMedium` aliases remain available for compatibility.

## Spacing, radius, and shadows

`constants/spacing.ts` provides a 4px-based scale (`xs` through `3xl`) plus named layout values for screen padding, sections, component gaps, cards, buttons, inputs, and borders. Radius tokens are `sm` (6), `md` (10), `lg` (16), and `full`. `shadows.card` and `shadows.floating` provide platform-safe React Native shadow values.

## Reusable components

The existing primitives were retained and audited: `Button`, `Input`, `SearchBar`, `IconButton`, `Badge`, `Chip`, `ProductCard`, `CategoryStrip`, `ProductPrice`, `ScreenContainer`, headers, feedback states, skeletons, and cart rows. They keep their existing props and callbacks. Buttons expose disabled/loading states; inputs expose error styling and text; icon buttons expose selected/disabled accessibility state; badges support brand, dark, success, warning, and error tones.

Example:

```tsx
<Button label="Continue" fullWidth onPress={onContinue} />
<Input label="Email" error={emailError} placeholder="you@example.com" />
<Badge label="Low stock" tone="warning" />
```

## Validation

Validation is run with `npx tsc --noEmit`, `npx expo lint`, `npx expo-doctor`, and `git diff --check`. Results are reported with the implementation handoff and are not inferred from configuration.
