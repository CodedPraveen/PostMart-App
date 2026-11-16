const palette = {
  deepDark: '#171717',
  warmOffWhite: '#F7F7F5',
  orange: '#E54503',
  white: '#FFFFFF',
  mutedGrey: '#737373',
  borderGrey: '#E5E5E3',
  success: '#18794E',
  warning: '#A86200',
  error: '#C62828',
} as const;

/** Shared semantic tokens. Keep component code independent of raw hex values. */
export const colors = {
  ...palette,
  primary: palette.orange,
  secondary: palette.deepDark,
  background: palette.warmOffWhite,
  surface: palette.white,
  text: palette.deepDark,
  muted: palette.mutedGrey,
  border: palette.borderGrey,
} as const;

export type ColorToken = keyof typeof colors;
