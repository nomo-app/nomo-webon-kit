import { nomo, NomoManifest } from "nomo-webon-kit";

export async function launchAllWebOnsDemo() {
  const manifests = (await nomo.getInstalledWebOns()).manifests;
  const ownManifest = await nomo.getManifest();
  const otherManifests = manifests.filter(
    (m: NomoManifest) => m.webon_url !== ownManifest.webon_url
  );
  if (!otherManifests.length) {
    throw Error("You need to install other WebOns to test this feature.");
  }
  for (const manifest of otherManifests) {
    await nomo.launchWebOn({
      payload: "",
      manifest,
    });
  }
}
