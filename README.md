# Nomo Plugin Kit

This package is designed for developers to develop _plugins_ for the [NOMO-app](https://nomo.app).
A plugin is a web-application that runs within the NOMO-app.
Plugins are a powerful capability of the NOMO-app that unlock the following features in an easy-to-use way:

- Crypto wallet functionality
- Messaging via zeniq.chat service
- Taking pictures / uploading documents
- AI-powered features like speech-to-text offline
- Authentication with NOMO-Auth
- Authentication with NOMO-ID

Some of those features are not yet available, but many more features are expected to come with NOMO-app-updates!  
This README explains how to develop plugins for the NOMO-app.  
Furthermore, this repo contains a demo-plugin to showcase the provided functionality.  
In order to use this package, we expect that plugins are written in JavaScript or TypeScript.

# Quick Usage Guide

Before going into more details, we explain a few quick steps for getting the demo-plugin up and running together with the NOMO-app.

**Prerequisites:** We assume a working knowledge of npm and JavaScript.

## Step 1: Download the NOMO-app

Goto <https://nomo.app/>.  
Download the NOMO-app and create a wallet with it.

## Step 2: Launch the demo-plugin locally

> You can skip step 2 and step 3 if you use the following hosted plugin URL: <https://demoplugin.nomo.app/?t=nomo>

Clone this repo, then launch the demo-plugin with:

`cd demo-plugin`  
`npm i`  
`npm run dev`

Then the demo-plugin should run at <http://localhost:3000/>.

## Step 3: Launch ngrok tunnel

> You can skip this step if you are using a Desktop-version of the NOMO-app.
> Typically, launching an `ngrok` tunnel is only needed for Android/iOS.

`ngrok` is a useful tool for exposing your localhost to the Internet.
By using `ngrok`, the NOMO-app can easily access the demo-plugin regardless of which network your phone is connected to.
First, download `ngrok` from <https://ngrok.com/>.

Further, we assume that the demo-plugin is running locally on port 3000.
Run the following command to expose the demo-plugin to the Internet:

`ngrok http 3000`

With this command, `ngrok` should give you an https-URL that looks something like this:

<https://56b1-212-186-68-152.ngrok-free.app>

You will need this URL in the next step.

## Step 4: Launch the demo-plugin within the NOMO-app

Within the NOMO-app, navigate to `Settings -> About this App`.  
Click ten times on the NOMO-icon to enable the developer mode.  
Then the NOMO-app will ask you for a _plugin-URL_.  
Paste the URL from the previous steps, then the NOMO-app should launch the demo-plugin! 🚀🚀

You are now free to make changes to the demo-plugin or experiment with the features.  
From now on, the About-screen will change into a "developer-area".

# JavaScript API

The functions that are provided by this package are documented in the [api-docs](api-docs/modules.md).

You can add this package to your project with: `npm install nomo-plugin-kit`.

Take a look at the demo-plugin to see how the package can be used.

## Interacting with EVM blockchains

If you want to port a decentralized application, then we recommend the package https://www.npmjs.com/package/ethersjs-nomo-plugins.
This package has a ready-made provider that utilizes the Nomo App for signing transactions.

# Debugging of Plugins

In the following sections, we describe multiple ways for debugging Nomo plugins.

## Debugging with the Nomo dev mode

The Nomo dev mode includes a console-window that facilitates debugging via the functions console.log/console.info/console.error/console.warn.
The same console-window is also used for debugging Nomo-specific APIs.
Moreover, the Nomo dev mode includes a few auxiliary features like refreshing the page or clearing local storage.

As mentioned in previous sections, the Nomo dev mode can be enabled by clicking multiple times on the about screen icon.

> :warning: The console-window does not work for arbitrary websites! The console-window only works for websites that have included the nomo-plugin-kit within their JavaScript-codebase.

## Debugging via breakpoints

When running a local dev server, your IDE can be configured to enable breakpoints (e.g. Visual Studio Code).
Again, you can use the Nomo dev mode for connecting to your local dev server.

## Remote debugging for Android

In addition to the previously mentioned techniques, there exists the possibility of remote-debugging the web-view within the NOMO-app.
By doing remote-debugging, you can utilize the full power of Chrome DevTools within the NOMO-app.

The following steps are recommended to use Chrome DevTools for Android remote debugging:

- Install Android Studio
- Connect your phone via USB
- Launch Android Studio to see if the connected phone can be found
- Download and install a debug-version of the Nomo-app from <https://nomo.app/downloads/app-debug.apk> (if you already have a release-version, then your phone will have two different Nomo-apps installed)
- Use the debug-version to launch a plugin as described in the usage guide above
- Open `chrome://inspect/#devices` within Chrome for initiating a remote-debugging session with the plugin

See <https://developer.chrome.com/docs/devtools/remote-debugging/webviews/> for more details.

# Release of Plugins

Once you are done with an initial version, a few more steps are needed to release a plugin.

## Hosting Plugins

Firstly, the plugin needs to be hosted at a publicly available URL.
Nomo recommends the usage of a Content Delivery Network (CDN) for hosting plugins.
By using a decent CDN, Nomo plugins can be made globally available without any scalability concerns.

## Plugin Manifests

In addition to the actual code, every production-plugin needs to host a `nomo_manifest.json`.
See <https://demoplugin.nomo.app/nomo_manifest.json> for an example of a `nomo_manifest.json`.
You can copy-paste this example, but at a minimum you will need to change the following fields:

- `plugin_id`
- `plugin_name`

## Security Restrictions

For regular users, the NOMO-app only accepts plugins that are hosted at the domain `*.nomo.app`.
In contrast, the users who have activated the Nomo dev mode are free to install plugins from arbitrary domains.
This is a security-restriction that may be lifted in future version of the NOMO-app.

## Distributing Plugins via QRCode

Once a plugin is hosted, you can construct a QRCode for installing the plugin.
You can choose between two types of QRCodes: Browsable QRCodes and Deeplinkable QRCodes.
For example, let's assume that the hosting-URL of a plugin is <https://demoplugin.nomo.app>.

### Browsable QRCodes

Browsable QRCodes can be constructed by appending `?t=nomo` to the hosting-URL.
For example, the following URL is a functional QRCode:

<https://demoplugin.nomo.app/?t=nomo>

### Deeplinkable QRCodes

The advantage of deeplinks is that they allow plugin-installations on smartphones without even scanning a QRCode.
Deeplinkable QRCodes can be constructed by prepending `https://nomo.app/pluginv1/` to the hosting-domain.
For example, the following URL is a functional QRCode:

<https://nomo.app/pluginv1/demoplugin.nomo.app>
