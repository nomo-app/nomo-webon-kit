import { invokeNomoFunction, invokeNomoFunctionCached, isFallbackModeActive } from "./dart_interface";
/**
 * Injecting QRCodes is useful for multiple purposes.
 * For example, new chats can be opened by injecting a chat-invitation-link.
 * Also the Nomo-ID protocol works by injecting QRCodes.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoInjectQRCode(args) {
    return await invokeNomoFunction("nomoInjectQRCode", args);
}
/**
 * Opens the camera to scan a qrCode.
 * Returns a raw qrCode or a list of comma-separated qrCodes.
 *
 * Needs nomo.permission.CAMERA.
 */
export async function nomoQrScan() {
    return await invokeNomoFunction("nomoQrScan", {});
}
/**
 * Opens a standardized FAQ page in Nomo design.
 * "faqContent" should be a nested object of questions and answers (with depth=2).
 * Optionally, a button for contacting support is shown below of the FAQs.
 */
export async function nomoOpenFAQPage(args) {
    return await invokeNomoFunction("nomoOpenFAQPage", args);
}
const imagePrefix = "data:image/png;base64,";
const fallbackImage = imagePrefix +
    "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAE0lEQVR4nGP4wAAgkwB5Bh0pBAAAAABJRU5ErkJggg==";
/**
 * Opens the camera and returns a picture in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 *
 * Needs nomo.permission.CAMERA.
 */
export async function nomoTakePicture(args) {
    if (isFallbackModeActive()) {
        return {
            path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
            imageBase64: fallbackImage,
        };
    }
    const rawRes = await invokeNomoFunction("nomoTakePicture", args !== null && args !== void 0 ? args : null);
    return Object.assign(Object.assign({}, rawRes), { imageBase64: imagePrefix + rawRes.imageBase64 });
}
/**
 * Opens an image-picker and returns an image in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 *
 * Needs nomo.permission.READ_MEDIA.
 */
export async function nomoPickFromGallery(args) {
    if (isFallbackModeActive()) {
        return {
            path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
            imageBase64: fallbackImage,
        };
    }
    const rawRes = await invokeNomoFunction("nomoPickFromGallery", args !== null && args !== void 0 ? args : null);
    return Object.assign(Object.assign({}, rawRes), { imageBase64: imagePrefix + rawRes.imageBase64 });
}
/**
 * Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.
 *
 * Needs nomo.permission.SEND_MESSAGE.
 */
export async function nomoGetMessengerAddress() {
    if (isFallbackModeActive()) {
        return {
            messengerAddress: "0x3f0e8cf0c6eb9789348541d9d0ce4ac847277e9b",
            inviteLink: "https://nomo.id/@0x6b65b7eadc7544dcf04869136466ba6224e799a2:zeniq.chat",
        };
    }
    return await invokeNomoFunctionCached("nomoGetMessengerAddress", null);
}
