[nomo-webon-kit](../README.md) / [Exports](../modules.md) / NomoAsset

# Interface: NomoAsset

## Hierarchy

- [`NomoAssetSelector`](NomoAssetSelector.md)

  ↳ **`NomoAsset`**

## Table of contents

### Properties

- [balance](NomoAsset.md#balance)
- [contractAddress](NomoAsset.md#contractaddress)
- [decimals](NomoAsset.md#decimals)
- [name](NomoAsset.md#name)
- [network](NomoAsset.md#network)
- [receiveAddress](NomoAsset.md#receiveaddress)
- [symbol](NomoAsset.md#symbol)

## Properties

### balance

• `Optional` **balance**: `string`

#### Defined in

[nomo_web3.ts:33](https://github.com/nomo-app/nomo-webon-kit/blob/95a8e52/nomo-webon-kit/src/nomo_web3.ts#L33)

___

### contractAddress

• `Optional` **contractAddress**: `string`

contractAddress is the strongest asset-selector with the highest security.
If contractAddress is specified, then name and symbol will be ignored.

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[contractAddress](NomoAssetSelector.md#contractaddress)

#### Defined in

[nomo_web3.ts:28](https://github.com/nomo-app/nomo-webon-kit/blob/95a8e52/nomo-webon-kit/src/nomo_web3.ts#L28)

___

### decimals

• **decimals**: `number`

#### Defined in

[nomo_web3.ts:31](https://github.com/nomo-app/nomo-webon-kit/blob/95a8e52/nomo-webon-kit/src/nomo_web3.ts#L31)

___

### name

• `Optional` **name**: `string`

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[name](NomoAssetSelector.md#name)

#### Defined in

[nomo_web3.ts:22](https://github.com/nomo-app/nomo-webon-kit/blob/95a8e52/nomo-webon-kit/src/nomo_web3.ts#L22)

___

### network

• `Optional` **network**: [`NomoNetwork`](../modules.md#nomonetwork)

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[network](NomoAssetSelector.md#network)

#### Defined in

[nomo_web3.ts:23](https://github.com/nomo-app/nomo-webon-kit/blob/95a8e52/nomo-webon-kit/src/nomo_web3.ts#L23)

___

### receiveAddress

• `Optional` **receiveAddress**: ``null`` \| `string`

#### Defined in

[nomo_web3.ts:32](https://github.com/nomo-app/nomo-webon-kit/blob/95a8e52/nomo-webon-kit/src/nomo_web3.ts#L32)

___

### symbol

• **symbol**: `string`

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[symbol](NomoAssetSelector.md#symbol)

#### Defined in

[nomo_web3.ts:21](https://github.com/nomo-app/nomo-webon-kit/blob/95a8e52/nomo-webon-kit/src/nomo_web3.ts#L21)
