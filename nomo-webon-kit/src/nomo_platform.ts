import {
  invokeNomoFunction,
  invokeNomoFunctionCached,
  isFallbackModeActive,
} from "./dart_interface";
import { compareSemanticVersions, stringifyWithBigInts } from "./util";

export type NomoExecutionMode = "PRODUCTION" | "DEV" | "DEV_DEV" | "FALLBACK";
export type NomoHostingMode = "NOMO_INTEGRATED_HOSTING" | "EXTERNAL_HOSTING";
export type NomoWebView = "webview_flutter" | "webview_cef" | "not_in_nomo_app";

/**
 * Returns true if the code is running within a Nomo App WebView.
 */
export function runsAsWebOn(): boolean {
  return !isFallbackModeActive();
}

/**
 * This function checks at runtime if the Nomo App has a minimum version.
 * It is also possible to require a minimum Nomo App version in the manifest.
 */
export async function hasMinimumNomoVersion(args: {
  minVersion: string;
}): Promise<{ minVersionFulfilled: boolean; nomoVersion: string }> {
  const plaformInfo = await nomoGetPlatformInfo();
  const nomoVersion = plaformInfo.version;
  const c = compareSemanticVersions(args.minVersion, nomoVersion);
  if (c > 0) {
    return { minVersionFulfilled: false, nomoVersion };
  } else {
    return { minVersionFulfilled: true, nomoVersion };
  }
}

/**
 * Returns both the NOMO-version and the operating system where the WebOn runs.
 * Can be used for implementing platform-specific functionality.
 * See https://nomo.app/ for an overview of supported platforms.
 */
export async function nomoGetPlatformInfo(): Promise<{
  version: string;
  buildNumber: string;
  appName: string;
  clientName: string;
  operatingSystem: string;
}> {
  if (isFallbackModeActive()) {
    return {
      version: "0.9.0",
      buildNumber: "123400",
      appName: "Not in Nomo app!",
      clientName: "Not in Nomo app!",
      operatingSystem: "unknown",
    };
  }
  return await invokeNomoFunctionCached("nomoGetPlatformInfo", null);
}

/**
 * Gets details about the execution environment of the WebOn.
 * See the advanced docs for more details about execution modes: https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs
 */
export async function nomoGetExecutionMode(): Promise<{
  executionMode: NomoExecutionMode;
  hostingMode: NomoHostingMode | null;
  webView: NomoWebView;
}> {
  if (isFallbackModeActive()) {
    return {
      executionMode: "FALLBACK",
      hostingMode: null,
      webView: "not_in_nomo_app",
    };
  }
  return await invokeNomoFunctionCached("nomoGetExecutionMode", null);
}

/**
 * Returns a comma-separated list of device hashes.
 * Can be used for fingerprinting devices.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export async function nomoGetDeviceHashes(): Promise<{
  deviceHashes: string;
}> {
  if (isFallbackModeActive()) {
    return {
      deviceHashes:
        "b6Qz6EEKg,m2wAyKypQ,d67rq8zvw,pHcGGpnD5,iBFGnwEoE,vBhmQwyos,aGGJKq2QG,o9q6MhCeA,s9KLx6CVa,f7nin76st,rF3JVtwjV,u3txrGJEW",
    };
  }
  return await invokeNomoFunctionCached("nomoGetDeviceHashes", null);
}

/**
 * Returns a human-readable name of the device.
 *
 * Needs nomo.permission.DEVICE_FINGERPRINTING.
 */
export async function nomoGetDeviceName(): Promise<{
  deviceName: string;
}> {
  if (isFallbackModeActive()) {
    return {
      deviceName: "Browser fallback mode: No device name outside of Nomo app",
    };
  }
  return await invokeNomoFunctionCached("nomoGetDeviceName", null);
}

/**
 * Returns the currently selected language of the Nomo App.
 */
export async function nomoGetLanguage(): Promise<{ language: string }> {
  if (isFallbackModeActive()) {
    return { language: "en" };
  }
  return await invokeNomoFunction("nomoGetLanguage", {});
}

/**
 * This will show a dialog to the user if an update is available.
 * If you need to customize this dialog, then you could re-implement the same functionality in JavaScript.
 * Nevertheless, the Nomo App will automatically check for updates even if you never invoke "nomoCheckForWebOnUpdate".
 */
export async function nomoCheckForWebOnUpdate(): Promise<void> {
  return await invokeNomoFunction("nomoCheckForWebOnUpdate", {});
}

/**
 * Registers a callback that will be called every time when the WebOn gets visible within the Nomo App.
 * For example, this can be used to refresh themes or languages when re-opening a WebOn after a pause.
 */
export async function nomoRegisterOnWebOnVisible(
  callback: () => void
): Promise<void> {
  window.onWebOnVisible = callback;
  if (isFallbackModeActive()) {
    return;
  }
  return await invokeNomoFunctionCached("nomoEnableOnWebOnVisible", {});
}

/**
 * Summons the platform's share sheet to share a text.
 * If no text is provided, then it will share the deeplink of the WebOn.
 *
 * Wraps the platform's native share dialog. Can share a text and/or a URL.
 * It uses the `ACTION_SEND` Intent on Android and `UIActivityViewController` on iOS.
 *
 * The optional [subject] parameter can be used to populate a subject if the user chooses to send an email.
 */
export async function nomoShare(args: {
  text?: string;
  subject?: string;
}): Promise<void> {
  if (!runsAsWebOn()) {
    navigator.share({ text: args.text });
    return;
  }
  return await invokeNomoFunction("nomoShare", args);
}
