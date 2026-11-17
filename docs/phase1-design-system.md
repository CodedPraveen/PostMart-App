# Phase 1 Design System

PostMart Mobile uses a Premium Minimal visual system. Deep Dark and Warm Off-White are the dominant colors; orange is reserved for small accent states.

## Color palette

The source of truth is `constants/colors.ts`. Tailwind/NativeWind semantic names are synchronized in `tailwind.config.js`.

| Token | Value | Use |
| --- | --- | --- |
| `deepDark` / `primary` / `secondary` | `#171717` | Primary actions, headings, body text, default icons |
| `warmOffWhite` / `background` | `#F7F7F5` | Screen and image-placeholder backgrounds |
| `orange` / `accent` | `#E54503` | Active favourites, sale labels, ratings, small indicators |
| `white` / `surface` | `#FFFFFF` | Cards, inputs, navigation surfaces |
| `mutedGrey` / `muted` | `#737373` | Secondary text, placeholders, inactive icons |
| `borderGrey` / `border` | `#E5E5E3` | Borders and dividers |
| `success` | `#18794E` | Success states |
| `warning` | `#A86200` | Warning states |
| `error` | `#C62828` | Error states |

Example:

```tsx
<Button label="Add to bag" variant="primary" />
<Feather name="heart" color={isWishlisted ? colors.accent : colors.secondary} />
```

## Typography

The app uses the platform system font for reliable Android and iOS rendering. Semantic roles live in `constants/typography.ts` and preserve the existing scale:

- `screenTitle`: 28/34, bold
- `sectionHeading`: 22/28, semibold
- `cardTitle`: 18/24, semibold
- `productName`: 15/22, medium
- `productPrice`: 16/22, semibold
- `originalPrice`: 14/20, regular
- `description` / `body`: 15/22, regular
- `caption` / `helper` / `error`: 12/16
- `buttonLabel`: 15/20, semibold
- `inputLabel`: 15/22, medium

## Spacing, sizing, and surfaces

`constants/spacing.ts` provides the 4-point spacing scale (`xs` through `3xl`), radius tokens, shared layout values, component heights, and restrained shadow presets.

- Screen horizontal padding: 16
- Standard section gap: 24
- Standard component gap: 12
- Card padding: 16
- Button and input height: 48
- Small and medium icon-button targets: 40 and 48
- Standard border width: 1
- Default card/input radius: 10

Shadows are optional and intentionally subtle. Flat borders and surface contrast are preferred.

## Reusable components

- `Button`: primary, secondary, outline, and ghost variants with loading and disabled states.
- `Input`: label, placeholder, left/right content, error text, and muted placeholder support.
- `Badge`: brand, dark, success, and warning tones.
- `IconButton`: consistent 40/48 touch targets and selected state.
- `ProductCard`, `ProductImage`, and `ProductPrice`: shared product presentation with preserved loading and fallback behavior.
- `ScreenContainer`, `AppHeader`, `TabBarIcon`, and `SectionHeader`: shared screen layout and navigation language.
- `Skeleton`, `EmptyState`, `ErrorState`, and `AppNotice`: shared feedback states.

## Phase 1 audit status

Completed: official palette, primary/accent separation, synchronized NativeWind tokens, shared screen backgrounds, reusable component styling, product-image fallback surfaces, and existing screen coverage.

Not included in Phase 1: a Home Screen redesign, new features, or backend/API changes. Those belong to later roadmap phases.

Known validation limitation: Expo Doctor has previously hung without output in the local environment; it must be rerun in a network-capable environment before treating that check as passed.
