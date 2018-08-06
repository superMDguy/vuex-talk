---
author: Matthew Dangerfield
title: Vuex in Depth
date: August 9, 2018
---

## Frontend State Management

## Flux

<!--
- Architecture, not framework or library. Though there is flux library, and flummox
- Focus on controlled, unidirectional data flow
- Used for React
-->

##

![Flux flow diagram](images/flux-simple-f8-diagram-with-client-action-1300w.png)

## Dispatchers

<!--
- Distributes actions to all stores
- One dispatcher per application
- Has register method to register listener to dispatches
- Has dispatch method
-->

```js
class Dispatcher {
  register(callback) {
    // adds callback to callbacks
  }

  dispatch(action) {
    // runs each callback with action
  }
}
```

## Stores

<!--
    - Contain application state for specific application domain
    - Receives all actions from dispatcher and potentially updates data and emits change event
    - Each store only acts on actions that relate to it
-->

```js
class Store {
  constructor() {
    this.state = {
      count: 0
    }
  }

  handleAdd(amount) {
    this.setState({ count: this.state.count + amount })
  }
}
```

## Actions

<!--
- Object, have type property + other data
- Noramllly used as action creators return action to be dispatched to store
-->

```js
function incrementAction() {
  dispatcher.dispatch({
    type: ActionTypes.ADD,
    amount: 1
  })
}
```

## Views

<!--
- Subscribe to change events from stores
-->

- Can use any view library

## Redux

<!--
- Simplified, less boilerplate version of Flux
- No dispatcher, each store has dispatch function
- Store is just state, reducers mutate state.
-->

## JS Array Reducers

<!--
- Takes current state, payload, and returns new state
-->

```js
const sum = [1, 2, 3].reduce((a, b) => a + b)
```

## Redux Reducers

```js
function counterReducer(state = 0, action) {
  switch (action.type) {
    case ActionTypes.ADD:
      return state + action.amount
    default:
      return state
  }
}

const initialState = 0
const mutations = [
  { type: ActionTypes.ADD, amount: 2 },
  { type: ActionTypes.ADD, amount: 1 }
]
const finalState = mutations.reduce(counterReducer, initialState) // 3
```

## Redux Store

<!--
- Used instead of Flux
- Store is forced to be immutable: prevents complicated interactions, must subscribe to changes
-->

```js
import { createStore } from 'redux'
const store = createStore(counterReducer)
store.subscribe(() => console.log(store.getState()))
store.dispatch({ type: ActionTypes.ADD, amount: 3 }) // logs 0
```

## Vuex

> A state management pattern + library for Vue.js applications

<!--
- Created to solve problem of shared state that needs to be mutated
- Can't always rely on parent/child relationship, better to have global store
- Stores are reactive, built around Vue
- No direcly mutating state, must happen in mutation
- Not immutable, because that wouldn't work with vue's reactivity
-->

## Vuex Example

<!--
- Much simpler than flux, redux. Everything encapsulated in object, but still separation of state vs actions
- Example from docs, which are very good
-->

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

store.commit('increment')

console.log(store.state.count) // -> 1
```

##

![Vuex flow diagram](images/flow.png)

## Livecoding

## Questions?
