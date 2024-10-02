# WebOn Execution Modes

Nomo WebOns can run in the following _execution modes_:

- Production mode
- Dev mode
- DevDev mode
- Fallback mode

Moreover, Webons can run in the following _hosting modes_:

- Nomo integrated hosting
- External hosting

This document aims to clarify all the modes and support WebOn developers through their journey.

## Production Mode

The primary "feature“ of the production mode are its security restrictions.
In production mode, the Nomo App only accepts https-deeplinks, but no http-deeplinks.

## Dev Mode

The Dev mode is almost the same as the production mode, except that it does not have any security restrictions.
This allows for rapid development with live-reload in a local network.

To enable the Dev mode, you need to visit the DevDev mode only one time. Afterwards, you can proceed with the regular flows of supplying deeplinks.

## DevDev Mode

The DevDev mode allows to run code even without installing a WebOn.
As such, the DevDev mode is the only mode that does not require a `nomo_manifest.json`.

In addition, the DevDev mode provides additional features like reload-buttons, back-buttons and a button to clear the cache.

> :warning: Be aware that the DevDev-features are not available in production!
> For example, if your WebOn needs a back-button, then you need to implement the back-button by yourself.

## Fallback Mode

Our recommended way of developing WebOns is to connect Chrome DevTools to the Nomo App as explained in the debugging-docs.
Nevertheless, there are some developers who prefer to use a regular browser instead of the Nomo App.
For those developers, the Nomo-WebOn-Kit provides a _fallback mode_.

In the fallback mode, only a limited subset of the nomo-API is working.

# Hosting Modes

The hosting mode determines the primary server for serving assets to a WebOn.

## Nomo Integrated Hosting

For integrated hosting, the Nomo App launches a localhost-server whenever a WebOn gets launched.
The localhost-server remains alive as long as the Nomo App is running.

Integrated hosting has the following advantages:

- Fast initial loading times even with bad internet connections
- Capability of running WebOns offline
- Deployments can be easily done with the [nomo-webon-cli](https://github.com/nomo-app/nomo-webon-cli)

## External Hosting

WebOns with external hosting work similar to a regular website.

As such, externally hosted WebOns are refreshed whenever you restart the Nomo App.

External hosting is also useful for development, where a fast refresh is needed for testing changes of a WebOn.
