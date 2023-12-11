import {
  invokeNomoFunction,
  invokeNomoFunctionCached,
  isFallbackModeActive,
} from "./dart_interface";
import { hasMinimumNomoVersion, nomoGetExecutionMode } from "./nomo_platform";

export interface NomoManifest {
  /**
   * If min_nomo_version is set, then outdated versions of the Nomo App will refuse to install the WebOn.
   */
  min_nomo_version?: string | null;
  /**
   * nomo_manifest_version should be 1.1.0.
   */
  nomo_manifest_version: string;
  /**
   * A list of permissions for security-critical features.
   */
  permissions: string[];
  /**
   * webon_id should be the reverse-domain of a domain that is owned by the WebOn-author.
   * See https://en.wikipedia.org/wiki/Reverse_domain_name_notation for more details about the reverse domain name notation.
   */
  webon_id: string;
  /**
   * webon_name is the user-visible name of the WebOn.
   */
  webon_name: string;
  /**
   * webon_url is the URL that the Nomo App uses for installing the WebOn.
   * Typically, webon_url gets extracted out of a deeplink that is supplied to the Nomo App.
   */
  webon_url: string;
  /**
   * webon_version should comply with the semantic versioning standard.
   * See https://semver.org/ for details.
   */
  webon_version: string;
  /**
   * If true, then the WebOn could be displayed in both card-mode and fullscreen-mode.
   * If false, then the WebOn will only be displayed in fullscreen-mode.
   */
  card_mode?: boolean;
  /**
   * If true, the Nomo App will show a refresh-button in the navigation bar.
   * Since Nomo App 0.3.5.
   */
  show_refresh_button?: boolean;
}

/**
 * Returns the nomo_manifest.json that was used during the installation of the WebOn.
 * For example, this can be used by a WebOn for checking its own version.
 */
export async function nomoGetManifest(): Promise<NomoManifest> {
  if (isFallbackModeActive()) {
    return {
      nomo_manifest_version: "1.2.0",
      permissions: [],
      webon_id: "fallback.nomo.app",
      webon_name: "Fallback Mode",
      webon_url: "https://nomo.app/fallbackmode",
      webon_version: "0.1.0",
    };
  }
  return await invokeNomoFunctionCached("nomoGetManifest", {});
}

/**
 * Installs a WebOn with or without user interaction.
 * If the WebOn is already installed, it will be updated to the latest version.
 * See the README for an explanation about deeplinks.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoInstallWebOn(args: {
  deeplink: string;
  skipPermissionDialog: boolean;
  navigateBack: boolean;
}): Promise<void> {
  return await invokeNomoFunction("nomoInstallWebOn", args);
}

/**
 * Installs a URL as a WebOn and grants the permissions that are specified in the manifest.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 * Since Nomo App 0.3.5.
 */
export async function nomoInstallUrlAsWebOn(args: {
  manifest: NomoManifest;
  skipPermissionDialog: boolean;
  navigateBack: boolean;
}): Promise<void> {
  return await invokeNomoFunction("nomoInstallUrlAsWebOn", args);
}

/**
 * The reverse operation of nomoInstallWebOn.
 * Throws an error if the WebOn cannot be found.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoUninstallWebOn(args: {
  webon_url: string;
}): Promise<void> {
  return await invokeNomoFunction("nomoUninstallWebOn", args);
}

/**
 * Tries to add a WebOn and then uninstalls another WebOn if it was successfully added.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoReplaceWebOn(args: {
  old_webon_url: string;
  new_deeplink: string;
  navigateBack: boolean;
}): Promise<void> {
  await nomoInstallWebOn({
    deeplink: args.new_deeplink,
    skipPermissionDialog: true,
    navigateBack: args.navigateBack,
  });
  await nomoUninstallWebOn({ webon_url: args.old_webon_url });
}

/**
 * Gets all manifests of the installed WebOns, including information like name/id/version.
 *
 * Needs nomo.permission.GET_INSTALLED_WEBONS.
 */
export async function nomoGetInstalledWebOns(): Promise<{
  manifests: NomoManifest[];
}> {
  return await invokeNomoFunction("nomoGetInstalledWebOns", null);
}

/**
 * Replaces the currently running WebOn with another WebOn on a different deeplink.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoMigrateAndSelfDestroy(args: {
  new_deeplink: string;
}) {
  if (isFallbackModeActive()) {
    return;
  }
  if (!hasMinimumNomoVersion({ minVersion: "0.3.4" })) {
    return;
  }
  const mode = await nomoGetExecutionMode();
  if (mode.executionMode === "DEV_DEV") {
    return;
  }
  const ownManifest = await nomoGetManifest();
  if (ownManifest.webon_url.includes("http://")) {
    return; // we only want to migrate https-production-WebOns
  }
  const navigateBack = mode.cardMode !== true;
  await nomoReplaceWebOn({
    old_webon_url: ownManifest.webon_url,
    new_deeplink: args.new_deeplink,
    navigateBack,
  });
}

/**
 * Opens another WebOn on top of the current WebOn.
 * If the WebOn is not yet running, the WebOn will be launched.
 * If the WebOn is not yet installed, an error is thrown.
 * A payload can be passed to the WebOn.
 * Afterwards, the user may navigate back to the current WebOn by pressing the back button.
 */
export async function nomoLaunchWebOn(args: {
  payload: string;
  manifest: NomoManifest;
}): Promise<void> {
  return await invokeNomoFunction("nomoLaunchWebOn", args);
}

/**
 * Passes a URL to the underlying platform for handling.
 * Typically, it will launch a system-browser or an in-app-webview.
 */
export async function nomoLaunchUrl(args: {
  url: string;
  launchMode:
    | "platformDefault"
    | "inAppWebView"
    | "externalApplication"
    | "externalNonBrowserApplication";
}): Promise<any> {
  if (isFallbackModeActive()) {
    window.open(args.url, "_blank");
    return;
  }
  return await invokeNomoFunction("nomoLaunchUrl", args);
}

/**
 * Launches a URL as a WebOn and grants the permissions that are specified in the manifest.
 * If possible, please prefer "nomoLaunchUrl" or "nomoLaunchWebOn" over this function.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 * Since Nomo App 0.3.5.
 */
export async function nomoLaunchUrlAsWebOn(args: {
  manifest: NomoManifest;
}): Promise<any> {
  if (isFallbackModeActive()) {
    window.open(args.manifest.webon_url, "_blank");
    return;
  }
  return await invokeNomoFunction("nomoLaunchUrlAsWebOn", args);
}

/**
 * nomoLocalStorage provides a mechanism for sharing data between WebOns.
 * If a webon_id is passed to nomoLocalStorage.getItem, then it tries to read data from another WebOn with the given webon_id.
 * nomoLocalStorage can also be used as an alternative to the regular localStorage.
 */
export const nomoLocalStorage = {
  getItem: async function (
    key: string,
    options?: { webon_id: string }
  ): Promise<String | null> {
    if (isFallbackModeActive()) {
      return localStorage.getItem(key);
    }
    const rawResult = await invokeNomoFunction("nomoGetItem", { key, options });
    return rawResult.value;
  },
  setItem: async function (key: string, value: string): Promise<void> {
    if (isFallbackModeActive()) {
      localStorage.setItem(key, value);
      return;
    }
    await invokeNomoFunction("nomoSetItem", { key, value });
  },
  removeItem: async function (key: string): Promise<void> {
    if (isFallbackModeActive()) {
      localStorage.removeItem(key);
      return;
    }
    await invokeNomoFunction("nomoRemoveItem", { key });
  },
};
