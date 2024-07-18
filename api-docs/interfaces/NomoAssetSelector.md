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

[nomo_web3.ts:29](https://github.com/nomo-app/nomo-webon-kit/blob/22e7113/nomo-webon-kit/src/nomo_web3.ts#L29)

___

### name

• `Optional` **name**: `string`

#### Defined in

[nomo_web3.ts:23](https://github.com/nomo-app/nomo-webon-kit/blob/22e7113/nomo-webon-kit/src/nomo_web3.ts#L23)

___

### network

• `Optional` **network**: [`NomoNetwork`](../modules.md#nomonetwork)

#### Defined in

[nomo_web3.ts:24](https://github.com/nomo-app/nomo-webon-kit/blob/22e7113/nomo-webon-kit/src/nomo_web3.ts#L24)

___

### symbol

• **symbol**: `string`

#### Defined in

[nomo_web3.ts:22](https://github.com/nomo-app/nomo-webon-kit/blob/22e7113/nomo-webon-kit/src/nomo_web3.ts#L22)
