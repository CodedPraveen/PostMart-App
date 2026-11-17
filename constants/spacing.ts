export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  screenHorizontal: 20,
  section: 32,
  componentGap: 12,
  cardPadding: 20,
  buttonHeight: 48,
  inputHeight: 48,
  borderWidth: 1,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 999,
} as const;

export const shadows = {
  card: { shadowColor: '#171717', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  floating: { shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 4 },
} as const;
