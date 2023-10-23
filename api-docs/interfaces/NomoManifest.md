[nomo-plugin-kit](../README.md) / [Exports](../modules.md) / NomoManifest

# Interface: NomoManifest

## Table of contents

### Properties

- [min\_nomo\_version](NomoManifest.md#min_nomo_version)
- [nomo\_manifest\_version](NomoManifest.md#nomo_manifest_version)
- [permissions](NomoManifest.md#permissions)
- [plugin\_id](NomoManifest.md#plugin_id)
- [plugin\_name](NomoManifest.md#plugin_name)
- [plugin\_url](NomoManifest.md#plugin_url)
- [plugin\_version](NomoManifest.md#plugin_version)

## Properties

### min\_nomo\_version

• `Optional` **min\_nomo\_version**: ``null`` \| `string`

If min_nomo_version is set, then outdated versions of the Nomo App will refuse to install the plugin.

#### Defined in

[nomo_api.ts:615](https://github.com/nomo-app/nomo-plugin-kit/blob/1fb7f0c/nomo-plugin-kit/src/nomo_api.ts#L615)

___

### nomo\_manifest\_version

• **nomo\_manifest\_version**: `string`

nomo_manifest_version should be 1.1.0.

#### Defined in

[nomo_api.ts:619](https://github.com/nomo-app/nomo-plugin-kit/blob/1fb7f0c/nomo-plugin-kit/src/nomo_api.ts#L619)

___

### permissions

• **permissions**: `string`[]

A list of permissions for security-critical features.

#### Defined in

[nomo_api.ts:623](https://github.com/nomo-app/nomo-plugin-kit/blob/1fb7f0c/nomo-plugin-kit/src/nomo_api.ts#L623)

___

### plugin\_id

• **plugin\_id**: `string`

plugin_id should be the reverse-domain of a domain that is owned by the plugin-author.
See https://en.wikipedia.org/wiki/Reverse_domain_name_notation for more details about the reverse domain name notation.

#### Defined in

[nomo_api.ts:628](https://github.com/nomo-app/nomo-plugin-kit/blob/1fb7f0c/nomo-plugin-kit/src/nomo_api.ts#L628)

___

### plugin\_name

• **plugin\_name**: `string`

plugin_name is the user-visible name of the plugin.

#### Defined in

[nomo_api.ts:632](https://github.com/nomo-app/nomo-plugin-kit/blob/1fb7f0c/nomo-plugin-kit/src/nomo_api.ts#L632)

___

### plugin\_url

• **plugin\_url**: `string`

plugin_url is the URL that the Nomo App uses for installing the plugin.
Typically, plugin_url gets extracted out of a deeplink that is supplied to the Nomo App.

#### Defined in

[nomo_api.ts:637](https://github.com/nomo-app/nomo-plugin-kit/blob/1fb7f0c/nomo-plugin-kit/src/nomo_api.ts#L637)

___

### plugin\_version

• **plugin\_version**: `string`

plugin_version should comply with the semantic versioning standard.
See https://semver.org/ for details.

#### Defined in

[nomo_api.ts:642](https://github.com/nomo-app/nomo-plugin-kit/blob/1fb7f0c/nomo-plugin-kit/src/nomo_api.ts#L642)