# EVM Docs

WebOns are designed in a way such that existing EVM applications can be ported (Ethereum Virtual Machine).

WebOns are chain-agnostic in the sense that they can support arbitrary EVM-chains, but also UTXO-chains like Bitcoin.

## ethers.js-V6

Currently, our recommended way of writing EVM-WebOns is to use the package [ethersjs-nomo-webons](https://github.com/nomo-app/nomo-webon-kit/tree/main/ethersjs-nomo-webons#readme).
This package is a small glue-code on top of [ethers.js-V6](https://www.npmjs.com/package/ethers).
Compared to ethers.js-V5, V6 has many advantages like the support for native ES2020-bigints.

## web3.js (experimental)

The package [web3js-nomo-webons](https://github.com/nomo-app/nomo-webon-kit/tree/main/web3js-nomo-webons#readme) is a small glue-code on top of web3.js-V4.

Currently, we consider web3js-nomo-webons as experimental, so our recommendation is to prefer ethersjs-nomo-webons if you can.

## MetaMask API

Through a [Provider-API](https://docs.metamask.io/wallet/reference/provider-api/), the Nomo App supports traditional dApps that were built for wallets like MetaMask.
See https://github.com/nomo-app/webon3.com for a glue-code that maps MetaMask to the WebOn-API.
Compared to the "real" MetaMask, the Nomo App glue-code provides a much better user experience.

## Custom EVM glue-code

If none of the above-mentioned packages suit your needs, then you could roll your own EVM-glue-code.
At its core, an EVM-glue-code needs to assemble an (unsigned) EVM-transaction and then invoke the function [nomoSignEvmTransaction](https://github.com/nomo-app/nomo-webon-kit/blob/main/api-docs/modules.md#nomosignevmtransaction).

The Nomo App will never ever expose a seed phrase to a WebOn, so you have to use `nomoSignEvmTransaction`.

## Sign Security Dialog

When invoking `nomoSignEvmTransaction`, the Nomo App will show an advanced security dialog for the user to approve.

The Nomo App tries to make EVM-transactions human-readable.
This is done by showing function names to the user.
If the Nomo App cannot determine a function name for your Smart Contract, then we invite you to submit an ABI-pull-request to [walletkit-dart](https://github.com/nomo-app/walletkit-dart).

### Expert Section

For developers, the security-dialog contains an "expert section“ with many details about the (unsigned) transaction.
This can help developers to verify if the arguments that are passed to a Smart Contract are correct.

## Smart Contract Template

If you have never written a Smart Contract before, then we recommend checking out our [demo-contract](https://github.com/nomo-app/demo-contract).

This demo-contract is based on [hardhat](https://www.npmjs.com/package/hardhat) and ethers.js-V6, with the goal of providing a consistent experience for WebOn-devs.
