# WebOn Execution Modes

Nomo WebOns can run in the following _execution modes_:

- Production mode
- Dev mode
- DevDev mode
- Fallback mode

Moreover, Webons can run in the following _hosting modes_:

- Nomo integrated hosting
- External hosting

Finally, WebOns can decide if they want to support the _card mode_.

This document aims to clarify all the modes and support WebOn developers through their journey.

## Production mode

The primary "feature“ of the production mode are its security restrictions.
In production mode, the Nomo App only accepts https-deeplinks that are in a set of _trusted domains_.

By putting a WebOn into the WebOn-store, the WebOn will automatically be on a trusted domain.

Currently, the trusted domains are `nomo.app` as well as subdomains of `nomo.app`.

## Dev mode

The Dev mode is almost the same as the production mode, except that it does not have any security restrictions.
This allows for rapid development with live-reload in a local network.

To enable the Dev mode, you need to visit the DevDev mode only one time. Afterwards, you can proceed with the regular flows of supplying deeplinks.

## DevDev mode

The DevDev mode allows to run code without even installing a WebOn.
As such, the DevDev mode is the only mode that does not require a `nomo_manifest.json`.

In addition, the DevDev mode provides additional features like reload-buttons, back-buttons and a button to clear the cache.

> :warning: Be aware that the DevDev-features are not available in production!
> For example, if your WebOn needs a back-button, then you need to implement the back-button by yourself.

## Fallback mode

Our recommended way of developing WebOns is to connect Chrome DevTools to the Nomo App as explained in the README.
Nevertheless, there are some developers who prefer to use a regular browser instead of the Nomo App.
For those developers, the Nomo-WebOn-Kit provides a _fallback mode_.

In the fallback mode, only a limited subset of the nomo-API is working.
Many nomo-functions in the fallback mode will simply return a rejected promise.

# Hosting Modes

The hosting mode determines the primary server for serving assets to a WebOn.

## Nomo integrated hosting

For integrated hosting, the Nomo App launches a localhost-server whenever a WebOn gets launched.
The localhost-server remains alive as long as the Nomo App is running.

Integrated hosting has the following advantages:

- Fast initial loading times even with bad internet connections
- Capability of running WebOns offline
- Can be deployed to Nomo-managed infrastructure
- Updates can be distributed via the WebOn Store

For integrated hosting, the Nomo App requires to package WebOns into a tar.gz-file.
See https://github.com/nomo-app/nomo-webon-kit/blob/main/advanced-docs/packaging.md for details about packaging a tar.gz-file.

## External hosting

WebOns with external hosting work similar to a regular website.

As such, externally hosted WebOns are refreshed whenever you restart the Nomo App. If you also need to refresh a WebOn while the Nomo App is running, then you can refresh it with JavaScript, for example by calling `location.reload()`.

External hosting is mainly intended for development, where a fast refresh is needed for testing changes of a WebOn.

# Card Mode

The "cards" are part of the Nomo App's UI design.
WebOns have the option to run below of a card if they want to support it.
If card mode is enabled in the manifest, then a WebOn needs to implement a responsive design that works in both fullscreen mode and card mode.
