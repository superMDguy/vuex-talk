# Vuex demo

Vuex talk + demo created for MidwestJS 2018

## How to run

First, clone the repo and run `npm install`. To update the cryptocurrency price data, run `npm run data-update`. Next choose which step to run. Each folder that starts with "src-" is a step. For example "src-init" is the "init" step. To start the server with the init step, run `STEP=init npm run serve`, and it will start a server on `localhost:8080`.

## Steps

1. `init`: Starting point for live demo
2. `vuex-init`: Add empty Vuex store, and register it with vue
3. `fetch-coins`: Display coins fetched from api
4. `portfolio`: Allow adding coins to portfolio
5. `transactions`: Allow buying/selling coins in portfolio
6. `async-task`: Use [tuxi](https://www.npmjs.com/package/tuxi) to add boilerplate-free loaders

For more information on what to do in between each step, see [steps.md](https://github.com/superMDguy/vuex-demo/blob/HEAD/steps.md)
