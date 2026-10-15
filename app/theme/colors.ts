/**
 * EventHub Color System
 * Primitive Color Palette & Semantic Mapping (Light Theme)
 */

export const primitives = {
  neutral: {
    50: "#FAFAFD",
    100: "#F1F4F9",
    200: "#E2E7F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#0A0E1A",
  },
  primary: {
    100: "#FFF1EE",
    200: "#FFE4DE",
    300: "#FFAF9B",
    400: "#FF7F62",
    500: "#FF5A36",
    600: "#E04523",
  },
  secondary: {
    100: "#EEF2FF",
    200: "#E0E7FF",
    300: "#A5B4FC",
    400: "#6366F1",
    500: "#4F46E5",
  },
  accent: {
    teal100: "#F0FDF4",
    teal300: "#86EFAC",
    teal500: "#0D9488",
    amber100: "#FEFCE8",
    amber500: "#F59E0B",
  },
  error: {
    100: "#FEF2F2",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
  },
  overlay: {
    scrim20: "rgba(15, 23, 42, 0.20)",
    scrim50: "rgba(10, 14, 26, 0.50)",
    scrim80: "rgba(10, 14, 26, 0.80)",
  },
} as const

const palette = {
  // Neutral scale
  neutral50: primitives.neutral[50],
  neutral100: primitives.neutral[100],
  neutral200: primitives.neutral[200],
  neutral300: primitives.neutral[300],
  neutral400: primitives.neutral[400],
  neutral500: primitives.neutral[500],
  neutral600: primitives.neutral[600],
  neutral700: primitives.neutral[700],
  neutral800: primitives.neutral[800],
  neutral900: primitives.neutral[900],
  neutral950: primitives.neutral[950],

  // Primary brand palette
  primary100: primitives.primary[100],
  primary200: primitives.primary[200],
  primary300: primitives.primary[300],
  primary400: primitives.primary[400],
  primary500: primitives.primary[500],
  primary600: primitives.primary[600],

  // Secondary palette
  secondary100: primitives.secondary[100],
  secondary200: primitives.secondary[200],
  secondary300: primitives.secondary[300],
  secondary400: primitives.secondary[400],
  secondary500: primitives.secondary[500],

  // Accent palette
  accentTeal100: primitives.accent.teal100,
  accentTeal300: primitives.accent.teal300,
  accentTeal500: primitives.accent.teal500,
  accentAmber100: primitives.accent.amber100,
  accentAmber500: primitives.accent.amber500,

  // Accent compatibility aliases
  accent100: primitives.accent.amber100,
  accent200: "#FDE047",
  accent300: "#FACC15",
  accent400: "#EAB308",
  accent500: primitives.accent.amber500,

  // Error palette
  error100: primitives.error[100],
  error400: primitives.error[400],
  error500: primitives.error[500],
  error600: primitives.error[600],

  // Error compatibility aliases
  angry100: primitives.error[100],
  angry500: primitives.error[500],

  // Overlay scrims
  overlay20: primitives.overlay.scrim20,
  overlay50: primitives.overlay.scrim50,
  overlay80: primitives.overlay.scrim80,
} as const

export const colors = {
  /**
   * The primitive palette is available, but semantic names should be preferred.
   */
  palette,
  /**
   * Helper for transparent backgrounds.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * High-contrast primary text.
   */
  text: primitives.neutral[900],
  /**
   * Secondary/muted text.
   */
  textDim: primitives.neutral[600],
  /**
   * Root app viewport canvas.
   */
  background: "#F8F9FF",
  /**
   * Raised container surface and cards.
   */
  surface: "#FFFFFF",
  /**
   * Subtle perimeter borders & inputs.
   */
  border: primitives.neutral[200],
  /**
   * Core brand CTA and active tint.
   */
  tint: primitives.primary[500],
  /**
   * Inactive tab icon & disabled touch targets.
   */
  tintInactive: primitives.neutral[400],
  /**
   * Hairline dividers.
   */
  separator: primitives.neutral[100],
  /**
   * High-contrast error label.
   */
  error: primitives.error[600],
  /**
   * Input field error background.
   */
  errorBackground: primitives.error[100],
  /**
   * Modal backdrops & scrims.
   */
  overlay: primitives.overlay.scrim50,
} as const
