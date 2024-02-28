import {
  invokeNomoFunction,
  invokeNomoFunctionCached,
  isFallbackModeActive,
} from "./dart_interface";
import {nomoGetExecutionMode} from "./nomo_platform";

/**
 * Injecting QRCodes is useful for multiple purposes.
 * For example, new chats can be opened by injecting a chat-invitation-link.
 * Also the Nomo-ID protocol works by injecting QRCodes.
 *
 * Needs nomo.permission.INSTALL_WEBON.
 */
export async function nomoInjectQRCode(args: {
  qrCode: string;
  navigateBack: boolean;
}): Promise<void> {
  return await invokeNomoFunction("nomoInjectQRCode", args);
}

/**
 * Opens the camera to scan a qrCode.
 * Returns a raw qrCode or a list of comma-separated qrCodes.
 *
 * Needs nomo.permission.CAMERA.
 */
export async function nomoQrScan(): Promise<{ qrCode: string }> {
  return await invokeNomoFunction("nomoQrScan", {});
}

/**
 * Opens a standardized FAQ page in Nomo design.
 * "faqContent" should be a nested object of questions and answers (with depth=2).
 * Optionally, a button for contacting support is shown below of the FAQs.
 */
export async function nomoOpenFAQPage(args: {
  faqContent: Record<string, Record<string, string>>;
  initiallyExpanded: boolean;
  supportButtonTitle?: string;
  supportButtonUrl?: string;
}): Promise<void> {
  return await invokeNomoFunction("nomoOpenFAQPage", args);
}

const imagePrefix = "data:image/png;base64,";
const fallbackImage =
  imagePrefix +
  "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAE0lEQVR4nGP4wAAgkwB5Bh0pBAAAAABJRU5ErkJggg==";
/**
 * Opens the camera and returns a picture in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 * The promise may also reject if the user denied a camera-permission.
 *
 * Needs nomo.permission.CAMERA.
 */
export async function nomoTakePicture(args?: {
  maxWidth?: number;
  maxHeight?: number;
  imageQuality?: number;
}): Promise<{
  path: string;
  imageBase64: string;
}> {
  if (isFallbackModeActive()) {
    return {
      path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
      imageBase64: fallbackImage,
    };
  }
  const rawRes = await invokeNomoFunction("nomoTakePicture", args ?? null);
  return {
    ...rawRes,
    imageBase64: imagePrefix + rawRes.imageBase64,
  };
}

/**
 * Opens an image-picker and returns an image in base64-encoding.
 * The promise rejects if the user chooses to cancel.
 *
 * Needs nomo.permission.READ_MEDIA.
 */
export async function nomoPickFromGallery(args?: {
  maxWidth?: number;
  maxHeight?: number;
  imageQuality?: number;
}): Promise<{
  path: string;
  imageBase64: string;
}> {
  if (isFallbackModeActive()) {
    return {
      path: "/data/user/0/app.nomo.debug/cache/6098a97a-e556-4711-a069-4809d3db0aeb5994719432468143068.jpg",
      imageBase64: fallbackImage,
    };
  }
  const rawRes = await invokeNomoFunction("nomoPickFromGallery", args ?? null);
  return {
    ...rawRes,
    imageBase64: imagePrefix + rawRes.imageBase64,
  };
}

/**
 * Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.
 *
 * Needs nomo.permission.SEND_MESSAGE.
 */
export async function nomoGetMessengerAddress(): Promise<{
  messengerAddress: string;
  inviteLink: string;
}> {
  if (isFallbackModeActive()) {
    return {
      messengerAddress: "0x3f0e8cf0c6eb9789348541d9d0ce4ac847277e9b",
      inviteLink:
        "https://nomo.id/@0x6b65b7eadc7544dcf04869136466ba6224e799a2:zeniq.chat",
    };
  }
  return await invokeNomoFunctionCached("nomoGetMessengerAddress", null);
}

/**Automatically detects if webon is run in the browser and shows dialog redirecting to the webon.*/
export async function QRCodeOnWebview() {
  if ((await nomoGetExecutionMode()).webView !== "not_in_nomo_app" || document.getElementById('not_in_nomo_dialog'))
    return
  const url = "https://chart.googleapis.com/chart?cht=qr&chl=" + "http://nomo.app/webon/" + window.location.host +
      "&chs=160x160&chld=L|0"
  document.body.innerHTML += `
  <style>
    #not_in_nomo_dialog{
        display: flex; justify-content: space-evenly; align-items: center; flex-direction: column;
        position: fixed; top: 50%; left: 50%;transform: translate(-50%, -50%);
        width: 500px; height: 500px;  background:#151515; max-height: 100vh; max-width: 100vw; padding: 30px 30px 10px 30px;
        z-index: 9999;  
        border: 2px solid white; border-radius: 15px; filter: drop-shadow(0 5px 15px #666);
     }
    #not_in_nomo_dialog::backdrop {background: rgb(0 0 0 / 75%);}
    #not_in_nomo_dialog__btn{
        height: 55px; width: 70%; margin: 10px; 
        background: #bca570ff; color: white; font-size: 14px; font-weight: bold;
        outline: none; border-radius: 5px; border: 1px solid #ffffff88; box-shadow: 0 1px 1px lightgray; 
        transition: .2s;
        cursor: pointer;
    }
    #not_in_nomo_dialog__btn:hover{
        background-color: #938259;
    }
    #not_in_nomo_dialog__btn:active{
        border: transparent;
        box-shadow: none;
    }
    
   </style>
  <dialog id="not_in_nomo_dialog"> 
    <img src=${url} alt=${url}> 
    <h2 style="margin: 10px; color: white">Attention:</h2>
    <div style="text-align: center; color: white">You are currently displaying a WebOn outside your NOMO App. Please download the NOMO App here</div>
    <button id="not_in_nomo_dialog__btn" onclick="window.location.href='https://nomo.app/downloads'">Download NOMO App</button>
  </dialog>`

  const dialog = document.getElementById('not_in_nomo_dialog') as HTMLDialogElement
  dialog.showModal()
}