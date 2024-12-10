import { nomo, NomoManifest } from "nomo-webon-kit";

export async function launchOtherWebOnsDemo() {
  const manifests = (await nomo.getInstalledWebOns()).manifests;
  const ownManifest = await nomo.getManifest();
  const otherManifests = manifests.filter(
    (m: NomoManifest) => m.webon_url !== ownManifest.webon_url
  );
  if (!otherManifests.length) {
    throw Error("You need to install other WebOns to test this feature.");
  }
  const webOnsToLaunch = otherManifests.slice(0, 2);
  for (const manifest of webOnsToLaunch) {
    // nomo.installWebon launches a WebOn if already installed
    await nomo.installWebOn({
      deeplink: manifest.webon_url,
      skipPermissionDialog: true,
    });
  }

  const urlAsWebOn: NomoManifest = {
    webon_url: "https://www.avinoc.com/",
    webon_name: "AVINOC Website",
    webon_id: "com.avinoc.www",
    permissions: [],
    webon_version: "0.1.0",
    nomo_manifest_version: "1.2.0",
  };
  await nomo.launchUrlAsWebOn({ manifest: urlAsWebOn });

  const urlForInstalling: NomoManifest = {
    webon_url: "https://zeniqscan.com/",
    webon_name: "zeniqscan.com",
    webon_id: "com.zeniqscan",
    permissions: [],
    webon_version: "0.1.0",
    nomo_manifest_version: "1.2.0",
  };
  await nomo.installUrlAsWebOn({
    manifest: urlForInstalling,
    navigateBack: false,
    skipPermissionDialog: true,
  });
}
