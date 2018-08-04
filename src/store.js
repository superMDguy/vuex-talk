import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function simulateAsyncWait() {
  const TIMEOUT = 1000
  return new Promise(resolve => setTimeout(resolve, TIMEOUT))
}

function coinById(coins, coinId) {
  return coins.find(coin => coin.id === coinId)
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
      Vue.set(coin, 'amountOwned', 0)
      state.portfolio.push(coin)
    },

    TRANSACTION(state, { coin, amount }) {
      coinById(state.portfolio, coin.id).amountOwned += amount
    },

    REMOVE_FROM_PORTFOLIO(state, coin) {
      Vue.set(coin, 'amountOwned', 0)
      const coinIndex = state.portfolio.findIndex(
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
    },

    async buy({ commit }, { coin, amount }) {
      amount = parseFloat(amount)

      if (amount) {
        await simulateAsyncWait()
        commit('TRANSACTION', { coin, amount: parseFloat(amount) })
      }
    },

    async sell({ commit }, { coin, amount }) {
      if (amount <= coin.amountOwned) {
        amount = parseFloat(amount)

        if (amount) {
          await simulateAsyncWait()
          commit('TRANSACTION', { coin, amount: -1 * amount })
        }
      } else {
        throw 'Cannot sell more coins than currently owned.'
      }
    }
  },

  getters: {
    inPortfolio(state) {
      return coin => Boolean(coinById(state.portfolio, coin.id))
    },

    portfolioValue(state) {
      return state.portfolio.reduce(
        (a, b) => a + b.amountOwned * b.quotes.USD.price,
        0
      )
    }
  }
})
