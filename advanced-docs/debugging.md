# Debugging WebOns

In this document, we describe multiple ways for debugging WebOns.

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

On Android/iOS, the DevDev mode includes a console-window for the functions console.log/console.info/console.error/console.warn.
Moreover, the DevDev mode includes a few auxiliary features like refreshing the page or clearing local storage.

As mentioned in the README, the DevDev mode can be enabled by clicking multiple times on the about screen icon.

## DevDev Mode on Windows/Linux/macOS

On Desktop, the DevDev mode is way more powerful than on mobile.
On Desktop, the DevDev mode provides integrated DevTools that look almost the same as Chrome DevTools.

## Debugging via breakpoints

When running a local dev server, your IDE can be configured to enable breakpoints (e.g. Visual Studio Code).
Again, you can use the Nomo dev mode for connecting to your local dev server.
