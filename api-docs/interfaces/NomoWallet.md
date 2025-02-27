[nomo-webon-kit](../README.md) / [Exports](../modules.md) / NomoWallet

# Interface: NomoWallet

## Table of contents

### Properties

- [derivationPath](NomoWallet.md#derivationpath)
- [evmAddress](NomoWallet.md#evmaddress)
- [hdPathIndex](NomoWallet.md#hdpathindex)
- [name](NomoWallet.md#name)

## Properties

### derivationPath

• **derivationPath**: `string`

The BIP44 derivation path of the wallet.
Typically, the first wallet will have the derivation path "m/44'/60'/0'/0/0".

#### Defined in

[nomo_web3.ts:620](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L620)

___

### evmAddress

• **evmAddress**: `string`

The EVM address of the wallet according to the BIP44 derivation path.

#### Defined in

[nomo_web3.ts:611](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L611)

___

### hdPathIndex

• **hdPathIndex**: `number`

An index within the derivation path.

#### Defined in

[nomo_web3.ts:615](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L615)

___

### name

• **name**: `string`

The name of the wallet that is visible within the Nomo App.
The name can be changed by the user.

#### Defined in

[nomo_web3.ts:607](https://github.com/nomo-app/nomo-webon-kit/blob/c91383b/nomo-webon-kit/src/nomo_web3.ts#L607)
