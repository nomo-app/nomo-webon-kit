# ethersjs-nomo-webons

The goal of this package is to support already existing ethers.js code with only minimal changes.
This makes it possible to develop decentralized applications as Nomo WebOns.

For example, this package can be used for the following tasks:

- Invoking functions on smart contracts
- Querying data from a blockchain
- Deploying new smart contracts

All of this is backed by a seed phrase of the Nomo App, and the seed phrase remains secure even if the WebOn-code was malicious.

## How to use

First, install the package via npm:

`npm i ethersjs-nomo-webons`

Then you can import one of the following objects, depending on your use case:

```
import { EthersjsNomoSigner } from "ethersjs-nomo-webons"; // this can be used for constructing your own signer-object

import { zscSigner } from "ethersjs-nomo-webons"; // a ready-made signer-object for interacting with the ZENIQ Smartchain

import { sendDemoTransaction } from "ethersjs-nomo-webons"; // an example on how to construct a transaction
```

Please consult the demo-webon and to the ethers.js documentation for more details.
See https://github.com/nomo-app/nomo-webon-kit/tree/main/demo-webon/src/app/evm for an example on how to invoke a smart contract with this package.

## ethers.js-V5/V6

Starting from 0.2.0, this package works with ethers.js-V6.
An older version of this package works with ethers.js-V5.
