[nomo-webon-kit](../README.md) / [Exports](../modules.md) / NomoManifest

# Interface: NomoManifest

## Table of contents

### Properties

- [cache\_url](NomoManifest.md#cache_url)
- [dependencies](NomoManifest.md#dependencies)
- [min\_nomo\_version](NomoManifest.md#min_nomo_version)
- [nomo\_manifest\_version](NomoManifest.md#nomo_manifest_version)
- [permissions](NomoManifest.md#permissions)
- [webon\_icon](NomoManifest.md#webon_icon)
- [webon\_id](NomoManifest.md#webon_id)
- [webon\_name](NomoManifest.md#webon_name)
- [webon\_url](NomoManifest.md#webon_url)
- [webon\_version](NomoManifest.md#webon_version)

## Properties

### cache\_url

• `Optional` **cache\_url**: `string`

If set, the Nomo App will try to obtain a tar.gz-cache.
cache_url should be a relative path.

#### Defined in

[nomo_multi_webons.ts:50](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L50)

___

### dependencies

• `Optional` **dependencies**: `string`[]

A list of additional content for the WebOn; one of the following:
- A JavaScript-URL to be injected into the WebOn.
- A social media link or a link to a website.

#### Defined in

[nomo_multi_webons.ts:56](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L56)

___

### min\_nomo\_version

• `Optional` **min\_nomo\_version**: ``null`` \| `string`

If min_nomo_version is set, then outdated versions of the Nomo App will refuse to install the WebOn.

#### Defined in

[nomo_multi_webons.ts:13](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L13)

___

### nomo\_manifest\_version

• **nomo\_manifest\_version**: `string`

nomo_manifest_version should be 1.1.0.

#### Defined in

[nomo_multi_webons.ts:17](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L17)

___

### permissions

• **permissions**: `string`[]

A list of permissions for security-critical features.

#### Defined in

[nomo_multi_webons.ts:21](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L21)

___

### webon\_icon

• `Optional` **webon\_icon**: `string`

webon_icon should be a URL to a png-icon.
If not specified, Nomo App will use the default URL "/nomo_icon.png".

#### Defined in

[nomo_multi_webons.ts:40](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L40)

___

### webon\_id

• **webon\_id**: `string`

webon_id should be the reverse-domain of a domain that is owned by the WebOn-author.
See https://en.wikipedia.org/wiki/Reverse_domain_name_notation for more details about the reverse domain name notation.

#### Defined in

[nomo_multi_webons.ts:26](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L26)

___

### webon\_name

• **webon\_name**: `string`

webon_name is the user-visible name of the WebOn.

#### Defined in

[nomo_multi_webons.ts:30](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L30)

___

### webon\_url

• **webon\_url**: `string`

webon_url is the URL that the Nomo App uses for installing the WebOn.
Typically, webon_url gets extracted out of a deeplink that is supplied to the Nomo App.

#### Defined in

[nomo_multi_webons.ts:35](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L35)

___

### webon\_version

• **webon\_version**: `string`

webon_version should comply with the semantic versioning standard.
See https://semver.org/ for details.

#### Defined in

[nomo_multi_webons.ts:45](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_multi_webons.ts#L45)
