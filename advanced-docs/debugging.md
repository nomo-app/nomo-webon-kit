# Debugging WebOns

In this document, we describe multiple ways for debugging WebOns.
Before going into debugging, it might be useful to learn about the [execution modes](https://github.com/nomo-app/nomo-webon-kit/tree/main/advanced-docs/execution_modes.md) of WebOns.

## Connect Chrome DevTools to Android

Our preferred way of debugging is to connect Chrome DevTools to a WebOn.
The following steps are recommended to connect Chrome DevTools to an Android device:

- Install Android Studio
- Connect your phone via USB
- Launch Android Studio to see if the connected phone can be found
- Launch your WebOn by using a deeplink
- Open `chrome://inspect/#devices` within Chrome for initiating a remote-debugging session with the WebOn

See <https://developer.chrome.com/docs/devtools/remote-debugging/webviews/> for more details.

## Connect Safari DevTools to iOS

It should be possible to connect Safari DevTools to a Nomo WebOn.
Consult Apple documentation for details on how to connect to an iPhone WebView.

## DevDev Mode on Android/iOS

On Android/iOS, the DevDev mode includes a small window for the functions console.log/console.info/console.error/console.warn.
Moreover, the DevDev mode includes auxiliary features like refreshing the page or clearing local storage.

## Desktop Debugging

On Desktop, the Nomo App offers an integrated DevTool that looks almost the same as Chrome DevTools.
This DevTool can be used even in production mode; the only prerequisite is that the Dev Mode had been activated at least once.

## Debugging via breakpoints

When running a local dev server, your IDE can be configured to enable breakpoints (e.g. Visual Studio Code).
