import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/../lib/api'

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

    SET_AMOUNT_OWNED(state, { coin, amount }) {
      Vue.set(coinById(state.coins, coin.id), 'amountOwned', amount)
    },

    ADD_TO_PORTFOLIO(state, coin) {
      state.portfolio.push(coinById(state.coins, coin.id))
    }
  },

  actions: {
    async fetchCoins({ commit }) {
      const coins = await api.fetchCoins()
      commit('SET_COINS', coins)
    },

    async addToPortfolio({ commit, getters }, coin) {
      if (!getters.inPortfolio(coin)) {
        await api.addToPortfolio(coin)
        commit('SET_AMOUNT_OWNED', { coin, amount: 0 })
        commit('ADD_TO_PORTFOLIO', coin)
      }
    }
  },

  getters: {
    inPortfolio(state) {
      return coin => Boolean(coinById(state.portfolio, coin.id))
    },

    portfolioValue(state) {
      return state.portfolio.reduce(
        (acc, coin) => acc + coin.amountOwned * coin.quotes.USD.price,
        0
      )
    }
  }
})
