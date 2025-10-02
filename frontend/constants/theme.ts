/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform, ViewStyle, TextStyle } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const SharedStyles = {
  input: {
    borderWidth: 1,
    borderColor: "#E9EDF4",
    backgroundColor: "#E9EDF4",
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 17.5,
    paddingBottom: 17.5,
    marginBottom: 0,
  } as TextStyle,

  inputError: {
    borderColor: "#DC2E2D",
    borderWidth: 1,
  } as TextStyle,

  errorText: {
    color: "#DC2E2D",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  } as TextStyle,

  darkButton: {
    backgroundColor: "#13A4EC",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center" as ViewStyle["alignItems"],
    width: "100%",
  } as ViewStyle,

  darkButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  } as TextStyle,

  lightButton: {
    backgroundColor: "#E9EDF4",
    borderWidth: 1,
    borderColor: "#E9EDF4",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center" as ViewStyle["alignItems"],
    width: "100%",
  } as ViewStyle,

  lightButtonText: {
    color: "#13A4EC",
    fontSize: 18,
    fontWeight: "bold",
  } as TextStyle,
};
