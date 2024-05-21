[nomo-webon-kit](../README.md) / [Exports](../modules.md) / NomoManifest

# Interface: NomoManifest

## Table of contents

### Properties

- [cache\_sig](NomoManifest.md#cache_sig)
- [cache\_url](NomoManifest.md#cache_url)
- [dependencies](NomoManifest.md#dependencies)
- [min\_nomo\_version](NomoManifest.md#min_nomo_version)
- [nomo\_manifest\_version](NomoManifest.md#nomo_manifest_version)
- [permissions](NomoManifest.md#permissions)
- [show\_refresh\_button](NomoManifest.md#show_refresh_button)
- [url\_args](NomoManifest.md#url_args)
- [webon\_id](NomoManifest.md#webon_id)
- [webon\_name](NomoManifest.md#webon_name)
- [webon\_url](NomoManifest.md#webon_url)
- [webon\_version](NomoManifest.md#webon_version)

## Properties

### cache\_sig

• `Optional` **cache\_sig**: `string`

If set, the Nomo App will reject a cache if the signature cannot be verified.
cache_sig should be an Ethereum-styled message signature of a tar.gz-cache.

#### Defined in

[nomo_multi_webons.ts:61](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L61)

___

### cache\_url

• `Optional` **cache\_url**: `string`

If set, the Nomo App will try to obtain a tar.gz-cache.
cache_url should be a relative path.

#### Defined in

[nomo_multi_webons.ts:56](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L56)

___

### dependencies

• `Optional` **dependencies**: `string`[]

A list of additional content for the WebOn; one of the following:
- A JavaScript-URL to be injected into the WebOn.
- A social media link or a link to a website.

#### Defined in

[nomo_multi_webons.ts:68](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L68)

___

### min\_nomo\_version

• `Optional` **min\_nomo\_version**: ``null`` \| `string`

If min_nomo_version is set, then outdated versions of the Nomo App will refuse to install the WebOn.

#### Defined in

[nomo_multi_webons.ts:12](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L12)

___

### nomo\_manifest\_version

• **nomo\_manifest\_version**: `string`

nomo_manifest_version should be 1.1.0.

#### Defined in

[nomo_multi_webons.ts:16](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L16)

___

### permissions

• **permissions**: `string`[]

A list of permissions for security-critical features.

#### Defined in

[nomo_multi_webons.ts:20](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L20)

___

### show\_refresh\_button

• `Optional` **show\_refresh\_button**: `boolean`

If true, the Nomo App will show a refresh-button in the navigation bar.
Since Nomo App 0.3.5.

#### Defined in

[nomo_multi_webons.ts:51](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L51)

___

### url\_args

• `Optional` **url\_args**: `string`

url_args allows to run multiple instances of the same WebOn in parallel.
url_args is intended to be a string that starts with "?" or "#".
This is primarily useful for WebOns that are cached locally and launched programatically (e.g. launched via "nomoLaunchWebOn" from another WebOn).
Since Nomo App 0.3.6.

#### Defined in

[nomo_multi_webons.ts:41](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L41)

___

### webon\_id

• **webon\_id**: `string`

webon_id should be the reverse-domain of a domain that is owned by the WebOn-author.
See https://en.wikipedia.org/wiki/Reverse_domain_name_notation for more details about the reverse domain name notation.

#### Defined in

[nomo_multi_webons.ts:25](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L25)

___

### webon\_name

• **webon\_name**: `string`

webon_name is the user-visible name of the WebOn.

#### Defined in

[nomo_multi_webons.ts:29](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L29)

___

### webon\_url

• **webon\_url**: `string`

webon_url is the URL that the Nomo App uses for installing the WebOn.
Typically, webon_url gets extracted out of a deeplink that is supplied to the Nomo App.

#### Defined in

[nomo_multi_webons.ts:34](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L34)

___

### webon\_version

• **webon\_version**: `string`

webon_version should comply with the semantic versioning standard.
See https://semver.org/ for details.

#### Defined in

[nomo_multi_webons.ts:46](https://github.com/nomo-app/nomo-webon-kit/blob/7795cce/nomo-webon-kit/src/nomo_multi_webons.ts#L46)
