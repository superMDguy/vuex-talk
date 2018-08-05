---
author: Matthew Dangerfield
title: Vuex in Depth
date: August 9, 2018
---

## Frontend State Management

## Flux

- Focus on controlled, unidirectional data flow

##

![Flux flow diagram](images/flux-simple-f8-diagram-with-client-action-1300w.png)

## Dispatchers

<!--
- Distributes actions to all stores
- One dispatcher per application
-->

```js
import { Dispatcher } from 'flux'

const dispatcher = new Dispatcher()
```

## Stores

<!--
    - Contain application state for specific application domain
    - Receives all actions from dispatcher and potentially updates data and emits change event
    - Each store only acts on actions that relate to it
-->

```js
import { ReduceStore } from 'flux/utils'

class CounterStore extends ReduceStore {
  constructor() {
    super(CounterStore)
  }

  getInitialState() {
    return 0
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.ADD:
        return state + 1

      default:
        return state
    }
  }
}
```

## Actions

<!--
    - Object, have type property + other data
-->

```js
const actions = {
  increment() {
    dispatcher.dispatch({
      type: ActionTypes.ADD,
      amount: 1
    })
  }
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

## One-way Data Flow

![flow diagram](images/flow.png)
