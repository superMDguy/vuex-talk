import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/../lib/api'
// import { asyncTask, keyedAsyncTask } from '@/../lib/async-task'

Vue.use(Vuex)

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
        await api.addToPortfolio(coin)
        commit('ADD_TO_PORTFOLIO', coin)
      }
    },

    async removeFromPortfolio({ commit, getters }, coin) {
      if (getters.inPortfolio(coin)) {
        await api.removeFromPortfolio(coin)
        commit('REMOVE_FROM_PORTFOLIO', coin)
      }
    },

    async fetchCoins({ commit }) {
      const coins = await api.fetchCoins()
      commit('SET_COINS', coins)
    },

    async buy({ commit }, { coin, amount }) {
      amount = parseFloat(amount)

      if (amount) {
        await api.transaction(coin, amount)
        commit('TRANSACTION', { coin, amount: parseFloat(amount) })
      }
    },

    async sell({ commit }, { coin, amount }) {
      if (amount <= coin.amountOwned) {
        amount = parseFloat(amount)

        if (amount) {
          await api.transaction(coin, -1 * amount)
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
