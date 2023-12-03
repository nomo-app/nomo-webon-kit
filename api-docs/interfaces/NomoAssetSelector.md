[nomo-webon-kit](../README.md) / [Exports](../modules.md) / NomoAssetSelector

# Interface: NomoAssetSelector

## Hierarchy

- **`NomoAssetSelector`**

  ↳ [`NomoAsset`](NomoAsset.md)

## Table of contents

### Properties

- [contractAddress](NomoAssetSelector.md#contractaddress)
- [name](NomoAssetSelector.md#name)
- [network](NomoAssetSelector.md#network)
- [symbol](NomoAssetSelector.md#symbol)

## Properties

### contractAddress

• `Optional` **contractAddress**: `string`

contractAddress is the strongest asset-selector with the highest security.
If contractAddress is specified, then name and symbol will be ignored.

#### Defined in

[nomo_api.ts:24](https://github.com/nomo-app/nomo-webon-kit/blob/2fbf446/nomo-webon-kit/src/nomo_api.ts#L24)

___

### name

• `Optional` **name**: `string`

#### Defined in

[nomo_api.ts:18](https://github.com/nomo-app/nomo-webon-kit/blob/2fbf446/nomo-webon-kit/src/nomo_api.ts#L18)

___

### network

• `Optional` **network**: [`NomoNetwork`](../modules.md#nomonetwork)

#### Defined in

[nomo_api.ts:19](https://github.com/nomo-app/nomo-webon-kit/blob/2fbf446/nomo-webon-kit/src/nomo_api.ts#L19)

___

### symbol

• **symbol**: `string`

#### Defined in

[nomo_api.ts:17](https://github.com/nomo-app/nomo-webon-kit/blob/2fbf446/nomo-webon-kit/src/nomo_api.ts#L17)
