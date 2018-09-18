---
author: Matthew Dangerfield (github.com/superMDguy)
title: Vuex in Depth
date: September 18, 2018
---

## Outline

- 05 minutes intro
- 10 minutes API
- 45 minutes livecoding

## Vuex

> A state management pattern + library for Vue.js applications

<!--
- Created to solve problem of shared state that needs to be mutated
- Can't always rely on parent/child relationship, better to have global store
- Stores are reactive, built around Vue
- No direcly mutating state, must happen in mutation
- Not immutable, because that wouldn't work with vue's reactivity
- Much simpler than flux, redux. Everything encapsulated in object, but still separation of state vs actions
- Single state tree, 1 store per app. Can have multiple modules in store, with modules within modules
-->

##

![Vuex flow diagram](images/flow.png)

## API

```js
const store = new Vuex.Store({})
```

## State

```js
const store = new Vuex.Store({
  state: {
    name: 'John Doe',
    favoriteColor: 'turquoise'
  }
})

console.log(store.state.name) // John Doe
```

## Mutations

<!--
- Store is mutable to enable reactivity, but mutations constrained
- COMMIT mutations
-->

```js
const store = new Vuex.Store({
  state: {
    name: 'John Doe',
    favoriteColor: 'turquoise'
  },

  mutations: {
    SET_NAME(state, newName) {
      state.name = newName
    },

    SET_FAVORITE_COLOR(state, newFavoriteColor) {
      state.favoriteColor = newFavoriteColor
    }
  }
})

store.commit('SET_NAME', 'Jane Doe')
console.log(store.state.name) // Jane Doe
```

## Actions

<!--
- DISPATCH actions
-->

```js
const store = new Vuex.Store({
  state: {
    name: 'John Doe',
    favoriteColor: 'turquoise'
  },

  mutations: {
    SET_NAME(state, newName) {
      state.name = newName
    },

    SET_FAVORITE_COLOR(state, newFavoriteColor) {
      state.favoriteColor = newFavoriteColor
    }
  },

  actions: {
    async fetchUserDetails({ commit }, userId) {
      const { name, favoriteColor } = await api.fetchUserDetails(userId)
      commit('SET_NAME', name)
      commit('SET_FAVORITE_COLOR', favoriteColor)
    }
  }
})

store.dispatch('fetchUserDetails', 'superMDguy').then(() => {
  console.log(store.state.name) // retrieved name from API
  console.log(store.state.favoriteColor) // retrieved favorite color from API
})
```

## Getters

<!--
- Like computed properties, has caching for performance
- Accessed as property, not function
-->

```js
const store = new Vuex.Store({
  state: {
    name: 'John Doe',
    favoriteColor: 'turquoise'
  },

  mutations: {
    SET_NAME(state, newName) {
      state.name = newName
    },

    SET_FAVORITE_COLOR(state, newFavoriteColor) {
      state.favoriteColor = newFavoriteColor
    }
  },

  actions: {
    async fetchUserDetails({ commit }, userId) {
      const { name, favoriteColor } = await api.fetchUserDetails(userId)
      commit('SET_NAME', name)
      commit('SET_FAVORITE_COLOR', favoriteColor)
    }
  },

  getters: {
    userSummary(state) {
      return `${state.name}, favorite color is ${state.favoriteColor}`
    }
  }
})

console.log(store.getters.userSummary) // John Doe, favorite color is turquoise
```

## Modules

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  },
  state: { ... },
  mutations: { ... },
  actions: { ... }
})

console.log(store.state.a) // -> `moduleA`'s state
console.log(store.state.b) // -> `moduleB`'s state
```

## Livecoding

Repo: [https://git.io/fNHEF]()

## Coins Structure

<!--
- Data from coinmarketcap, downloaded for offline use
- Array of objects, with inPortfolio flag, amountOwned
- How it works: add coin to portfolio, buy and sell
-->

```json
{
  "id": 1,
  "name": "Bitcoin",
  "symbol": "BTC",
  "quotes": {
    "USD": {
      "price": 6504.83559012
    }
  },

  "inPortfolio": false,
  "amountOwned": 0.0
}
```

## Questions?
