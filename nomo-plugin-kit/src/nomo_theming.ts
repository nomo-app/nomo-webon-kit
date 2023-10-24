import { invokeNomoFunction, isFallbackModeActive } from "./dart_interface";
import { nomo } from "./nomo_api";

/**
 * The themes that are supported by the Nomo App.
 */
export type NomoTheme = "LIGHT" | "DARK" | "AVINOC" | "TUPAN";

/**
 * Switches the Nomo App to a different theme.
 * It is recommended to call "injectNomoCSSVariables" after a theme has changed.
 */
export async function switchNomoTheme(args: {
  theme: NomoTheme;
}): Promise<void> {
  if (isFallbackModeActive()) {
    fallbackThemeSelector = args.theme;
  } else {
    return await invokeNomoFunction("nomoSwitchTheme", args);
  }
}

/**
 * The purpose of "fallbackThemeSelector" is to enable switching between themes while
 * developing in a browser outside of the Nomo App.
 */
let fallbackThemeSelector: NomoTheme = "LIGHT";

/**
 * Returns the current theme of the NOMO app.
 */
export async function getCurrentNomoTheme(): Promise<{
  name: string;
  displayName: string;
  colors: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    background: string;
    surface: string;
    foreground1: string;
    foreground2: string;
    foreground3: string;
    snackBarColor: string;
    disabledColor: string;
    error: string;
    settingsTileColor: string;
    settingsColumnColor: string;
  };
}> {
  if (isFallbackModeActive()) {
    if (fallbackThemeSelector === "LIGHT") {
      return lightTheme;
    } else if (fallbackThemeSelector === "DARK") {
      return darkTheme;
    } else if (fallbackThemeSelector === "AVINOC") {
      return avinocTheme;
    } else if (fallbackThemeSelector === "TUPAN") {
      return tupanTheme;
    } else {
      return Promise.reject("unknown fallback theme " + fallbackThemeSelector); // should never happen
    }
  }

  const rawTheme = await nomo.getTheme();
  const colors = rawTheme.colors as Record<string, string>;
  for (const color of Object.entries(colors)) {
    colors[color[0]] = convertFlutterColorIntoCSSColor(color[1]);
  }
  return rawTheme;
}

function capitalizeFirstLetter(inputString: string) {
  if (!inputString.length) return inputString;
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const lightTheme = {
  name: "LIGHT",
  displayName: "Nomo Light",
  colors: {
    primary: "0xffbca570",
    onPrimary: "0xffffffff",
    primaryContainer: "0xfffcfaf7",
    secondary: "0xffd1af72",
    onSecondary: "0xff000000",
    secondaryContainer: "0xffe6d0a3",
    background: "0xfff5f5f5",
    surface: "0xffffffff",
    foreground1: "0xcf000000",
    foreground2: "0xdf000000",
    foreground3: "0xef000000",
    snackBarColor: "0xfffff7e5",
    disabledColor: "0xffe0e0e0",
    error: "0xffff5252",
    settingsTileColor: "0xffffffff",
    settingsColumnColor: "0xffededed",
  },
};

const darkTheme = {
  name: "DARK",
  displayName: "Nomo Dark",
  colors: {
    primary: "#bca570ff",
    onPrimary: "#ffffffff",
    primaryContainer: "#fcfaf7ff",
    secondary: "#d1af72ff",
    onSecondary: "#000000ff",
    secondaryContainer: "#e6d0a3ff",
    background: "#293138ff",
    surface: "#2e363cff",
    foreground1: "#ffffffea",
    foreground2: "#fffffff0",
    foreground3: "#fffffffa",
    snackBarColor: "#474a53ff",
    disabledColor: "#e0e0e0ff",
    error: "#ff5252ff",
    settingsTileColor: "#4b5a66ff",
    settingsColumnColor: "#38434cff",
  },
};

const avinocTheme = {
  name: "AVINOC",
  displayName: "AVINOC",
  colors: {
    primary: "#2faaa5ff",
    onPrimary: "#ffffffff",
    primaryContainer: "#cafffdff",
    secondary: "#2faaa5ff",
    onSecondary: "#1c1c1cff",
    secondaryContainer: "#1c1c1cff",
    background: "#272f4aff",
    surface: "#101d42ff",
    foreground1: "#ffffffea",
    foreground2: "#fffffff0",
    foreground3: "#fffffffa",
    snackBarColor: "#333a66ff",
    disabledColor: "#e0e0e0ff",
    error: "#ff5252ff",
    settingsTileColor: "#333a66ff",
    settingsColumnColor: "#232846ff",
  },
};

const tupanTheme = {
  name: "TUPAN",
  displayName: "TUPAN",
  colors: {
    primary: "#77af22ff",
    onPrimary: "#ffffffff",
    primaryContainer: "#efffd8ff",
    secondary: "#77af22ff",
    onSecondary: "#1c1c1cff",
    secondaryContainer: "#1c1c1cff",
    background: "#417030ff",
    surface: "#346231ff",
    foreground1: "#ffffffea",
    foreground2: "#fffffff0",
    foreground3: "#fffffffa",
    snackBarColor: "#4a8037ff",
    disabledColor: "#e0e0e0ff",
    error: "#ff5252ff",
    settingsTileColor: "#4a8037ff",
    settingsColumnColor: "#417030ff",
  },
};

export const themes = {
  lightTheme,
  darkTheme,
  avinocTheme,
  tupanTheme,
};

/**
 * Injects css variables that automatically adjust according to the currently selected Nomo theme.
 */
export async function injectNomoCSSVariables(): Promise<void> {
  const htmlTag = document.getElementsByTagName("html");
  if (!htmlTag) {
    return Promise.reject("did not find HTML tag for injection");
  }
  const theme = await getCurrentNomoTheme();
  Object.entries(theme.colors).forEach((entry) => {
    const varName = "--nomo" + capitalizeFirstLetter(entry[0]);
    const color = entry[1];
    htmlTag[0].style.setProperty(varName, color);
  });
}

function convertFlutterColorIntoCSSColor(flutterColor: string): string {
  if (!flutterColor.startsWith("0x")) {
    return flutterColor; // should never happen
  }
  let cssColor = flutterColor.replace("0x", "");
  if (cssColor.length >= 8) {
    // move alpha channel to the last position
    cssColor = cssColor.substring(2) + cssColor.substring(0, 2);
  }
  return "#" + cssColor;
}
