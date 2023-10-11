[nomo-plugin-kit](README.md) / Exports

# nomo-plugin-kit

## Table of contents

### Variables

- [nomo](modules.md#nomo)
- [nomoConsole](modules.md#nomoconsole)
- [nomoLocalStorage](modules.md#nomolocalstorage)

### Functions

- [nomoAuthHttp](modules.md#nomoauthhttp)
- [nomoEnableMobileConsoleDebugging](modules.md#nomoenablemobileconsoledebugging)
- [nomoGetDeviceHashes](modules.md#nomogetdevicehashes)
- [nomoGetDeviceName](modules.md#nomogetdevicename)
- [nomoGetMessengerAddress](modules.md#nomogetmessengeraddress)
- [nomoGetPlatformInfo](modules.md#nomogetplatforminfo)
- [nomoGetTheme](modules.md#nomogettheme)
- [nomoGetWalletAddresses](modules.md#nomogetwalletaddresses)
- [nomoInjectIntoPlugin](modules.md#nomoinjectintoplugin)
- [nomoInjectQRCode](modules.md#nomoinjectqrcode)
- [nomoMnemonicBackupExisted](modules.md#nomomnemonicbackupexisted)
- [nomoPickFromGallery](modules.md#nomopickfromgallery)
- [nomoQrScan](modules.md#nomoqrscan)
- [nomoRegisterOnPluginVisible](modules.md#nomoregisteronpluginvisible)
- [nomoSendAssets](modules.md#nomosendassets)
- [nomoSignEvmMessage](modules.md#nomosignevmmessage)
- [nomoSignEvmTransaction](modules.md#nomosignevmtransaction)
- [nomoTakePicture](modules.md#nomotakepicture)

## Variables

### nomo

• `Const` **nomo**: `Object`

The nomo-object exposes plugin-functions in an easy-to-use way.
The nomo-object can be used with only one import and supports the auto-completion of IDEs.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authHttp` | (`args`: `string` \| { `body?`: `string` ; `headers?`: { `[key: string]`: `string`;  } ; `method?`: ``"GET"`` \| ``"POST"`` ; `url`: `string`  }) => `Promise`<{ `response`: `string` ; `statusCode`: `number`  }\> |
| `enableMobileConsoleDebugging` | () => `void` |
| `getDeviceHashes` | () => `Promise`<{ `deviceHashes`: `string`  }\> |
| `getDeviceName` | () => `Promise`<{ `deviceName`: `string`  }\> |
| `getMessengerAddress` | () => `Promise`<{ `inviteLink`: `string` ; `messengerAddress`: `string`  }\> |
| `getPlatformInfo` | () => `Promise`<{ `appName`: `string` ; `buildNumber`: `string` ; `clientName`: `string` ; `operatingSystem`: `string` ; `version`: `string`  }\> |
| `getTheme` | () => `Promise`<{ `colors`: { `background`: `string` ; `disabledColor`: `string` ; `error`: `string` ; `foreground1`: `string` ; `foreground2`: `string` ; `foreground3`: `string` ; `onPrimary`: `string` ; `onSecondary`: `string` ; `primary`: `string` ; `primaryContainer`: `string` ; `secondary`: `string` ; `secondaryContainer`: `string` ; `settingsColumnColor`: `string` ; `settingsTileColor`: `string` ; `snackBarColor`: `string` ; `surface`: `string`  } ; `displayName`: `string` ; `name`: `string`  }\> |
| `getWalletAddresses` | () => `Promise`<{ `walletAddresses`: `Record`<`string`, `string`\>  }\> |
| `injectIntoPlugin` | (`args`: { `payload`: `string` ; `pluginId`: `string`  }) => `Promise`<`void`\> |
| `injectQRCode` | (`args`: { `navigateBack`: `boolean` ; `qrCode`: `string`  }) => `Promise`<`void`\> |
| `localStorage` | { `getItem`: (`key`: `string`, `options?`: { `plugin_id`: `string`  }) => `Promise`<``null`` \| `String`\> ; `removeItem`: (`key`: `string`) => `Promise`<`void`\> ; `setItem`: (`key`: `string`, `value`: `string`) => `Promise`<`void`\>  } |
| `localStorage.getItem` | (`key`: `string`, `options?`: { `plugin_id`: `string`  }) => `Promise`<``null`` \| `String`\> |
| `localStorage.removeItem` | (`key`: `string`) => `Promise`<`void`\> |
| `localStorage.setItem` | (`key`: `string`, `value`: `string`) => `Promise`<`void`\> |
| `mnemonicBackupExisted` | () => `Promise`<{ `mnemonicBackupExisted`: `boolean`  }\> |
| `nativeLog` | (`severity`: ``"LOG"`` \| ``"INFO"`` \| ``"WARN"`` \| ``"ERROR"``, `args`: `any`[]) => `void` |
| `pickFromGallery` | (`args?`: { `imageQuality?`: `number` ; `maxHeight?`: `number` ; `maxWidth?`: `number`  }) => `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\> |
| `qrScan` | () => `Promise`<{ `qrCode`: `string`  }\> |
| `registerOnPluginVisible` | (`callback`: () => `void`) => `Promise`<`void`\> |
| `sendAssets` | (`args`: { `amount`: `string` ; `assetSymbol`: `string` ; `targetAddress`: `string`  }) => `Promise`<`any`\> |
| `signEvmMessage` | (`args`: { `message`: `string`  }) => `Promise`<{ `sigHex`: `string`  }\> |
| `signEvmTransaction` | (`args`: { `messageHex`: `string`  }) => `Promise`<{ `sigHex`: `string`  }\> |
| `takePicture` | (`args?`: { `imageQuality?`: `number` ; `maxHeight?`: `number` ; `maxWidth?`: `number`  }) => `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\> |

#### Defined in

[nomo_api.ts:40](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L40)

___

### nomoConsole

• `Const` **nomoConsole**: `Object`

A set of logging-functions to enable debugging with the Nomo dev mode.
You should not need to call this directly, since it will be called automatically when calling
console.log/console.error/console.warn/console.info.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | (...`args`: `any`[]) => `void` |
| `info` | (...`args`: `any`[]) => `void` |
| `log` | (...`args`: `any`[]) => `void` |
| `warn` | (...`args`: `any`[]) => `void` |

#### Defined in

[nomo_api.ts:73](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L73)

___

### nomoLocalStorage

• `Const` **nomoLocalStorage**: `Object`

nomoLocalStorage provides a mechanism for sharing data between plugins.
If a plugin_id is passed to nomoLocalStorage.getItem, then it tries to read data from another plugin with the given plugin_id.
nomoLocalStorage can also be used as an alternative to the regular localStorage.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getItem` | (`key`: `string`, `options?`: { `plugin_id`: `string`  }) => `Promise`<``null`` \| `String`\> |
| `removeItem` | (`key`: `string`) => `Promise`<`void`\> |
| `setItem` | (`key`: `string`, `value`: `string`) => `Promise`<`void`\> |

#### Defined in

[nomo_api.ts:9](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L9)

## Functions

### nomoAuthHttp

▸ **nomoAuthHttp**(`args`): `Promise`<{ `response`: `string` ; `statusCode`: `number`  }\>

A special http-function that implements the NOMO-Auth-Protocol.
NOMO-Auth allows a seamless authentication for supported backends.
Moreover, even if you do not use NOMO-Auth, you can still use this function for bypassing CORS/Same-Origin-Policy.
At a lower level, NOMO-Auth works by injecting the following http-headers into the request:
Authorization: "Bearer JWT"
nomo-sig: "Signature of JWT"
nomo-auth-addr: "an address derived by the NOMO-wallet"
nomo-auth-version: "version of NOMO-Auth"

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| { `body?`: `string` ; `headers?`: { `[key: string]`: `string`;  } ; `method?`: ``"GET"`` \| ``"POST"`` ; `url`: `string`  } |

#### Returns

`Promise`<{ `response`: `string` ; `statusCode`: `number`  }\>

#### Defined in

[nomo_api.ts:390](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L390)

___

### nomoEnableMobileConsoleDebugging

▸ **nomoEnableMobileConsoleDebugging**(): `void`

After calling this function, console logs are visible in the
mobile dev mode of the Nomo App.

#### Returns

`void`

#### Defined in

[nomo_api.ts:98](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L98)

___

### nomoGetDeviceHashes

▸ **nomoGetDeviceHashes**(): `Promise`<{ `deviceHashes`: `string`  }\>

Returns a comma-separated list of device hashes.
Can be used for fingerprinting devices.

#### Returns

`Promise`<{ `deviceHashes`: `string`  }\>

#### Defined in

[nomo_api.ts:354](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L354)

___

### nomoGetDeviceName

▸ **nomoGetDeviceName**(): `Promise`<{ `deviceName`: `string`  }\>

Returns a human-readable name of the device.

#### Returns

`Promise`<{ `deviceName`: `string`  }\>

#### Defined in

[nomo_api.ts:369](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L369)

___

### nomoGetMessengerAddress

▸ **nomoGetMessengerAddress**(): `Promise`<{ `inviteLink`: `string` ; `messengerAddress`: `string`  }\>

Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.

#### Returns

`Promise`<{ `inviteLink`: `string` ; `messengerAddress`: `string`  }\>

#### Defined in

[nomo_api.ts:187](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L187)

___

### nomoGetPlatformInfo

▸ **nomoGetPlatformInfo**(): `Promise`<{ `appName`: `string` ; `buildNumber`: `string` ; `clientName`: `string` ; `operatingSystem`: `string` ; `version`: `string`  }\>

Returns both the NOMO-version and the operating system where the plugin runs.
Can be used for implementing platform-specific functionality.
See https://nomo.app/ for an overview of supported platforms.

#### Returns

`Promise`<{ `appName`: `string` ; `buildNumber`: `string` ; `clientName`: `string` ; `operatingSystem`: `string` ; `version`: `string`  }\>

#### Defined in

[nomo_api.ts:165](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L165)

___

### nomoGetTheme

▸ **nomoGetTheme**(): `Promise`<{ `colors`: { `background`: `string` ; `disabledColor`: `string` ; `error`: `string` ; `foreground1`: `string` ; `foreground2`: `string` ; `foreground3`: `string` ; `onPrimary`: `string` ; `onSecondary`: `string` ; `primary`: `string` ; `primaryContainer`: `string` ; `secondary`: `string` ; `secondaryContainer`: `string` ; `settingsColumnColor`: `string` ; `settingsTileColor`: `string` ; `snackBarColor`: `string` ; `surface`: `string`  } ; `displayName`: `string` ; `name`: `string`  }\>

This is a low-level function that should not be called directly. Instead, the functions in "nomo_theming" should be used.

#### Returns

`Promise`<{ `colors`: { `background`: `string` ; `disabledColor`: `string` ; `error`: `string` ; `foreground1`: `string` ; `foreground2`: `string` ; `foreground3`: `string` ; `onPrimary`: `string` ; `onSecondary`: `string` ; `primary`: `string` ; `primaryContainer`: `string` ; `secondary`: `string` ; `secondaryContainer`: `string` ; `settingsColumnColor`: `string` ; `settingsTileColor`: `string` ; `snackBarColor`: `string` ; `surface`: `string`  } ; `displayName`: `string` ; `name`: `string`  }\>

#### Defined in

[nomo_api.ts:301](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L301)

___

### nomoGetWalletAddresses

▸ **nomoGetWalletAddresses**(): `Promise`<{ `walletAddresses`: `Record`<`string`, `string`\>  }\>

Returns blockchain-addresses of the NOMO-user.

#### Returns

`Promise`<{ `walletAddresses`: `Record`<`string`, `string`\>  }\>

#### Defined in

[nomo_api.ts:204](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L204)

___

### nomoInjectIntoPlugin

▸ **nomoInjectIntoPlugin**(`args`): `Promise`<`void`\>

Opens another plugin on top of the current plugin.
If the plugin is not yet running, the plugin will be launched.
If the plugin is not yet installed, an error is thrown.
A payload can be passed to the plugin.
Afterwards, the user may navigate back to the current plugin by pressing the back button.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.payload` | `string` |
| `args.pluginId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_api.ts:237](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L237)

___

### nomoInjectQRCode

▸ **nomoInjectQRCode**(`args`): `Promise`<`void`\>

Injecting QRCodes is useful for multiple purposes.
For example, new chats can be opened by injecting a chat-invitation-link.
Also the NOMO-ID protocol works by injecting QRCodes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.navigateBack` | `boolean` |
| `args.qrCode` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_api.ts:223](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L223)

___

### nomoMnemonicBackupExisted

▸ **nomoMnemonicBackupExisted**(): `Promise`<{ `mnemonicBackupExisted`: `boolean`  }\>

If true, then the user has made a backup of their 12 words (at some point in the past).
If false, then there exists no backup and the 12 words will get lost with a high probability.

#### Returns

`Promise`<{ `mnemonicBackupExisted`: `boolean`  }\>

#### Defined in

[nomo_api.ts:422](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L422)

___

### nomoPickFromGallery

▸ **nomoPickFromGallery**(`args?`): `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\>

Opens an image-picker and returns an image in base64-encoding.
The promise rejects if the user chooses to cancel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `Object` |
| `args.imageQuality?` | `number` |
| `args.maxHeight?` | `number` |
| `args.maxWidth?` | `number` |

#### Returns

`Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\>

#### Defined in

[nomo_api.ts:277](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L277)

___

### nomoQrScan

▸ **nomoQrScan**(): `Promise`<{ `qrCode`: `string`  }\>

Opens the camera to scan a qrCode.
Returns a raw qrCode or a list of comma-separated qrCodes.

#### Returns

`Promise`<{ `qrCode`: `string`  }\>

#### Defined in

[nomo_api.ts:113](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L113)

___

### nomoRegisterOnPluginVisible

▸ **nomoRegisterOnPluginVisible**(`callback`): `Promise`<`void`\>

Registers a callback that will be called every time when the plugin gets visible within the Nomo App.
For example, this can be used to refresh data when re-opening a plugin after a long pause.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_api.ts:435](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L435)

___

### nomoSendAssets

▸ **nomoSendAssets**(`args`): `Promise`<`any`\>

Opens a confirmation-dialog to send assets away from the NOMO-wallet.
Assets are only sent if the user confirms the dialog.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.amount` | `string` |
| `args.assetSymbol` | `string` |
| `args.targetAddress` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[nomo_api.ts:410](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L410)

___

### nomoSignEvmMessage

▸ **nomoSignEvmMessage**(`args`): `Promise`<{ `sigHex`: `string`  }\>

Creates an Ethereum-styled message signature.
The resulting signature is not usable for submitting transactions,
but it can be used as a proof that the user controls a wallet.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.message` | `string` |

#### Returns

`Promise`<{ `sigHex`: `string`  }\>

#### Defined in

[nomo_api.ts:148](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L148)

___

### nomoSignEvmTransaction

▸ **nomoSignEvmTransaction**(`args`): `Promise`<{ `sigHex`: `string`  }\>

Creates a signature for an EVM-based transaction.
See EthersjsNomoSigner for an example on how to use this function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.messageHex` | `string` |

#### Returns

`Promise`<{ `sigHex`: `string`  }\>

#### Defined in

[nomo_api.ts:136](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L136)

___

### nomoTakePicture

▸ **nomoTakePicture**(`args?`): `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\>

Opens the camera and returns a picture in base64-encoding.
The promise rejects if the user chooses to cancel.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `Object` |
| `args.imageQuality?` | `number` |
| `args.maxHeight?` | `number` |
| `args.maxWidth?` | `number` |

#### Returns

`Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\>

#### Defined in

[nomo_api.ts:252](https://github.com/nomo-app/nomo-plugin-kit/blob/22fe6be/nomo-plugin-kit/src/nomo_api.ts#L252)
