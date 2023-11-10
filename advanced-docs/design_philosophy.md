# WebOn Design Philosophy

Nomo WebOns are a special kind of web-integration that is not like a regular website.

This document offers a list of goals and non-goals for the WebOn ecosystem.
With this, we hope that you obtain a better judgment whether or not it makes sense to implement an idea as a WebOn.

## Goals

- Excellent usability for Decentralized Apps
- Ship tailor-made web3 experiences
- Robustness: Store the web-assets locally and the data (ideally) on a blockchain
- Explicit Updates: Change the web-assets only if the user accepts it
- Composition: Make it easy to use services from other WebOns
- Rapid Development: Promote a Micro Frontend Architecture

## Non-Goals

- Simulating browser features (there will be no history, no bookmarks)
- Switching between arbitrary pages (call `nomo.launchUrl` if you need an external browser)
- Forcing WebOns to deal with "routing" (there will be no URL-bar)
- Forcing WebOns to deal with "refreshes" (if needed, put in your own refresh-button with three lines of JavaScript)
- Server-side rendered UI
