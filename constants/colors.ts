export const colors = {
  primary: '#E54503',
  secondary: '#1A1D1C',
  background: '#F8F8F6',
  surface: '#FFFFFF',
  text: '#1A1D1C',
  muted: '#6B6F6D',
  border: '#E4E5E3',
  success: '#18794E',
  warning: '#A86200',
  error: '#C62828',
} as const;

export type ColorToken = keyof typeof colors;
