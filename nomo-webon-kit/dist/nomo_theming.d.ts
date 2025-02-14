/**
 * The themes that are supported by the Nomo App.
 */
export type NomoTheme = "LIGHT" | "DARK" | "AVINOC";
/**
 * Switches the Nomo App to a different theme.
 * It is recommended to call "injectNomoCSSVariables" after a theme has changed.
 */
export declare function switchNomoTheme(args: {
    theme: NomoTheme;
}): Promise<void>;
/**
 * A low-level function. We recommend using "injectNomoCSSVariables" instead.
 */
export declare function getCurrentNomoTheme(): Promise<{
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
}>;
/**
 * Injects CSS variables that automatically adjust according to the currently selected Nomo theme.
 */
export declare function injectNomoCSSVariables(): Promise<void>;
