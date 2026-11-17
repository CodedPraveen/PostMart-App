import palette from './palette.json';

export { palette };

/** Shared semantic tokens. Keep component code independent of raw hex values. */
export const colors = {
  ...palette,
  primary: palette.deepDark,
  accent: palette.orange,
  secondary: palette.deepDark,
  background: palette.warmOffWhite,
  surface: palette.white,
  text: palette.deepDark,
  muted: palette.mutedGrey,
  border: palette.borderGrey,
} as const;

export type ColorToken = keyof typeof colors;
