/**
 * Returns the current theme of the NOMO app.
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
 * Injects css variables that automatically adjust according to the currently selected Nomo theme.
 */
export declare function injectNomoCSSVariables(): Promise<void>;
