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

Before going into more details, we explain a few quick steps for getting the demo-WebOn up and running together with the Nomo App.

**Prerequisites:** We assume a working knowledge of npm and JavaScript.

## Step 1: Download the Nomo App

Goto <https://nomo.app/>.  
Download the Nomo App and create a wallet with it.

## Step 2: Launch the demo-WebOn locally

> You can skip step 2 and step 4 if you use the following WebOn-deeplink: <https://nomo.app/webon/demowebon.nomo.app>

Clone this repo, then launch the demo-WebOn with:

`cd ethersjs-nomo-webons && npm i`  
`cd web3js-nomo-webons && npm i`  
`cd demo-webon && npm i`  
`npm run dev`

Then the demo-WebOn should run at <http://localhost:3000/>.

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
After scanning your deeplink, the Nomo App is ready to launch the demo-WebOn! 🚀🚀

You are then free to make changes or experiment with the features.

### Option 1: Local-Wifi-deeplinks

> If you are using a Desktop-version of the Nomo App, then you may use a simplified deeplink like <http://nomo.app/webon/localhost:3000>.

For this type of deeplink, your phone needs to be in the same local network as your dev-machine.
For example, let’s assume your dev-machine has the IP address `172.16.251.205` and the demo-WebOn is running at `http://localhost:3000`.
Then you can construct the following deeplink by inserting the prefix `nomo.app/webon/`:

<http://nomo.app/webon/172.16.251.205:3000>

### Option 2: ngrok-deeplinks

If you are unable to use local-Wifi-deeplinks, then you can use ngrok-deeplinks as an alternative option.
`ngrok` is a useful tool for exposing your localhost to the Internet.
By using `ngrok`, the Nomo App can access your dev-machine regardless of which network your phone is connected to.
First, download `ngrok` from <https://ngrok.com/> and create an ngrok-account.

Further, we assume that the demo-WebOn is running locally on port 3000.
Run the following command to expose the demo-WebOn to the Internet:

`ngrok http 3000`

This command should give you a URL that looks something like this:

<https://56b1.ngrok-free.app>

With this, you can construct the following deeplink by inserting the prefix `nomo.app/webon/`:

<https://nomo.app/webon/56b1.ngrok-free.app>

# Installation

You can add this package to your project with: `npm install nomo-webon-kit`.

Take a look at the demo-WebOn to see how the package can be used.

## Interacting with EVM blockchains

If you want to port a decentralized application, then we recommend the package https://www.npmjs.com/package/ethersjs-nomo-webons.
This package has a ready-made provider that utilizes the Nomo App for signing transactions.

# Debugging of WebOns

In the following sections, we describe multiple ways for debugging WebOns.

## Debugging with the Nomo dev mode

The Nomo dev mode includes a console-window that facilitates debugging via the functions console.log/console.info/console.error/console.warn.
The same console-window is also used for debugging Nomo-specific APIs.
Moreover, the Nomo dev mode includes a few auxiliary features like refreshing the page or clearing local storage.

As mentioned in previous sections, the Nomo dev mode can be enabled by clicking multiple times on the about screen icon.

## Debugging via breakpoints

When running a local dev server, your IDE can be configured to enable breakpoints (e.g. Visual Studio Code).
Again, you can use the Nomo dev mode for connecting to your local dev server.

## Remote debugging for Android

In addition to the previously mentioned techniques, there exists the possibility of remote-debugging the web-view within the Nomo App.
By doing remote-debugging, you can utilize the full power of Chrome DevTools within the Nomo App.

The following steps are recommended to use Chrome DevTools for Android remote debugging:

- Install Android Studio
- Connect your phone via USB
- Launch Android Studio to see if the connected phone can be found
- Download and install a debug-version of the Nomo App from <https://nomo.app/downloads/app-debug.apk> (if you already have a release-version, then your phone will have two different Nomo Apps installed)
- Use the debug-version to launch a WebOn as described in the usage guide above
- Open `chrome://inspect/#devices` within Chrome for initiating a remote-debugging session with the WebOn

See <https://developer.chrome.com/docs/devtools/remote-debugging/webviews/> for more details.

# Release of WebOns

Once you are done with an initial version, a few more steps are needed to release a WebOn.

## Hosting WebOns

Firstly, the WebOn needs to be hosted at a publicly available URL.
Nomo recommends the usage of a Content Delivery Network (CDN) for hosting WebOns.
By using a decent CDN, WebOns can be made globally available without any scalability concerns.

## WebOn Manifests

In addition to the actual code, every production-WebOn needs to host a `nomo_manifest.json`.
See <https://demowebon.nomo.app/nomo_manifest.json> for an example of a `nomo_manifest.json`.
You can copy-paste this example, but at a minimum you will need to change the following fields:

- `webon_id`
- `webon_name`

## Security Restrictions

For regular users, the Nomo App only accepts WebOns that are hosted at the domain `*.nomo.app`.
In contrast, the users who have activated the Nomo dev mode are free to install WebOns from arbitrary domains.
This is a security-restriction that may be lifted in future version of the Nomo App.

## Distributing WebOns via QRCodes or Deeplinks

Once a WebOn is hosted, you can construct a deeplink for installing the WebOn.
Deeplinks can be constructed by inserting `nomo.app/webon/` into your hosting-URL.

For example, let's assume that the hosting-URL of a WebOn is <https://demowebon.nomo.app>.
Then the following URL is a functional deeplink:

<https://nomo.app/webon/demowebon.nomo.app>

If needed, this deeplink can be easily converted into a QRCode with any QRCode-generator.
