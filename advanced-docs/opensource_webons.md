# OpenSource WebOns

This document provides a list of WebOns that could be forked for developing a WebOn.

## Demo WebOn

Deeplink to try it out: https://nomo.app/webon/demowebon.nomo.app

The [Demo WebOn](https://github.com/nomo-app/nomo-webon-kit/tree/main/demo-webon) is located in this repo and it is written with next.js-React.
The Demo WebOn showcases a large number of nomo-API-features.

After cloning this repo, run the following commands to launch the Demo WebOn:

`cd ethersjs-nomo-webons && npm i`  
`cd web3js-nomo-webons && npm i`  
`cd demo-webon && npm i`  
`npm run dev`

Afterwards, you might need to change the package.json to use the public npm-dependencies instead of the local dependencies from this repo.

## Tokengenerator WebOn

Deeplink to try it out: https://nomo.app/webon/tokens.nomo.app

The [Tokengenerator WebOn](https://github.com/nomo-app/tokengenerator) is also written in next.js-React.
It submits a transaction with ethersjs-nomo-webons to create a new token.
