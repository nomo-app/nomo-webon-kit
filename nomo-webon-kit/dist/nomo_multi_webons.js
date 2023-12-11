import { invokeNomoFunction, invokeNomoFunctionCached, isFallbackModeActive, } from "./dart_interface";
import { hasMinimumNomoVersion, nomoGetExecutionMode } from "./nomo_platform";
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
 * Installs a WebOn with or without user interaction.
 * If the WebOn is already installed, it will be updated to the latest version.
 * See the README for an explanation about deeplinks.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoInstallWebOn(args) {
    return await invokeNomoFunction("nomoInstallWebOn", args);
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
export async function nomoLaunchWebOn(args) {
    return await invokeNomoFunction("nomoLaunchWebOn", args);
}
/**
 * Passes a URL to the underlying platform for handling.
 */
export async function nomoLaunchUrl(args) {
    if (isFallbackModeActive()) {
        window.open(args.url, "_blank");
        return;
    }
    return await invokeNomoFunction("nomoLaunchUrl", args);
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
