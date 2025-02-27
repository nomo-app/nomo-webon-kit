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
- [uuid](NomoAssetSelector.md#uuid)

## Properties

### contractAddress

• `Optional` **contractAddress**: `string`

contractAddress in combination with network is the strongest asset-selector with the highest security.
There are rare cases where a contractAddress is not unique across different networks (e.g. AVINOC-ZEN20/AVINOC-ERC20).

#### Defined in

[nomo_web3.ts:45](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L45)

___

### name

• `Optional` **name**: `string`

name will be ignored if contractAddress or uuid is specified.
name should be only used together with other selectors.

#### Defined in

[nomo_web3.ts:39](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L39)

___

### network

• `Optional` **network**: [`NomoNetwork`](../modules.md#nomonetwork)

#### Defined in

[nomo_web3.ts:40](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L40)

___

### symbol

• **symbol**: `string`

symbol will be ignored if contractAddress or uuid is specified.
symbol should be only used together with other selectors.

#### Defined in

[nomo_web3.ts:34](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L34)

___

### uuid

• `Optional` **uuid**: `string`

If set, then uuid must be an asset-identifier from the endpoint https://webon.info/api/tokens.

#### Defined in

[nomo_web3.ts:49](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L49)
