import Vue from 'vue'
import Vuex from 'vuex'
import remove from 'lodash/remove'

Vue.use(Vuex)

function simulateAsyncWait() {
  const TIMEOUT = 3000
  return new Promise(resolve => setTimeout(resolve, TIMEOUT))
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    coins: [],
    portfolio: []
  },
  mutations: {
    ADD_TO_PORTFOLIO(state, coin) {
      state.portfolio.append(coin)
    },
    REMOVE_FROM_PORTFOLIO(state, coin) {
      remove(state.portfolio, coin)
    }
  },
  actions: {}
})
