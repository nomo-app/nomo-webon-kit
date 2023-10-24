# Zeniq Smart Chain Web3 Integration

This repository provides a TypeScript library for interacting with the Zeniq Smart Chain using the Web3.js v4 library and other related utilities. It includes functions for fetching wallet addresses, signing Ethereum Virtual Machine (EVM) transactions, and sending demo transactions on the Zeniq Smart Chain.

## Installation

To use this library, you can install it via npm:

```bash
npm install web3js-nomo-plugins
```

## Signing EVM Transactions

This library provides a function **signWeb3JsTransactionWithNomo** to sign EVM transactions.
It uses the **nomoSignEvmTransaction** function from the **nomo-plugin-kit** to sign transactions.

```typescript
import { signWeb3JsTransactionWithNomo } from "web3js-nomo-plugins";
import { Transaction } from "web3-eth-accounts";

const transaction = new Transaction({
  /*Transaction details*/
});
const ownAddress = "Your Ethereum Address";

const signedTransaction = await signWeb3JsTransactionWithNomo(
  transaction,
  ownAddress
);
console.log("Signed Transaction: ", signedTransaction);
```

## Sending Demo Transaction

The function **sendDemoTransaction** sends a demo transaction on the Zeniq Smart Chain using **your wallet address**.

```typescript
import { sendDemoTransaction } from "web3js-nomo-plugins";

await sendDemoTransaction();
```

Feel free to use this library to interact with the Zeniq Smart Chain using Web3.js and **nomo-plugin-kit**.

Please consult the demo-WebOn and the web3.js documentation for more details.
