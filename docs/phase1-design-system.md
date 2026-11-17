# Phase 1 Design System

PostMart Mobile uses a Premium Minimal visual system. Deep Dark and Warm Off-White are the dominant colors; orange is reserved for small accent states.

## Color palette

The source of truth is `constants/palette.json`. `constants/colors.ts` consumes it for React Native semantic tokens, and `tailwind.config.js` consumes the same file for NativeWind semantic names.

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

## Typography

Semantic roles live in `constants/typography.ts`: screen titles, section headings, card titles, product names and prices, descriptions, captions, button labels, input labels, helper text, and errors. The platform system font is used for Android and iOS compatibility.

## Spacing, sizing, and surfaces

`constants/spacing.ts` provides the 4-point spacing scale, radius tokens, `layout`, `componentSize`, and restrained shadow presets. Shadows use `palette.deepDark`; `none`, `subtle`, `card`, and `floating` are available.

## Reusable components

- `Button`: primary, secondary, outline, and ghost variants with loading and disabled states.
- `Input`: labels, left/right content, error text, and muted placeholders.
- `Badge`: brand, dark, success, warning, and error tones.
- `IconButton`: consistent 40/48 touch targets with selected and disabled accessibility behavior.
- `ProductCard`, `ProductImage`, and `ProductPrice`: shared product presentation with fallback behavior.
- `ScreenContainer`, `AppHeader`, `TabBarIcon`, and `SectionHeader`: shared layout and navigation language.
- `Skeleton`, `EmptyState`, `ErrorState`, and `AppNotice`: shared feedback states.

## Phase 1 audit status

Completed: approved palette, synchronized NativeWind tokens, shared typography and spacing tokens, reusable component styling, product-image fallback surfaces, and existing screen coverage.

Not included: a Home Screen redesign, new features, or backend/API changes.

Known validation limitation: Expo Doctor has previously hung without output in the local environment; it must complete successfully before that check is treated as passed.
