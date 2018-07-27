import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function simulateAsyncWait() {
  const TIMEOUT = 1000
  return new Promise(resolve => setTimeout(resolve, TIMEOUT))
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    coins: [],
    portfolio: []
  },

  mutations: {
    SET_COINS(state, coins) {
      state.coins = coins
    },
    ADD_TO_PORTFOLIO(state, coin) {
      state.portfolio.push(coin)
    },
    REMOVE_FROM_PORTFOLIO(state, coin) {
      const coinIndex = state.portfolio.indexOf(
        portfolioItem => portfolioItem.id === coin.id
      )
      state.portfolio.splice(coinIndex, 1)
    }
  },

  actions: {
    async addToPortfolio({ commit, getters }, coin) {
      if (!getters.inPortfolio(coin)) {
        await simulateAsyncWait()
        commit('ADD_TO_PORTFOLIO', coin)
      }
    },
    async removeFromPortfolio({ commit, getters }, coin) {
      if (getters.inPortfolio(coin)) {
        await simulateAsyncWait()
        commit('REMOVE_FROM_PORTFOLIO', coin)
      }
    },
    async fetchCoins({ commit }) {
      axios
        .get('/ticker?structure=array')
        .then(res => commit('SET_COINS', res.data.data))
    }
  },

  getters: {
    inPortfolio(state) {
      return coinToCheck =>
        Boolean(state.portfolio.find(coin => coin.id === coinToCheck.id))
    },
    portfolioValue(state) {
      return state.portfolio.reduce((a, b) => a + b.quotes.USD.price, 0)
    }
  }
})
