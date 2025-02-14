import {
  NomoTheme,
  getCurrentNomoTheme,
  injectNomoCSSVariables,
  switchNomoTheme,
} from "nomo-webon-kit";

export async function themeSwitchDemo() {
  const oldTheme: NomoTheme = (await getCurrentNomoTheme()).name as NomoTheme;
  const newTheme: NomoTheme =
    oldTheme === "LIGHT"
      ? "DARK"
      : oldTheme == "DARK"
      ? "AVINOC"
      : "LIGHT";
  await switchNomoTheme({ theme: newTheme });
  await injectNomoCSSVariables(); // refresh css variables after switching theme
}
