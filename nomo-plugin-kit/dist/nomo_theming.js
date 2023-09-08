import { nomo } from "./nomo_api";
/**
 * Returns the current theme of the NOMO app.
 */
export async function getCurrentNomoTheme() {
    const rawTheme = await nomo.getTheme();
    const colors = rawTheme.colors;
    for (const color of Object.entries(colors)) {
        colors[color[0]] = convertFlutterColorIntoCSSColor(color[1]);
    }
    return rawTheme;
}
function capitalizeFirstLetter(inputString) {
    if (!inputString.length)
        return inputString;
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
/**
 * Injects css variables that automatically adjust according to the currently selected Nomo theme.
 */
export async function injectNomoCSSVariables() {
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
function convertFlutterColorIntoCSSColor(flutterColor) {
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
