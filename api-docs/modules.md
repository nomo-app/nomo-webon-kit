[nomo-webon-kit](README.md) / Exports

# nomo-webon-kit

## Table of contents

### Interfaces

- [NomoAsset](interfaces/NomoAsset.md)
- [NomoAssetSelector](interfaces/NomoAssetSelector.md)
- [NomoManifest](interfaces/NomoManifest.md)
- [NomoNFT](interfaces/NomoNFT.md)
- [NomoProofOfPayment](interfaces/NomoProofOfPayment.md)

### Type Aliases

- [NomoCoinType](modules.md#nomocointype)
- [NomoEvmNetwork](modules.md#nomoevmnetwork)
- [NomoExecutionMode](modules.md#nomoexecutionmode)
- [NomoHostingMode](modules.md#nomohostingmode)
- [NomoNetwork](modules.md#nomonetwork)
- [NomoTheme](modules.md#nomotheme)
- [NomoWebView](modules.md#nomowebview)

### Variables

- [nomo](modules.md#nomo)
- [nomoConsole](modules.md#nomoconsole)
- [nomoLocalStorage](modules.md#nomolocalstorage)

### Functions

- [compareSemanticVersions](modules.md#comparesemanticversions)
- [getCurrentNomoTheme](modules.md#getcurrentnomotheme)
- [hasMinimumNomoVersion](modules.md#hasminimumnomoversion)
- [injectNomoCSSVariables](modules.md#injectnomocssvariables)
- [invokeNomoFunction](modules.md#invokenomofunction)
- [invokeNomoFunctionCached](modules.md#invokenomofunctioncached)
- [isFallbackModeActive](modules.md#isfallbackmodeactive)
- [nomoAddCustomToken](modules.md#nomoaddcustomtoken)
- [nomoAuthFetch](modules.md#nomoauthfetch)
- [nomoAuthHttp](modules.md#nomoauthhttp)
- [nomoCheckForWebOnUpdate](modules.md#nomocheckforwebonupdate)
- [nomoEnableMobileConsoleDebugging](modules.md#nomoenablemobileconsoledebugging)
- [nomoFallbackQRCode](modules.md#nomofallbackqrcode)
- [nomoGetAssetIcon](modules.md#nomogetasseticon)
- [nomoGetAssetPrice](modules.md#nomogetassetprice)
- [nomoGetBalance](modules.md#nomogetbalance)
- [nomoGetDeviceHashes](modules.md#nomogetdevicehashes)
- [nomoGetDeviceName](modules.md#nomogetdevicename)
- [nomoGetEvmAddress](modules.md#nomogetevmaddress)
- [nomoGetExecutionMode](modules.md#nomogetexecutionmode)
- [nomoGetExtendedPublicKey](modules.md#nomogetextendedpublickey)
- [nomoGetInstalledWebOns](modules.md#nomogetinstalledwebons)
- [nomoGetLanguage](modules.md#nomogetlanguage)
- [nomoGetManifest](modules.md#nomogetmanifest)
- [nomoGetMessengerAddress](modules.md#nomogetmessengeraddress)
- [nomoGetNFTs](modules.md#nomogetnfts)
- [nomoGetPlatformInfo](modules.md#nomogetplatforminfo)
- [nomoGetTransactions](modules.md#nomogettransactions)
- [nomoGetVisibleAssets](modules.md#nomogetvisibleassets)
- [nomoGetWalletAddresses](modules.md#nomogetwalletaddresses)
- [nomoInjectQRCode](modules.md#nomoinjectqrcode)
- [nomoInstallUrlAsWebOn](modules.md#nomoinstallurlaswebon)
- [nomoInstallWebOn](modules.md#nomoinstallwebon)
- [nomoLaunchSmartchainFaucet](modules.md#nomolaunchsmartchainfaucet)
- [nomoLaunchUrl](modules.md#nomolaunchurl)
- [nomoLaunchUrlAsWebOn](modules.md#nomolaunchurlaswebon)
- [nomoLaunchWebOn](modules.md#nomolaunchwebon)
- [nomoMigrateAndSelfDestroy](modules.md#nomomigrateandselfdestroy)
- [nomoMnemonicBackupExisted](modules.md#nomomnemonicbackupexisted)
- [nomoOpenFAQPage](modules.md#nomoopenfaqpage)
- [nomoPickFromGallery](modules.md#nomopickfromgallery)
- [nomoProofOfPayment](modules.md#nomoproofofpayment)
- [nomoQrScan](modules.md#nomoqrscan)
- [nomoRegisterOnWebOnVisible](modules.md#nomoregisteronwebonvisible)
- [nomoReplaceWebOn](modules.md#nomoreplacewebon)
- [nomoSelectAssetFromDialog](modules.md#nomoselectassetfromdialog)
- [nomoSendAssets](modules.md#nomosendassets)
- [nomoSignAuthMessage](modules.md#nomosignauthmessage)
- [nomoSignEvmMessage](modules.md#nomosignevmmessage)
- [nomoSignEvmTransaction](modules.md#nomosignevmtransaction)
- [nomoTakePicture](modules.md#nomotakepicture)
- [nomoUninstallWebOn](modules.md#nomouninstallwebon)
- [stringifyWithBigInts](modules.md#stringifywithbigints)
- [switchNomoTheme](modules.md#switchnomotheme)

## Type Aliases

### NomoCoinType

Ƭ **NomoCoinType**: ``"btc"`` \| ``"ltc"`` \| ``"ec8"`` \| ``"bch"`` \| ``"zeniq"``

#### Defined in

[nomo_web3.ts:299](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L299)

___

### NomoEvmNetwork

Ƭ **NomoEvmNetwork**: ``"zeniq-smart-chain"`` \| ``"ethereum"`` \| ``"binance-smart-chain"``

#### Defined in

[nomo_web3.ts:9](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L9)

___

### NomoExecutionMode

Ƭ **NomoExecutionMode**: ``"PRODUCTION"`` \| ``"DEV"`` \| ``"DEV_DEV"`` \| ``"FALLBACK"``

#### Defined in

[nomo_platform.ts:8](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L8)

___

### NomoHostingMode

Ƭ **NomoHostingMode**: ``"NOMO_INTEGRATED_HOSTING"`` \| ``"EXTERNAL_HOSTING"``

#### Defined in

[nomo_platform.ts:9](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L9)

___

### NomoNetwork

Ƭ **NomoNetwork**: [`NomoEvmNetwork`](modules.md#nomoevmnetwork) \| ``"bitcoin"`` \| ``"zeniq"`` \| ``"litecoin"`` \| ``"bitcoincash"``

#### Defined in

[nomo_web3.ts:13](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L13)

___

### NomoTheme

Ƭ **NomoTheme**: ``"LIGHT"`` \| ``"DARK"`` \| ``"AVINOC"`` \| ``"TUPAN"``

The themes that are supported by the Nomo App.

#### Defined in

[nomo_theming.ts:6](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_theming.ts#L6)

___

### NomoWebView

Ƭ **NomoWebView**: ``"webview_flutter"`` \| ``"webview_cef"`` \| ``"not_in_nomo_app"``

#### Defined in

[nomo_platform.ts:10](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L10)

## Variables

### nomo

• `Const` **nomo**: `Object`

The nomo-object exposes WebOn-functions in an easy-to-use way.
The nomo-object can be used with only one import and supports the auto-completion of IDEs.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addCustomToken` | (`args`: [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) & { `contractAddress`: `string` ; `network`: [`NomoEvmNetwork`](modules.md#nomoevmnetwork)  }) => `Promise`<`void`\> |
| `authFetch` | (`args`: { `body?`: `string` ; `headers?`: { `[key: string]`: `string`;  } ; `method?`: ``"GET"`` \| ``"POST"`` ; `signer?`: (`args`: { `message`: `string` ; `url`: `string`  }) => `Promise`<{ `authAddress`: `string` ; `authSig`: `string` ; `ethAddress`: `string` ; `ethSig`: `string`  }\> ; `url`: `string`  }) => `Promise`<{ `response`: `string` ; `statusCode`: `number`  }\> |
| `authHttp` | (`args`: `string` \| { `body?`: `string` ; `headers?`: { `[key: string]`: `string`;  } ; `method?`: ``"GET"`` \| ``"POST"`` ; `url`: `string`  }) => `Promise`<{ `response`: `string` ; `statusCode`: `number`  }\> |
| `checkForWebOnUpdate` | () => `Promise`<`void`\> |
| `enableMobileConsoleDebugging` | () => `Promise`<`void`\> |
| `fallbackQRCode` | () => `void` |
| `getAssetIcon` | (`args`: [`NomoAssetSelector`](interfaces/NomoAssetSelector.md)) => `Promise`<{ `isPending`: `boolean` ; `large`: `string` ; `name`: `string` ; `small`: `string` ; `symbol`: `string` ; `thumb`: `string`  }\> |
| `getAssetPrice` | (`args`: [`NomoAssetSelector`](interfaces/NomoAssetSelector.md)) => `Promise`<{ `currencyDisplayName`: `string` ; `currencySymbol`: `string` ; `price`: `number`  }\> |
| `getBalance` | (`args`: [`NomoAssetSelector`](interfaces/NomoAssetSelector.md)) => `Promise`<[`NomoAsset`](interfaces/NomoAsset.md) & { `balance`: `string`  }\> |
| `getCurrentNomoTheme` | () => `Promise`<{ `colors`: { `background`: `string` ; `disabledColor`: `string` ; `error`: `string` ; `foreground1`: `string` ; `foreground2`: `string` ; `foreground3`: `string` ; `onPrimary`: `string` ; `onSecondary`: `string` ; `primary`: `string` ; `primaryContainer`: `string` ; `secondary`: `string` ; `secondaryContainer`: `string` ; `settingsColumnColor`: `string` ; `settingsTileColor`: `string` ; `snackBarColor`: `string` ; `surface`: `string`  } ; `displayName`: `string` ; `name`: `string`  }\> |
| `getDeviceHashes` | () => `Promise`<{ `deviceHashes`: `string`  }\> |
| `getDeviceName` | () => `Promise`<{ `deviceName`: `string`  }\> |
| `getEvmAddress` | () => `Promise`<`string`\> |
| `getExecutionMode` | () => `Promise`<{ `cardMode`: `boolean` \| ``null`` ; `executionMode`: [`NomoExecutionMode`](modules.md#nomoexecutionmode) ; `hostingMode`: [`NomoHostingMode`](modules.md#nomohostingmode) \| ``null`` ; `webView`: [`NomoWebView`](modules.md#nomowebview)  }\> |
| `getExtendedPublicKey` | (`args`: [`NomoAssetSelector`](interfaces/NomoAssetSelector.md)) => `Promise`<`any`\> |
| `getInstalledWebOns` | () => `Promise`<{ `manifests`: [`NomoManifest`](interfaces/NomoManifest.md)[]  }\> |
| `getLanguage` | () => `Promise`<{ `language`: `string`  }\> |
| `getManifest` | () => `Promise`<[`NomoManifest`](interfaces/NomoManifest.md)\> |
| `getMessengerAddress` | () => `Promise`<{ `inviteLink`: `string` ; `messengerAddress`: `string`  }\> |
| `getNFTs` | (`args`: { `network`: [`NomoEvmNetwork`](modules.md#nomoevmnetwork)  }) => `Promise`<{ `nfts`: [`NomoNFT`](interfaces/NomoNFT.md)[]  }\> |
| `getPlatformInfo` | () => `Promise`<{ `appName`: `string` ; `buildNumber`: `string` ; `clientName`: `string` ; `operatingSystem`: `string` ; `version`: `string`  }\> |
| `getTransactions` | (`args`: [`NomoAssetSelector`](interfaces/NomoAssetSelector.md)) => `Promise`<`any`\> |
| `getVisibleAssets` | () => `Promise`<{ `visibleAssets`: [`NomoAsset`](interfaces/NomoAsset.md)[]  }\> |
| `getWalletAddresses` | () => `Promise`<{ `walletAddresses`: `Record`<`string`, `string`\>  }\> |
| `hasMinimumNomoVersion` | (`args`: { `minVersion`: `string`  }) => `Promise`<{ `minVersionFulfilled`: `boolean` ; `nomoVersion`: `string`  }\> |
| `injectNomoCSSVariables` | () => `Promise`<`void`\> |
| `injectQRCode` | (`args`: { `navigateBack`: `boolean` ; `qrCode`: `string`  }) => `Promise`<`void`\> |
| `installUrlAsWebOn` | (`args`: { `manifest`: [`NomoManifest`](interfaces/NomoManifest.md) ; `navigateBack`: `boolean` ; `skipPermissionDialog`: `boolean`  }) => `Promise`<`void`\> |
| `installWebOn` | (`args`: { `deeplink`: `string` ; `navigateBack`: `boolean` ; `skipPermissionDialog`: `boolean`  }) => `Promise`<`void`\> |
| `launchSmartchainFaucet` | () => `Promise`<`void`\> |
| `launchUrl` | (`args`: { `launchMode`: ``"platformDefault"`` \| ``"inAppWebView"`` \| ``"externalApplication"`` \| ``"externalNonBrowserApplication"`` ; `url`: `string`  }) => `Promise`<`any`\> |
| `launchUrlAsWebOn` | (`args`: { `manifest`: [`NomoManifest`](interfaces/NomoManifest.md)  }) => `Promise`<`any`\> |
| `launchWebOn` | (`args`: { `manifest`: [`NomoManifest`](interfaces/NomoManifest.md) ; `payload`: `string`  }) => `Promise`<`void`\> |
| `localStorage` | { `getItem`: (`key`: `string`, `options?`: { `webon_id`: `string`  }) => `Promise`<``null`` \| `String`\> ; `removeItem`: (`key`: `string`) => `Promise`<`void`\> ; `setItem`: (`key`: `string`, `value`: `string`) => `Promise`<`void`\>  } |
| `localStorage.getItem` | (`key`: `string`, `options?`: { `webon_id`: `string`  }) => `Promise`<``null`` \| `String`\> |
| `localStorage.removeItem` | (`key`: `string`) => `Promise`<`void`\> |
| `localStorage.setItem` | (`key`: `string`, `value`: `string`) => `Promise`<`void`\> |
| `migrateAndSelfDestroy` | (`args`: { `new_deeplink`: `string`  }) => `Promise`<`void`\> |
| `mnemonicBackupExisted` | () => `Promise`<{ `mnemonicBackupExisted`: `boolean`  }\> |
| `openFAQPage` | (`args`: { `faqContent`: `Record`<`string`, `Record`<`string`, `string`\>\> ; `initiallyExpanded`: `boolean` ; `supportButtonTitle?`: `string` ; `supportButtonUrl?`: `string`  }) => `Promise`<`void`\> |
| `pickFromGallery` | (`args?`: { `imageQuality?`: `number` ; `maxHeight?`: `number` ; `maxWidth?`: `number`  }) => `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\> |
| `proofOfPayment` | (`args`: { `coin`: [`NomoCoinType`](modules.md#nomocointype) ; `hash`: `string` ; `nonce?`: `string`  }) => `Promise`<[`NomoProofOfPayment`](interfaces/NomoProofOfPayment.md)\> |
| `qrScan` | () => `Promise`<{ `qrCode`: `string`  }\> |
| `registerOnWebOnVisible` | (`callback`: (`args`: { `cardMode`: `boolean`  }) => `void`) => `Promise`<`void`\> |
| `replaceWebOn` | (`args`: { `navigateBack`: `boolean` ; `new_deeplink`: `string` ; `old_webon_url`: `string`  }) => `Promise`<`void`\> |
| `selectAssetFromDialog` | () => `Promise`<{ `selectedAsset`: [`NomoAsset`](interfaces/NomoAsset.md) & { `balance`: `string`  }  }\> |
| `sendAssets` | (`args`: { `amount`: `string` ; `asset`: [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) ; `targetAddress`: `string`  }) => `Promise`<{ `hash`: `string` ; `intent`: { `amount`: `string` ; `recipient`: `string` ; `token`: `string`  }  }\> |
| `signAuthMessage` | (`args`: { `message`: `string` ; `url`: `string`  }) => `Promise`<{ `authAddress`: `string` ; `authSig`: `string` ; `ethAddress`: `string` ; `ethSig`: `string`  }\> |
| `signEvmMessage` | (`args`: { `message`: `string`  }) => `Promise`<{ `sigHex`: `string`  }\> |
| `signEvmTransaction` | (`args`: { `messageHex`: `string`  }) => `Promise`<{ `sigHex`: `string`  }\> |
| `switchNomoTheme` | (`args`: { `theme`: [`NomoTheme`](modules.md#nomotheme)  }) => `Promise`<`void`\> |
| `takePicture` | (`args?`: { `imageQuality?`: `number` ; `maxHeight?`: `number` ; `maxWidth?`: `number`  }) => `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\> |
| `uninstallWebOn` | (`args`: { `webon_url`: `string`  }) => `Promise`<`void`\> |

#### Defined in

[nomo_api.ts:12](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_api.ts#L12)

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

[nomo_platform.ts:151](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L151)

___

### nomoLocalStorage

• `Const` **nomoLocalStorage**: `Object`

nomoLocalStorage provides a mechanism for sharing data between WebOns.
If a webon_id is passed to nomoLocalStorage.getItem, then it tries to read data from another WebOn with the given webon_id.
nomoLocalStorage can also be used as an alternative to the regular localStorage.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getItem` | (`key`: `string`, `options?`: { `webon_id`: `string`  }) => `Promise`<``null`` \| `String`\> |
| `removeItem` | (`key`: `string`) => `Promise`<`void`\> |
| `setItem` | (`key`: `string`, `value`: `string`) => `Promise`<`void`\> |

#### Defined in

[nomo_multi_webons.ts:245](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L245)

## Functions

### compareSemanticVersions

▸ **compareSemanticVersions**(`versionA`, `versionB`): ``0`` \| ``1`` \| ``-1``

A low-level function. We recommend calling "hasMinimumNomoVersion" instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `versionA` | `string` |
| `versionB` | `string` |

#### Returns

``0`` \| ``1`` \| ``-1``

#### Defined in

[util.ts:11](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/util.ts#L11)

___

### getCurrentNomoTheme

▸ **getCurrentNomoTheme**(): `Promise`<{ `colors`: { `background`: `string` ; `disabledColor`: `string` ; `error`: `string` ; `foreground1`: `string` ; `foreground2`: `string` ; `foreground3`: `string` ; `onPrimary`: `string` ; `onSecondary`: `string` ; `primary`: `string` ; `primaryContainer`: `string` ; `secondary`: `string` ; `secondaryContainer`: `string` ; `settingsColumnColor`: `string` ; `settingsTileColor`: `string` ; `snackBarColor`: `string` ; `surface`: `string`  } ; `displayName`: `string` ; `name`: `string`  }\>

A low-level function. We recommend using "injectNomoCSSVariables" instead.

#### Returns

`Promise`<{ `colors`: { `background`: `string` ; `disabledColor`: `string` ; `error`: `string` ; `foreground1`: `string` ; `foreground2`: `string` ; `foreground3`: `string` ; `onPrimary`: `string` ; `onSecondary`: `string` ; `primary`: `string` ; `primaryContainer`: `string` ; `secondary`: `string` ; `secondaryContainer`: `string` ; `settingsColumnColor`: `string` ; `settingsTileColor`: `string` ; `snackBarColor`: `string` ; `surface`: `string`  } ; `displayName`: `string` ; `name`: `string`  }\>

#### Defined in

[nomo_theming.ts:53](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_theming.ts#L53)

___

### hasMinimumNomoVersion

▸ **hasMinimumNomoVersion**(`args`): `Promise`<{ `minVersionFulfilled`: `boolean` ; `nomoVersion`: `string`  }\>

This function checks at runtime if the Nomo App has a minimum version.
It is also possible to require a minimum Nomo App version in the manifest.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.minVersion` | `string` |

#### Returns

`Promise`<{ `minVersionFulfilled`: `boolean` ; `nomoVersion`: `string`  }\>

#### Defined in

[nomo_platform.ts:16](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L16)

___

### injectNomoCSSVariables

▸ **injectNomoCSSVariables**(): `Promise`<`void`\>

Injects CSS variables that automatically adjust according to the currently selected Nomo theme.

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_theming.ts:199](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_theming.ts#L199)

___

### invokeNomoFunction

▸ **invokeNomoFunction**(`functionName`, `args`): `Promise`<`any`\>

A low-level function used by other Nomo APIs.
This is the main entry point into the native layer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `args` | ``null`` \| `object` |

#### Returns

`Promise`<`any`\>

#### Defined in

[dart_interface.ts:81](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/dart_interface.ts#L81)

___

### invokeNomoFunctionCached

▸ **invokeNomoFunctionCached**(`functionName`, `args`): `Promise`<`any`\>

A cached wrapper on top of "invokeNomoFunction".
For idempotent functions, this cache prevents unnecessary calls to the native layer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `args` | ``null`` \| `object` |

#### Returns

`Promise`<`any`\>

#### Defined in

[dart_interface.ts:57](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/dart_interface.ts#L57)

___

### isFallbackModeActive

▸ **isFallbackModeActive**(): `boolean`

Returns true if the code is not running within a Nomo App WebView.

#### Returns

`boolean`

#### Defined in

[dart_interface.ts:25](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/dart_interface.ts#L25)

___

### nomoAddCustomToken

▸ **nomoAddCustomToken**(`args`): `Promise`<`void`\>

Adds a custom token to the list of visible assets in the Nomo Wallet.
Before that, it opens a dialog for the user to confirm.

Needs nomo.permission.ADD_CUSTOM_TOKEN.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) & { `contractAddress`: `string` ; `network`: [`NomoEvmNetwork`](modules.md#nomoevmnetwork)  } |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_web3.ts:239](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L239)

___

### nomoAuthFetch

▸ **nomoAuthFetch**(`args`): `Promise`<{ `response`: `string` ; `statusCode`: `number`  }\>

A browser-implementation of the Nomo-Auth-Protocol.
It is similar to nomoAuthHttp, but it is implemented in JavaScript instead of the native layer.
Therefore, is much easier to debug or modify, although it cannot bypass CORS.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.body?` | `string` |
| `args.headers?` | `Object` |
| `args.method?` | ``"GET"`` \| ``"POST"`` |
| `args.signer?` | (`args`: { `message`: `string` ; `url`: `string`  }) => `Promise`<{ `authAddress`: `string` ; `authSig`: `string` ; `ethAddress`: `string` ; `ethSig`: `string`  }\> |
| `args.url` | `string` |

#### Returns

`Promise`<{ `response`: `string` ; `statusCode`: `number`  }\>

#### Defined in

[nomo_auth.ts:40](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_auth.ts#L40)

___

### nomoAuthHttp

▸ **nomoAuthHttp**(`args`): `Promise`<{ `response`: `string` ; `statusCode`: `number`  }\>

A native implementation of the Nomo-Auth-Protocol.
Moreover, even if you do not use Nomo-Auth, you can still use this function for bypassing CORS.
At a lower level, Nomo-Auth works by injecting a few HTTP-headers into the request.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| { `body?`: `string` ; `headers?`: { `[key: string]`: `string`;  } ; `method?`: ``"GET"`` \| ``"POST"`` ; `url`: `string`  } |

#### Returns

`Promise`<{ `response`: `string` ; `statusCode`: `number`  }\>

#### Defined in

[nomo_auth.ts:127](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_auth.ts#L127)

___

### nomoCheckForWebOnUpdate

▸ **nomoCheckForWebOnUpdate**(): `Promise`<`void`\>

This will show a dialog to the user if an update is available.
If you need to customize this dialog, then you could re-implement the same functionality in JavaScript.
Nevertheless, the Nomo App will automatically check for updates even if you never invoke "nomoCheckForWebOnUpdate".

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_platform.ts:123](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L123)

___

### nomoEnableMobileConsoleDebugging

▸ **nomoEnableMobileConsoleDebugging**(): `Promise`<`void`\>

After calling this function, console logs are visible in the
mobile DevDev-mode of the Nomo App.
For the Desktop DevDev-mode, this function is not necessary.

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_platform.ts:177](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L177)

___

### nomoFallbackQRCode

▸ **nomoFallbackQRCode**(): `void`

Detects if a WebOn is running outside of Nomo and shows a fallback-dialog if needed.

#### Returns

`void`

#### Defined in

[nomo_media.ts:124](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_media.ts#L124)

___

### nomoGetAssetIcon

▸ **nomoGetAssetIcon**(`args`): `Promise`<{ `isPending`: `boolean` ; `large`: `string` ; `name`: `string` ; `small`: `string` ; `symbol`: `string` ; `thumb`: `string`  }\>

Returns a set of URLs that contain icons of the asset.
May throw an error if no icons can be found.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) |

#### Returns

`Promise`<{ `isPending`: `boolean` ; `large`: `string` ; `name`: `string` ; `small`: `string` ; `symbol`: `string` ; `thumb`: `string`  }\>

#### Defined in

[nomo_web3.ts:160](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L160)

___

### nomoGetAssetPrice

▸ **nomoGetAssetPrice**(`args`): `Promise`<{ `currencyDisplayName`: `string` ; `currencySymbol`: `string` ; `price`: `number`  }\>

Returns an asset price.
Might be slow if a price is not yet in the Nomo App's cache.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) |

#### Returns

`Promise`<{ `currencyDisplayName`: `string` ; `currencySymbol`: `string` ; `price`: `number`  }\>

#### Defined in

[nomo_web3.ts:176](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L176)

___

### nomoGetBalance

▸ **nomoGetBalance**(`args`): `Promise`<[`NomoAsset`](interfaces/NomoAsset.md) & { `balance`: `string`  }\>

Returns not only the balance of an asset, but also additional information like the network, a contract-address and a receive-address.
Typically, the decimals are needed to convert a raw balance into a user-readable balance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) |

#### Returns

`Promise`<[`NomoAsset`](interfaces/NomoAsset.md) & { `balance`: `string`  }\>

#### Defined in

[nomo_web3.ts:202](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L202)

___

### nomoGetDeviceHashes

▸ **nomoGetDeviceHashes**(): `Promise`<{ `deviceHashes`: `string`  }\>

Returns a comma-separated list of device hashes.
Can be used for fingerprinting devices.

Needs nomo.permission.DEVICE_FINGERPRINTING.

#### Returns

`Promise`<{ `deviceHashes`: `string`  }\>

#### Defined in

[nomo_platform.ts:80](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L80)

___

### nomoGetDeviceName

▸ **nomoGetDeviceName**(): `Promise`<{ `deviceName`: `string`  }\>

Returns a human-readable name of the device.

Needs nomo.permission.DEVICE_FINGERPRINTING.

#### Returns

`Promise`<{ `deviceName`: `string`  }\>

#### Defined in

[nomo_platform.ts:97](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L97)

___

### nomoGetEvmAddress

▸ **nomoGetEvmAddress**(): `Promise`<`string`\>

A convenience function to get the Smartchain address of the Nomo Wallet.
Internally, it calls "nomoGetWalletAddresses" and caches the result.

#### Returns

`Promise`<`string`\>

#### Defined in

[nomo_web3.ts:134](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L134)

___

### nomoGetExecutionMode

▸ **nomoGetExecutionMode**(): `Promise`<{ `cardMode`: `boolean` \| ``null`` ; `executionMode`: [`NomoExecutionMode`](modules.md#nomoexecutionmode) ; `hostingMode`: [`NomoHostingMode`](modules.md#nomohostingmode) \| ``null`` ; `webView`: [`NomoWebView`](modules.md#nomowebview)  }\>

Gets details about the execution environment of the WebOn.
See the advanced docs for more details about execution modes: https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs

#### Returns

`Promise`<{ `cardMode`: `boolean` \| ``null`` ; `executionMode`: [`NomoExecutionMode`](modules.md#nomoexecutionmode) ; `hostingMode`: [`NomoHostingMode`](modules.md#nomohostingmode) \| ``null`` ; `webView`: [`NomoWebView`](modules.md#nomowebview)  }\>

#### Defined in

[nomo_platform.ts:57](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L57)

___

### nomoGetExtendedPublicKey

▸ **nomoGetExtendedPublicKey**(`args`): `Promise`<`any`\>

An extended public key is a public key that allows to derive all the addresses of a Nomo Wallet.
This is only intended for UTXO-based assets.

Since Nomo App 0.3.8.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[nomo_web3.ts:227](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L227)

___

### nomoGetInstalledWebOns

▸ **nomoGetInstalledWebOns**(): `Promise`<{ `manifests`: [`NomoManifest`](interfaces/NomoManifest.md)[]  }\>

Gets all manifests of the installed WebOns, including information like name/id/version.

Needs nomo.permission.GET_INSTALLED_WEBONS.

#### Returns

`Promise`<{ `manifests`: [`NomoManifest`](interfaces/NomoManifest.md)[]  }\>

#### Defined in

[nomo_multi_webons.ts:153](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L153)

___

### nomoGetLanguage

▸ **nomoGetLanguage**(): `Promise`<{ `language`: `string`  }\>

Returns the currently selected language of the Nomo App.

#### Returns

`Promise`<{ `language`: `string`  }\>

#### Defined in

[nomo_platform.ts:111](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L111)

___

### nomoGetManifest

▸ **nomoGetManifest**(): `Promise`<[`NomoManifest`](interfaces/NomoManifest.md)\>

Returns the nomo_manifest.json that was used during the installation of the WebOn.
For example, this can be used by a WebOn for checking its own version.

#### Returns

`Promise`<[`NomoManifest`](interfaces/NomoManifest.md)\>

#### Defined in

[nomo_multi_webons.ts:75](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L75)

___

### nomoGetMessengerAddress

▸ **nomoGetMessengerAddress**(): `Promise`<{ `inviteLink`: `string` ; `messengerAddress`: `string`  }\>

Can be used for chatting with other NOMO-users, but also for push-notifications or chat-bots.

Needs nomo.permission.SEND_MESSAGE.

#### Returns

`Promise`<{ `inviteLink`: `string` ; `messengerAddress`: `string`  }\>

#### Defined in

[nomo_media.ts:109](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_media.ts#L109)

___

### nomoGetNFTs

▸ **nomoGetNFTs**(`args`): `Promise`<{ `nfts`: [`NomoNFT`](interfaces/NomoNFT.md)[]  }\>

Returns a list of NFTs that are owned by the user.
Can be slow if the NFTs are not yet in the Nomo App's cache.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.network` | [`NomoEvmNetwork`](modules.md#nomoevmnetwork) |

#### Returns

`Promise`<{ `nfts`: [`NomoNFT`](interfaces/NomoNFT.md)[]  }\>

#### Defined in

[nomo_web3.ts:287](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L287)

___

### nomoGetPlatformInfo

▸ **nomoGetPlatformInfo**(): `Promise`<{ `appName`: `string` ; `buildNumber`: `string` ; `clientName`: `string` ; `operatingSystem`: `string` ; `version`: `string`  }\>

Returns both the NOMO-version and the operating system where the WebOn runs.
Can be used for implementing platform-specific functionality.
See https://nomo.app/ for an overview of supported platforms.

#### Returns

`Promise`<{ `appName`: `string` ; `buildNumber`: `string` ; `clientName`: `string` ; `operatingSystem`: `string` ; `version`: `string`  }\>

#### Defined in

[nomo_platform.ts:34](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L34)

___

### nomoGetTransactions

▸ **nomoGetTransactions**(`args`): `Promise`<`any`\>

Returns a list of transactions from the Nomo Wallet's transaction-cache.
Might fail if the transaction-cache is not yet synchronized.

Since Nomo App 0.3.8.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[nomo_web3.ts:215](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L215)

___

### nomoGetVisibleAssets

▸ **nomoGetVisibleAssets**(): `Promise`<{ `visibleAssets`: [`NomoAsset`](interfaces/NomoAsset.md)[]  }\>

Returns a list of assets that are currently visible in the Nomo Wallet.

#### Returns

`Promise`<{ `visibleAssets`: [`NomoAsset`](interfaces/NomoAsset.md)[]  }\>

#### Defined in

[nomo_web3.ts:112](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L112)

___

### nomoGetWalletAddresses

▸ **nomoGetWalletAddresses**(): `Promise`<{ `walletAddresses`: `Record`<`string`, `string`\>  }\>

Returns blockchain-addresses of the NOMO-user.

#### Returns

`Promise`<{ `walletAddresses`: `Record`<`string`, `string`\>  }\>

#### Defined in

[nomo_web3.ts:142](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L142)

___

### nomoInjectQRCode

▸ **nomoInjectQRCode**(`args`): `Promise`<`void`\>

Injecting QRCodes is useful for multiple purposes.
For example, new chats can be opened by injecting a chat-invitation-link.
Also the Nomo-ID protocol works by injecting QRCodes.

Needs nomo.permission.INSTALL_WEBON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.navigateBack` | `boolean` |
| `args.qrCode` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_media.ts:14](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_media.ts#L14)

___

### nomoInstallUrlAsWebOn

▸ **nomoInstallUrlAsWebOn**(`args`): `Promise`<`void`\>

Installs a URL as a WebOn and grants the permissions that are specified in the manifest.

Needs nomo.permission.INSTALL_WEBON.
Since Nomo App 0.3.5.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.manifest` | [`NomoManifest`](interfaces/NomoManifest.md) |
| `args.navigateBack` | `boolean` |
| `args.skipPermissionDialog` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_multi_webons.ts:110](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L110)

___

### nomoInstallWebOn

▸ **nomoInstallWebOn**(`args`): `Promise`<`void`\>

Installs a WebOn with or without user interaction.
If the WebOn is already installed, it will be updated to the latest version.
See the README for an explanation about deeplinks.

Needs nomo.permission.INSTALL_WEBON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.deeplink` | `string` |
| `args.navigateBack` | `boolean` |
| `args.skipPermissionDialog` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_multi_webons.ts:96](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L96)

___

### nomoLaunchSmartchainFaucet

▸ **nomoLaunchSmartchainFaucet**(): `Promise`<`void`\>

Launches a free faucet that can be used for paying transaction fees.

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_web3.ts:251](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L251)

___

### nomoLaunchUrl

▸ **nomoLaunchUrl**(`args`): `Promise`<`any`\>

Passes a URL to the underlying platform for handling.
Typically, it will launch a system-browser or an in-app-webview.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.launchMode` | ``"platformDefault"`` \| ``"inAppWebView"`` \| ``"externalApplication"`` \| ``"externalNonBrowserApplication"`` |
| `args.url` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[nomo_multi_webons.ts:207](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L207)

___

### nomoLaunchUrlAsWebOn

▸ **nomoLaunchUrlAsWebOn**(`args`): `Promise`<`any`\>

Launches a URL as a WebOn without installing it.
Grants the permissions that are specified in the manifest.
If possible, please prefer "nomoLaunchUrl" or "nomoLaunchWebOn" over this function.

Needs nomo.permission.INSTALL_WEBON.
Since Nomo App 0.3.5.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.manifest` | [`NomoManifest`](interfaces/NomoManifest.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[nomo_multi_webons.ts:230](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L230)

___

### nomoLaunchWebOn

▸ **nomoLaunchWebOn**(`args`): `Promise`<`void`\>

Opens another WebOn on top of the current WebOn.
If the WebOn is not yet running, the WebOn will be launched.
If the WebOn is not yet installed, an error is thrown.
A payload can be passed to the WebOn.
Afterwards, the user may navigate back to the current WebOn by pressing the back button.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.manifest` | [`NomoManifest`](interfaces/NomoManifest.md) |
| `args.payload` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_multi_webons.ts:196](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L196)

___

### nomoMigrateAndSelfDestroy

▸ **nomoMigrateAndSelfDestroy**(`args`): `Promise`<`void`\>

Replaces the currently running WebOn with another WebOn on a different deeplink.

Needs nomo.permission.INSTALL_WEBON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.new_deeplink` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_multi_webons.ts:164](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L164)

___

### nomoMnemonicBackupExisted

▸ **nomoMnemonicBackupExisted**(): `Promise`<{ `mnemonicBackupExisted`: `boolean`  }\>

If true, then the user has made a backup of their 12 words (at some point in the past).
If false, then there exists no backup and the 12 words will get lost with a high probability.

#### Returns

`Promise`<{ `mnemonicBackupExisted`: `boolean`  }\>

#### Defined in

[nomo_web3.ts:263](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L263)

___

### nomoOpenFAQPage

▸ **nomoOpenFAQPage**(`args`): `Promise`<`void`\>

Opens a standardized FAQ page in Nomo design.
"faqContent" should be a nested object of questions and answers (with depth=2).
Optionally, a button for contacting support is shown below of the FAQs.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.faqContent` | `Record`<`string`, `Record`<`string`, `string`\>\> |
| `args.initiallyExpanded` | `boolean` |
| `args.supportButtonTitle?` | `string` |
| `args.supportButtonUrl?` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_media.ts:36](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_media.ts#L36)

___

### nomoPickFromGallery

▸ **nomoPickFromGallery**(`args?`): `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\>

Opens an image-picker and returns an image in base64-encoding.
The promise rejects if the user chooses to cancel.

Needs nomo.permission.READ_MEDIA.

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

[nomo_media.ts:83](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_media.ts#L83)

___

### nomoProofOfPayment

▸ **nomoProofOfPayment**(`args`): `Promise`<[`NomoProofOfPayment`](interfaces/NomoProofOfPayment.md)\>

Returns a proof-of-payment for a transaction

Needs nomo.permission.SIGN_EVM_MESSAGE.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.coin` | [`NomoCoinType`](modules.md#nomocointype) |
| `args.hash` | `string` |
| `args.nonce?` | `string` |

#### Returns

`Promise`<[`NomoProofOfPayment`](interfaces/NomoProofOfPayment.md)\>

#### Defined in

[nomo_web3.ts:306](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L306)

___

### nomoQrScan

▸ **nomoQrScan**(): `Promise`<{ `qrCode`: `string`  }\>

Opens the camera to scan a qrCode.
Returns a raw qrCode or a list of comma-separated qrCodes.

Needs nomo.permission.CAMERA.

#### Returns

`Promise`<{ `qrCode`: `string`  }\>

#### Defined in

[nomo_media.ts:27](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_media.ts#L27)

___

### nomoRegisterOnWebOnVisible

▸ **nomoRegisterOnWebOnVisible**(`callback`): `Promise`<`void`\>

Registers a callback that will be called every time when the WebOn gets visible within the Nomo App.
For example, this can be used to refresh themes or languages when re-opening a WebOn after a pause.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`args`: { `cardMode`: `boolean`  }) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_platform.ts:131](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_platform.ts#L131)

___

### nomoReplaceWebOn

▸ **nomoReplaceWebOn**(`args`): `Promise`<`void`\>

Tries to add a WebOn and then uninstalls another WebOn if it was successfully added.

Needs nomo.permission.INSTALL_WEBON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.navigateBack` | `boolean` |
| `args.new_deeplink` | `string` |
| `args.old_webon_url` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_multi_webons.ts:135](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L135)

___

### nomoSelectAssetFromDialog

▸ **nomoSelectAssetFromDialog**(): `Promise`<{ `selectedAsset`: [`NomoAsset`](interfaces/NomoAsset.md) & { `balance`: `string`  }  }\>

Opens a dialog for the user to select an asset.
If the dialog does not look "correct", WebOns are free to call "nomoGetVisibleAssets" and implement their own dialog.

#### Returns

`Promise`<{ `selectedAsset`: [`NomoAsset`](interfaces/NomoAsset.md) & { `balance`: `string`  }  }\>

#### Defined in

[nomo_web3.ts:91](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L91)

___

### nomoSendAssets

▸ **nomoSendAssets**(`args`): `Promise`<{ `hash`: `string` ; `intent`: { `amount`: `string` ; `recipient`: `string` ; `token`: `string`  }  }\>

Opens a confirmation-dialog to send assets away from the Nomo App.
Assets are only sent if the user confirms the dialog.
"amount" should be a string that can be parsed by "BigInt.parse":  https://api.flutter.dev/flutter/dart-core/BigInt/parse.html

Needs nomo.permission.SEND_ASSETS.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.amount` | `string` |
| `args.asset` | [`NomoAssetSelector`](interfaces/NomoAssetSelector.md) |
| `args.targetAddress` | `string` |

#### Returns

`Promise`<{ `hash`: `string` ; `intent`: { `amount`: `string` ; `recipient`: `string` ; `token`: `string`  }  }\>

#### Defined in

[nomo_web3.ts:75](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L75)

___

### nomoSignAuthMessage

▸ **nomoSignAuthMessage**(`args`): `Promise`<{ `authAddress`: `string` ; `authSig`: `string` ; `ethAddress`: `string` ; `ethSig`: `string`  }\>

Returns address/signature-pairs for the Nomo-Auth-Protocol.
This is a primitive that can be used for customized authentication.
For example, the address/signature-pairs can be put into HTTP-headers.

Needs nomo.permission.SIGN_EVM_MESSAGE.
Since Nomo App 0.3.5.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.message` | `string` |
| `args.url` | `string` |

#### Returns

`Promise`<{ `authAddress`: `string` ; `authSig`: `string` ; `ethAddress`: `string` ; `ethSig`: `string`  }\>

#### Defined in

[nomo_auth.ts:12](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_auth.ts#L12)

___

### nomoSignEvmMessage

▸ **nomoSignEvmMessage**(`args`): `Promise`<{ `sigHex`: `string`  }\>

Creates an Ethereum-styled message signature.
The resulting signature is not usable for submitting transactions,
but it can be used as a proof that the user controls a wallet.

Needs nomo.permission.SIGN_EVM_MESSAGE.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.message` | `string` |

#### Returns

`Promise`<{ `sigHex`: `string`  }\>

#### Defined in

[nomo_web3.ts:56](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L56)

___

### nomoSignEvmTransaction

▸ **nomoSignEvmTransaction**(`args`): `Promise`<{ `sigHex`: `string`  }\>

Creates a signature for an EVM-based transaction.
See EthersjsNomoSigner for an example on how to use this function.

Needs nomo.permission.SIGN_EVM_TRANSACTION.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.messageHex` | `string` |

#### Returns

`Promise`<{ `sigHex`: `string`  }\>

#### Defined in

[nomo_web3.ts:42](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_web3.ts#L42)

___

### nomoTakePicture

▸ **nomoTakePicture**(`args?`): `Promise`<{ `imageBase64`: `string` ; `path`: `string`  }\>

Opens the camera and returns a picture in base64-encoding.
The promise rejects if the user chooses to cancel.
The promise may also reject if the user denied a camera-permission.

Needs nomo.permission.CAMERA.

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

[nomo_media.ts:56](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_media.ts#L56)

___

### nomoUninstallWebOn

▸ **nomoUninstallWebOn**(`args`): `Promise`<`void`\>

The reverse operation of nomoInstallWebOn.
Throws an error if the WebOn cannot be found.

Needs nomo.permission.INSTALL_WEBON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.webon_url` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_multi_webons.ts:124](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_multi_webons.ts#L124)

___

### stringifyWithBigInts

▸ **stringifyWithBigInts**(`obj`): `string`

An alternative to JSON.stringify

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`string`

#### Defined in

[util.ts:41](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/util.ts#L41)

___

### switchNomoTheme

▸ **switchNomoTheme**(`args`): `Promise`<`void`\>

Switches the Nomo App to a different theme.
It is recommended to call "injectNomoCSSVariables" after a theme has changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.theme` | [`NomoTheme`](modules.md#nomotheme) |

#### Returns

`Promise`<`void`\>

#### Defined in

[nomo_theming.ts:12](https://github.com/nomo-app/nomo-webon-kit/blob/107414c/nomo-webon-kit/src/nomo_theming.ts#L12)
