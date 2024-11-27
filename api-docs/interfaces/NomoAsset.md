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
- [uuid](NomoAsset.md#uuid)
- [visible](NomoAsset.md#visible)

## Properties

### balance

• `Optional` **balance**: `string`

#### Defined in

[nomo_web3.ts:49](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L49)

___

### contractAddress

• `Optional` **contractAddress**: `string`

contractAddress in combination with network is the strongest asset-selector with the highest security.
There are rare cases where a contractAddress is not unique across different networks (e.g. AVINOC-ZEN20/AVINOC-ERC20).

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[contractAddress](NomoAssetSelector.md#contractaddress)

#### Defined in

[nomo_web3.ts:39](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L39)

___

### decimals

• **decimals**: `number`

#### Defined in

[nomo_web3.ts:46](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L46)

___

### name

• `Optional` **name**: `string`

name will be ignored if contractAddress or uuid is specified.
name should be only used together with other selectors.

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[name](NomoAssetSelector.md#name)

#### Defined in

[nomo_web3.ts:33](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L33)

___

### network

• `Optional` **network**: [`NomoNetwork`](../modules.md#nomonetwork)

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[network](NomoAssetSelector.md#network)

#### Defined in

[nomo_web3.ts:34](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L34)

___

### receiveAddress

• `Optional` **receiveAddress**: ``null`` \| `string`

#### Defined in

[nomo_web3.ts:48](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L48)

___

### symbol

• **symbol**: `string`

symbol will be ignored if contractAddress or uuid is specified.
symbol should be only used together with other selectors.

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[symbol](NomoAssetSelector.md#symbol)

#### Defined in

[nomo_web3.ts:28](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L28)

___

### uuid

• `Optional` **uuid**: `string`

If set, then uuid must be an asset-identifier from the endpoint https://webon.info/api/tokens.

#### Inherited from

[NomoAssetSelector](NomoAssetSelector.md).[uuid](NomoAssetSelector.md#uuid)

#### Defined in

[nomo_web3.ts:43](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L43)

___

### visible

• `Optional` **visible**: `boolean`

#### Defined in

[nomo_web3.ts:47](https://github.com/nomo-app/nomo-webon-kit/blob/50008cb/nomo-webon-kit/src/nomo_web3.ts#L47)
