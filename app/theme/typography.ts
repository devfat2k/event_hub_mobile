/**
 * EventHub Typography System
 * Primary Font: Be Vietnam Pro (Google Fonts)
 */

import { Platform } from "react-native"
import {
  BeVietnamPro_300Light as beVietnamProLight,
  BeVietnamPro_400Regular as beVietnamProRegular,
  BeVietnamPro_500Medium as beVietnamProMedium,
  BeVietnamPro_600SemiBold as beVietnamProSemiBold,
  BeVietnamPro_700Bold as beVietnamProBold,
} from "@expo-google-fonts/be-vietnam-pro"

export const customFontsToLoad = {
  beVietnamProLight,
  beVietnamProRegular,
  beVietnamProMedium,
  beVietnamProSemiBold,
  beVietnamProBold,
}

const fonts = {
  beVietnamPro: {
    // Cross-platform Google font optimized for Vietnamese and modern UI.
    light: "beVietnamProLight",
    normal: "beVietnamProRegular",
    medium: "beVietnamProMedium",
    semiBold: "beVietnamProSemiBold",
    bold: "beVietnamProBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.beVietnamPro,
  /**
   * An alternate font used for titles and headers.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Monospace font for code/coupons.
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
