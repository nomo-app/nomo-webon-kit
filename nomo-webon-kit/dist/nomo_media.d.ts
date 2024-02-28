/**
 * Injecting QRCodes is useful for multiple purposes.
 * For example, new chats can be opened by injecting a chat-invitation-link.
 * Also the Nomo-ID protocol works by injecting QRCodes.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export declare function nomoInjectQRCode(args: {
    qrCode: string;
    navigateBack: boolean;
}): Promise<void>;
/**
 * Opens the camera to scan a qrCode.
 * Returns a raw qrCode or a list of comma-separated qrCodes.
 *
 * Needs nomo.permission.CAMERA.
 */
export declare function nomoQrScan(): Promise<{
    qrCode: string;
}>;
/**
 * Opens a standardized FAQ page in Nomo design.
 * "faqContent" should be a nested object of questions and answers (with depth=2).
 * Optionally, a button for contacting support is shown below of the FAQs.
 */
export declare function nomoOpenFAQPage(args: {
    faqContent: Record<string, Record<string, string>>;
    initiallyExpanded: boolean;
    supportButtonTitle?: string;
    supportButtonUrl?: string;
}): Promise<void>;
/**
 * Opens the camera and returns a picture in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 * The promise may also reject if the user denied a camera-permission.
 *
 * Needs nomo.permission.CAMERA.
 */
export declare function nomoTakePicture(args?: {
    maxWidth?: number;
    maxHeight?: number;
    imageQuality?: number;
}): Promise<{
    path: string;
    imageBase64: string;
}>;
/**
 * Opens an image-picker and returns an image in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 *
 * Needs nomo.permission.READ_MEDIA.
 */
export declare function nomoPickFromGallery(args?: {
    maxWidth?: number;
    maxHeight?: number;
    imageQuality?: number;
}): Promise<{
    path: string;
    imageBase64: string;
}>;
/**
 * Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.
 *
 * Needs nomo.permission.SEND_MESSAGE.
 */
export declare function nomoGetMessengerAddress(): Promise<{
    messengerAddress: string;
    inviteLink: string;
}>;
/**Automatically detects if webon is run in the browser and shows dialog redirecting to the webon.*/
export declare function QRCodeOnWebview(): Promise<void>;
