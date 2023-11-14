# Nomo WebOn Kit

See the [api-docs](api-docs/modules.md) for a list of individual functions.

This package is designed for developers to develop _WebOns_ for the [Nomo App](https://nomo.app).
A WebOn is a web-application that runs within the Nomo App.
WebOns are a powerful capability of the Nomo App that unlock the following features in an easy-to-use way:

- Crypto wallet functionality
- A decentralized chat service
- Taking pictures / documents / QRCodes
- AI-powered features
- Authentication with NOMO-Auth or NOMO-ID
- More features are coming with Nomo App updates!

This README explains how to develop WebOns for the Nomo App.  
Furthermore, this repo contains a demo-WebOn to showcase the provided functionality.  
In order to use this package, we expect that WebOns are written in JavaScript or TypeScript.

# Quick Usage Guide

Before going into more details, we explain a few quick steps for getting a WebOn up and running together with the Nomo App.

**Prerequisites:** We assume a working knowledge of npm and JavaScript.

## Step 1: Download the Nomo App

Goto <https://nomo.app/>.  
Download the Nomo App and create a wallet with it.

## Step 2: Launch a WebOn locally

> You can skip step 2 and step 4 if you use the following deeplink: <https://nomo.app/webon/demowebon.nomo.app>

Clone one of the [Opensource WebOns](https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs/opensource_webons.md) or alternatively use your own frontend template.
Install npm dependencies and launch your WebOn on localhost.

`npm i`  
`npm run dev`

Then your WebOn should run at <http://localhost:3000/> or similar.
If your frontend is not yet a WebOn, then you will need to add a [nomo_manifest.json](https://demowebon.nomo.app/nomo_manifest.json).

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

## Interacting with EVM blockchains

If you want to port a decentralized application, then we recommend the package [ethersjs-nomo-webons](https://github.com/nomo-app/nomo-webon-kit/tree/main/ethersjs-nomo-webons#readme).
There also exists web3js-nomo-webons, but our web3.js support is not as good as our ethers.js-V6 support.

# Debugging WebOns

There are multiple ways of debugging WebOns, but our preferred way is to connect Chrome DevTools to a WebOn.
See the [debugging docs](https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs/debugging.md) for more details.

# Deploying WebOns

We recommend the [nomo-webon-cli](https://github.com/nomo-app/nomo-webon-cli) for deploying WebOns.
The `nomo-webon-cli` can be used both for production deployments as well as for internal test deployments or CI/CD pipelines.

# Sharing WebOns

Once a WebOn is deployed, you can share it by long-pressing on the WebOn-icon within the Nomo App's home screen.
After long-pressing, you will see a dialog with information like the webon_version and the webon_url.
Within this dialog, the "Share button" will give you a deeplink that can be shared with users or other developers.

If needed, this deeplink can be easily converted into a QRCode with any QRCode-generator.
