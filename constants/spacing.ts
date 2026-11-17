export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 999,
} as const;

export const layout = {
  screenHorizontal: spacing.lg,
  sectionGap: spacing.xl,
  componentGap: spacing.md,
  cardPadding: spacing.lg,
  borderWidth: 1,
} as const;

export const componentSize = {
  buttonHeight: 48,
  inputHeight: 48,
  iconButtonSmall: 40,
  iconButtonMedium: 48,
  tabBarHeight: 68,
} as const;

/** Shadows stay intentionally restrained for the Premium Minimal surface language. */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#171717',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
} as const;
