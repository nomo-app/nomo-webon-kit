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

[nomo_api.ts:28](https://github.com/nomo-app/nomo-webon-kit/blob/bf8b1e1/nomo-webon-kit/src/nomo_api.ts#L28)

___

### name

• `Optional` **name**: `string`

#### Defined in

[nomo_api.ts:22](https://github.com/nomo-app/nomo-webon-kit/blob/bf8b1e1/nomo-webon-kit/src/nomo_api.ts#L22)

___

### network

• `Optional` **network**: [`NomoNetwork`](../modules.md#nomonetwork)

#### Defined in

[nomo_api.ts:23](https://github.com/nomo-app/nomo-webon-kit/blob/bf8b1e1/nomo-webon-kit/src/nomo_api.ts#L23)

___

### symbol

• **symbol**: `string`

#### Defined in

[nomo_api.ts:21](https://github.com/nomo-app/nomo-webon-kit/blob/bf8b1e1/nomo-webon-kit/src/nomo_api.ts#L21)
