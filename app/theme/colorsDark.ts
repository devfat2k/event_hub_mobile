/**
 * EventHub Color System
 * Semantic Mapping & Inverted Palette (Dark Theme)
 */

import { primitives } from "./colors"

const palette = {
  // Inverted neutral scale for dark mode surfaces/borders
  neutral50: primitives.neutral[950],
  neutral100: primitives.neutral[900],
  neutral200: primitives.neutral[800],
  neutral300: primitives.neutral[700],
  neutral400: primitives.neutral[600],
  neutral500: primitives.neutral[500],
  neutral600: primitives.neutral[400],
  neutral700: primitives.neutral[300],
  neutral800: primitives.neutral[200],
  neutral900: primitives.neutral[100],
  neutral950: primitives.neutral[50],

  // Primary brand palette
  primary100: primitives.primary[600],
  primary200: primitives.primary[500],
  primary300: primitives.primary[400],
  primary400: primitives.primary[300],
  primary500: primitives.primary[200],
  primary600: primitives.primary[100],

  // Secondary palette
  secondary100: primitives.secondary[500],
  secondary200: primitives.secondary[400],
  secondary300: primitives.secondary[300],
  secondary400: primitives.secondary[200],
  secondary500: primitives.secondary[100],

  // Accent palette
  accentTeal100: primitives.accent.teal500,
  accentTeal300: primitives.accent.teal300,
  accentTeal500: primitives.accent.teal100,
  accentAmber100: primitives.accent.amber500,
  accentAmber500: primitives.accent.amber100,

  // Accent compatibility aliases
  accent100: primitives.accent.amber500,
  accent200: "#EAB308",
  accent300: "#FACC15",
  accent400: "#FDE047",
  accent500: primitives.accent.amber100,

  // Error palette
  error100: primitives.error[600],
  error400: primitives.error[500],
  error500: primitives.error[400],
  error600: primitives.error[100],

  // Error compatibility aliases
  angry100: primitives.error[600],
  angry500: primitives.error[400],

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
   * High-contrast primary text (Dark).
   */
  text: "#F8FAFC",
  /**
   * Secondary/muted text (Dark).
   */
  textDim: primitives.neutral[400],
  /**
   * Base canvas (Dark).
   */
  background: primitives.neutral[950],
  /**
   * Elevated container surface and cards (Dark).
   */
  surface: "#171D2D",
  /**
   * Input boundaries & card perimeters (Dark).
   */
  border: "#263147",
  /**
   * Core brand CTA and active tint.
   */
  tint: primitives.primary[500],
  /**
   * Inactive tab bar icon & disabled targets (Dark).
   */
  tintInactive: primitives.neutral[500],
  /**
   * Hairline dividers (Dark).
   */
  separator: primitives.neutral[800],
  /**
   * High-contrast error label (Dark).
   */
  error: primitives.error[400],
  /**
   * Form input error fill (Dark).
   */
  errorBackground: "rgba(239, 68, 68, 0.15)",
  /**
   * Modal backdrops & scrims (Dark).
   */
  overlay: "rgba(10, 14, 26, 0.70)",
} as const
