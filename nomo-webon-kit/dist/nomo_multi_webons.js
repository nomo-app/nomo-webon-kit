import { invokeNomoFunction, invokeNomoFunctionCached, isFallbackModeActive, } from "./dart_interface";
import { hasMinimumNomoVersion, nomoGetExecutionMode } from "./nomo_platform";
import { urlSearchParamsToJson } from "./util";
/**
 * Returns the nomo_manifest.json that was used during the installation of the WebOn.
 * For example, this can be used by a WebOn for checking its own version.
 */
export async function nomoGetManifest() {
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
 * Changes the URL-parameters in the manifest of the currently running WebOn.
 * This function does not affect the currently running page.
 * Please use regular JavaScript for navigation.
 *
 * @param args.urlParams - A JSON-serializable object that will be converted to a URL query string.
 *
 * Since Nomo App 0.5.1.
 */
export async function nomoSetWebOnParameters(args) {
    return await invokeNomoFunction("nomoSetWebOnParameters", args);
}
/**
 * Returns the URL-parameters of the WebOn-manifest.
 * This might be a nested object that was previously passed to "nomoSetWebOnParameters".
 */
export async function nomoGetWebOnParameters() {
    const manifest = await nomoGetManifest();
    const webon_url = manifest.webon_url;
    const url = new URL(webon_url);
    const urlParams = new URLSearchParams(url.searchParams);
    return urlSearchParamsToJson(urlParams);
}
/**
 * Installs and/or launches a WebOn with or without user interaction.
 * If the WebOn is already installed, then the behavior depends on whether "backgroundInstall" is set to true.
 * If "backgroundInstall" is not set, then the already installed WebOn will be launched.
 * If "backgroundInstall" is set, then the already installed manifest will be replaced (including URL-args).
 * See the README for an explanation about deeplinks.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoInstallWebOn(args) {
    return await invokeNomoFunction("nomoInstallWebOn", args);
}
/**
 * Installs a URL as a WebOn and grants the permissions that are specified in the manifest.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoInstallUrlAsWebOn(args) {
    return await invokeNomoFunction("nomoInstallUrlAsWebOn", args);
}
/**
 * The reverse operation of nomoInstallWebOn.
 * Throws an error if the WebOn cannot be found.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoUninstallWebOn(args) {
    return await invokeNomoFunction("nomoUninstallWebOn", args);
}
/**
 * Tries to add a WebOn and then uninstalls another WebOn if it was successfully added.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoReplaceWebOn(args) {
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
export async function nomoGetInstalledWebOns() {
    return await invokeNomoFunction("nomoGetInstalledWebOns", null);
}
/**
 * Replaces the currently running WebOn with another WebOn on a different deeplink.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoMigrateAndSelfDestroy(args) {
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
    await nomoReplaceWebOn({
        old_webon_url: ownManifest.webon_url,
        new_deeplink: args.new_deeplink,
        navigateBack: true,
    });
}
/**
 * Passes a URL to the underlying platform for handling.
 * Typically, it will launch a system-browser or an in-app-webview.
 */
export async function nomoLaunchUrl(args) {
    if (isFallbackModeActive()) {
        window.open(args.url, "_blank");
        return;
    }
    return await invokeNomoFunction("nomoLaunchUrl", args);
}
/**
 * Launches a URL as a WebOn without installing it.
 * Grants the permissions that are specified in the manifest.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoLaunchUrlAsWebOn(args) {
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
    getItem: async function (key, options) {
        if (isFallbackModeActive()) {
            return localStorage.getItem(key);
        }
        const rawResult = await invokeNomoFunction("nomoGetItem", { key, options });
        return rawResult.value;
    },
    setItem: async function (key, value) {
        if (isFallbackModeActive()) {
            localStorage.setItem(key, value);
            return;
        }
        await invokeNomoFunction("nomoSetItem", { key, value });
    },
    removeItem: async function (key) {
        if (isFallbackModeActive()) {
            localStorage.removeItem(key);
            return;
        }
        await invokeNomoFunction("nomoRemoveItem", { key });
    },
};
