# Nomo WebOn Kit

-> [API-docs](api-docs/modules.md)

This package provides an API for [Nomo WebOns](https://discover.webon.info).
A WebOn is a web-application that runs within a WebView of the Nomo App.

## Why Nomo WebOns?

The Nomo WebOn API has the potential to revolutionize the web3 user experience.
To understand why, see the following problems of traditional systems like "WalletConnect":

- With "WalletConnect“, communication flows over a (centralized) middleman, even if both wallet and website are running on the same phone!
- The middleman adds fragility and delays.

With the Nomo API, there is no more middleman.
WebOns and Wallet communicate locally on the same phone.
The results are:

- WebOns do not need any "connect wallet“ button
- WebOns are fast and reliable
- ethers.js can be setup with only [three lines of JavaScript](https://github.com/nomo-app/nomo-webon-kit/tree/main/ethersjs-nomo-webons#multichain-support)

See our [Decentralized App Vision](https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs/dapp_vision.md) for more details.

# Quick Usage Guide

Before going into more details, we explain a few quick steps for getting a WebOn up and running together with the Nomo App.

**Prerequisites:** We assume a working knowledge of npm and JavaScript.

## Step 1: Download the Nomo App

Goto <https://nomo.app/>.  
Download the Nomo App and create a wallet with it.

## Step 2: Launch a WebOn locally

Clone one of the [Opensource WebOns](https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs/opensource_webons.md) or alternatively use your own frontend template.
Install npm dependencies and launch your WebOn on localhost.

`npm i`  
`npm run dev`

Then your WebOn should run at <http://localhost:3000/> or similar.
If your frontend is not yet a WebOn, then you will need to add a [nomo_manifest.json](https://github.com/nomo-app/nomo-webon-kit/blob/main/demo-webon/public/nomo_manifest.json).

## Step 3: Enable the Nomo Dev Mode

Within the Nomo App, navigate to `Settings -> About this App`.  
Click ten times on the NOMO-icon to enable the Nomo Dev Mode.  
From now on, the About-screen will change into a "developer-area".
The Nomo App will ask you for a _WebOn-deeplink_.

## Step 4: Construct a WebOn-deeplink

A deeplink tells the Nomo App where your WebOn is running.
For development, we recommend two different types of deeplinks:

- Local-Wifi-deeplinks
- Ngrok-deeplinks

See the options below for instructions on how to construct a deeplink.
To enter your deeplink into the Nomo App, we recommend using a QRCode-generator like https://goqr.me/.
After scanning your deeplink, the Nomo App is ready to launch your WebOn! 🚀🚀

You are then free to make changes or experiment with the features.

### Option 1: Local-Wifi-deeplinks

> If you are using a Desktop-version of the Nomo App, then you may use a simplified deeplink like <http://nomo.app/webon/localhost:3000>.

For this type of deeplink, your phone needs to be in the same local network as your dev-machine.
For example, let’s assume your dev-machine has the IP address `172.16.251.205` and your WebOn is running at `http://localhost:3000`.
Then you can construct the following deeplink by inserting the prefix `nomo.app/webon/`:

<http://nomo.app/webon/172.16.251.205:3000>

### Option 2: ngrok-deeplinks

If you are unable to use local-Wifi-deeplinks, then you can use ngrok-deeplinks as an alternative option.
`ngrok` is a useful tool for exposing your localhost to the Internet.
By using `ngrok`, the Nomo App can access your dev-machine regardless of which network your phone is connected to.
First, download `ngrok` from <https://ngrok.com/> and create an ngrok-account.

Further, we assume that your WebOn is running locally on port 3000.
Run the following command to expose your WebOn to the Internet:

`ngrok http 3000`

This command should give you a URL that looks something like this:

<https://56b1.ngrok-free.app>

With this, you can construct the following deeplink by inserting the prefix `nomo.app/webon/`:

<https://nomo.app/webon/56b1.ngrok-free.app>

# Installation

You can add this package to your project with: `npm install nomo-webon-kit`.

Take a look at the [Demo WebOn](https://github.com/nomo-app/nomo-webon-kit/tree/main/demo-webon) to see how the package can be used.
In order to use this package, we expect that WebOns are written in JavaScript or TypeScript.

## Interacting with EVM blockchains

See the [EVM docs](https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs/evm.md) if you want to port a decentralized application as a WebOn.

# Debugging WebOns

There are multiple ways of debugging WebOns, but our preferred way is to connect Chrome DevTools to a WebOn.
See the [debugging docs](https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs/debugging.md) for more details.

# Authenticating WebOns

For fullstack-WebOns, the Nomo App offers the following protocols:

- [Nomo-Auth](https://github.com/nomo-app/nomo-auth): Direct authentication from a WebOn to a backend
- [Nomo-ID](https://github.com/nomo-app/nomo-id): Linking a WebOn to already existing (web2) backends

# WebOn Wallet Provider

A WebOn can act as an **external wallet provider** for the Nomo App.
This allows third-party wallets to integrate their assets, balances, prices, transactions, and send functionality directly into the Nomo App UI — no WalletConnect or middleman needed.

## How it works

1. Declare a `webon_wallet` section in your `nomo_manifest.json` with a wallet name and supported assets.
2. When the WebOn is installed, the Nomo App automatically creates a wallet entry for it.
3. The WebOn **pushes** data (assets, balances, prices, transactions) to the app via `nomo.wallet*` functions.
4. The app can **request** fresh data from the WebOn via callback handlers (`registerUpdateBalanceHandler`, etc.).
5. When the user initiates a send, the app calls `window.nomoRequestSend` in the WebOn's JS context.

The WebOn is the **source of truth** — the app does not persist external wallet data. The WebOn re-pushes on load.

## Manifest example

```json
{
  "nomo_manifest_version": "1.2.0",
  "webon_id": "com.example.mywallet",
  "webon_name": "My Wallet",
  "webon_version": "1.0.0",
  "permissions": [],
  "webon_wallet": {
    "name": "My Wallet",
    "assets": [
      { "symbol": "TOKEN", "name": "My Token", "decimals": 18 }
    ]
  }
}
```

## Push functions (WebOn → App)

| `nomo.*` name | Function | Description |
|----------------|----------|-------------|
| `nomo.walletSetAllAssets` | `nomoWalletSetAllAssets` | Replace the entire asset list. Call on load or when assets change. |
| `nomo.walletSetVisibleAsset` | `nomoWalletSetVisibleAsset` | Add or update a single asset (deduped by `contractAddress+network` or `symbol+network`). |
| `nomo.walletRemoveAsset` | `nomoWalletRemoveAsset` | Remove an asset from the wallet's asset list. |
| `nomo.walletSetBalance` | `nomoWalletSetBalance` | Push a balance for one asset. Balance is a raw string in the smallest unit (e.g., wei). |
| `nomo.walletSetPrice` | `nomoWalletSetPrice` | Push a price for one asset. Optional `currency` defaults to the app's selected currency. |
| `nomo.walletSetTransactions` | `nomoWalletSetTransactions` | Push transaction history for one asset. |
| `nomo.walletRemoveTransaction` | `nomoWalletRemoveTransaction` | Remove a single transaction by hash. |
| `nomo.walletSetReceiveAddress` | `nomoWalletSetReceiveAddress` | Push a receive address to display in the app. |
| `nomo.walletSendAssets` | `nomoWalletSendAssets` | Respond to a send request with `requestId`, `txHash`, and `status`. |

## Callback handlers (App → WebOn)

The app can request the WebOn to push fresh data. Register handlers so the app can trigger updates (e.g., on pull-to-refresh or wallet switch):

| `nomo.*` name | Function | Triggered when |
|----------------|----------|----------------|
| `nomo.registerSendRequestHandler` | `nomoRegisterSendRequestHandler` | User taps "Send" on an external wallet token |
| `nomo.registerUpdateBalanceHandler` | `nomoRegisterUpdateBalanceHandler` | App needs a fresh balance (pull-to-refresh, token detail) |
| `nomo.registerUpdateTransactionsHandler` | `nomoRegisterUpdateTransactionsHandler` | App needs fresh transaction history |

## Handling send requests (App → WebOn)

When the user taps "Send" on an external wallet token, the Nomo App injects a call to `window.nomoRequestSend(jsonString)` in the WebOn's JS context.
Use `nomoRegisterSendRequestHandler` to register a typed callback:

```typescript
import { nomo } from "nomo-webon-kit";

nomo.registerSendRequestHandler(async (request) => {
  // request: { requestId, symbol, destination, amount, decimals }
  try {
    const txHash = await myWallet.send(request.destination, request.amount);
    await nomo.walletSendAssets({
      requestId: request.requestId,
      txHash,
      status: "success",
    });
  } catch (e) {
    await nomo.walletSendAssets({
      requestId: request.requestId,
      txHash: "",
      status: "error",
      error: e.message,
    });
  }
});
```

## Minimal example

```typescript
import { nomo } from "nomo-webon-kit";

// 1. Push assets on load
await nomo.walletSetAllAssets({
  assets: [{ symbol: "TOKEN", name: "My Token", decimals: 18 }],
});

// 2. Push balance (raw value in smallest unit, e.g., wei for 18 decimals)
await nomo.walletSetBalance({
  asset: { symbol: "TOKEN" },
  balance: "1000000000000000000", // = 1 TOKEN
});

// 3. Push price
await nomo.walletSetPrice({ asset: { symbol: "TOKEN" }, price: 2.5 });

// 4. Push receive address
await nomo.walletSetReceiveAddress({ address: "0x..." });

// 5. Push transactions
await nomo.walletSetTransactions({
  asset: { symbol: "TOKEN" },
  transactions: [
    {
      hash: "0xabc...",
      from: "0x111...",
      to: "0x222...",
      value: "500000000000000000",
      timestamp: 1708000000,
      status: "confirmed",
    },
  ],
});

// 6. Handle send requests from the app
nomo.registerSendRequestHandler(async (request) => {
  const txHash = await sendTransaction(request);
  await nomo.walletSendAssets({
    requestId: request.requestId,
    txHash,
    status: "success",
  });
});

// 7. Handle refresh requests from the app
nomo.registerUpdateBalanceHandler(async ({ asset }) => {
  const balance = await fetchBalance(asset);
  await nomo.walletSetBalance({ asset, balance });
});

nomo.registerUpdateTransactionsHandler(async ({ asset }) => {
  const transactions = await fetchTransactions(asset);
  await nomo.walletSetTransactions({ asset, transactions });
});
```

## Key types

```typescript
// Identifies a token — use symbol alone or contractAddress+network for precision
interface NomoAssetSelector {
  symbol: string;
  name?: string;
  network?: NomoNetwork; // "ethereum" | "polygon" | "binance-smart-chain" | ...
  contractAddress?: string;
}

// Full asset descriptor (extends selector with decimals)
interface NomoAsset extends NomoAssetSelector {
  decimals: number;
  visible?: boolean;
  balance?: string;
}

// Transaction pushed via walletSetTransactions
interface NomoWalletTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;        // raw value in smallest unit
  timestamp: number;    // unix seconds
  status?: "pending" | "confirmed";
}

// Payload received by registerSendRequestHandler
interface NomoSendRequest {
  requestId: string;
  symbol: string;
  destination: string;
  amount: string;       // raw value in smallest unit
  decimals: number;
}
```

## Token resolution

Assets are matched by `contractAddress` + `network` (strongest), or by `symbol` + `network`.
If a token matches a known token in the Nomo App, it will use the app's metadata (icon, name, etc.).
If no match is found, the app creates a synthetic token entry from the data pushed by the WebOn.

# Deploying WebOns

We recommend the [nomo-webon-cli](https://github.com/nomo-app/nomo-webon-cli) for deploying WebOns.
The `nomo-webon-cli` can be used both for production deployments as well as for internal test deployments or CI/CD pipelines.

# Sharing WebOns

You can share WebOns by long-pressing on the WebOn-icon within the Nomo App's home screen.
After long-pressing, you will see a dialog.
Within this dialog, the "Share button" will give you a deeplink that can be shared with users or other developers.

If needed, this deeplink can be easily converted into a QRCode with any QRCode-generator.
