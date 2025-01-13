# WebOn Packaging

For WebOns to be packaged into a tar.gz-archive, there are a few requirements needed.
For example, WebOns should be client-side-rendered and include a few mandatory files in their tar.gz-archive.

See https://github.com/nomo-app/nomo-webon-cli for guidance on how to build tar.gz-archives.

## Client Side Rendering

A WebOn should be a "static build" that is rendered on the client.
WebOns should not include any pages that are rendered on a server.
The reason for this is that WebOns are hosted on a localhost-server within the Nomo App (in production-mode).
Only in dev-mode, WebOns may be hosted on remote-servers.

It may depend on your framework how to achieve client side rendering; here are a few examples.

### Vite.js-React

At the moment, Vite.js is our preferred way of building React-WebOns.
Vite.js provides an excellent support for client side rendering as well as a high flexibility and great dev experience.

### Next.js-React

With Next.js-React, you can configure static builds by adding `output: 'export'` to your `next.config.js`.
Furthermore, your Next.js-pages should be marked with `"use client";`.

### Svelte

If you use SvelteKit, you can follow those steps for producing a static build:

- Add @sveltejs/adapter-static to your svelte.config.js
- Create a file `src/routes/+layout.server.js` with the following content:

```
export const ssr = false // disable server side rendering
export const prerender = true // enable prerender
```

# Required files

The following files are required to be in a tar.gz-archive, otherwise the Nomo App could refuse to add a WebOn.

## Manifest

Every tar.gz-archive must include a `nomo_manifest.json`.
See https://github.com/nomo-app/nomo-webon-kit/blob/main/demo-webon/public/nomo_manifest.json for an example manifest.
See https://github.com/nomo-app/nomo-webon-kit/blob/main/api-docs/interfaces/NomoManifest.md for documentation about the manifest-properties.

## index.html

The tar.gz file should contain an "out" directory, which represents the output of the build files. Inside this "out" directory, the index.html file should be placed at the top level. It is crucial to ensure the presence of the "out" directory, housing the essential index.html file. The anticipated file path for the index.html should be "out/index.html". This particular file serves as the primary document for your WebOns interface.

## Icon

To ensure seamless integration, it is imperative to place your WebOn-Icon within the "out" directory, adhering to the specified file name: "nomo_icon.png".
The anticipated pathway for the Icon should be "out/nomo_icon.png".
