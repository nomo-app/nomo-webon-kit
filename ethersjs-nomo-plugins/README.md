# ethersjs-nomo-plugins

The goal of this package is to support already existing ethers.js code with only minimal changes.
This makes it possible to develop all kinds of decentralized applications as Nomo plugins.

For example, this package can be used for the following tasks:

- Invoking functions on smart contracts
- Querying data from a blockchain
- Deploying new smart contracts

All of this is backed by a seed phrase of the Nomo App, and the seed phrase remains secure even if the plugin code was malicious.

## How to use

First, install the package via npm:

`npm i ethersjs-nomo-plugins`

Then you can import one of the following objects, depending on your use case:

```
import { EthersjsNomoSigner } from "ethersjs-nomo-plugins/dist/ethersjs_nomo_signer"; // this can be used for constructing your own signer-object

import { zscSigner } from "ethersjs-nomo-plugins/dist/ethersjs_provider"; // a ready-made signer-object for interacting with the ZENIQ Smartchain

import { sendDemoTransaction } from "ethersjs-nomo-plugins/dist/ethersjs_provider"; // an example on how to construct a transaction
```

Please consult the demo-plugin and to the ethers.js documentation for more details.

## Limitations

Currently, this package only works with ethers.js-V5.
ethers.js-V6 is not yet supported.
