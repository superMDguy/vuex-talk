import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/../shared/api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    coins: []
  },

  mutations: {
    SET_COINS(state, coins) {
      state.coins = coins
    },

    SET_AMOUNT_OWNED(state, { coin, amount }) {
      Vue.set(coin, 'amountOwned', amount)
    },

    ADD_TO_PORTFOLIO(state, coin) {
      Vue.set(coin, 'inPortfolio', true)
    },

    TRANSACTION(state, { coin, amount }) {
      coin.amountOwned += amount
    },

    REMOVE_FROM_PORTFOLIO(state, coin) {
      coin.inPortfolio = false
    }
  },

  actions: {
    async fetchCoins({ commit }) {
      const coins = await api.fetchCoins()
      commit('SET_COINS', coins)
    },

    async addToPortfolio({ commit }, coin) {
      if (!coin.inPortfolio) {
        await api.addToPortfolio(coin)
        commit('SET_AMOUNT_OWNED', { coin, amount: 0 })
        commit('ADD_TO_PORTFOLIO', coin)
      }
    },

    async buy({ commit }, { coin, amount }) {
      amount = parseFloat(amount)

      if (amount) {
        await api.transaction(coin, amount)
        commit('TRANSACTION', { coin, amount })
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
    },

    async removeFromPortfolio({ commit }, coin) {
      if (coin.inPortfolio) {
        await api.removeFromPortfolio(coin)
        commit('SET_AMOUNT_OWNED', { coin, amount: 0 })
        commit('REMOVE_FROM_PORTFOLIO', coin)
      }
    }
  },

  getters: {
    portfolioValue(state, getters) {
      return getters.portfolio.reduce(
        (acc, coin) => acc + coin.amountOwned * coin.quotes.USD.price,
        0
      )
    },

    portfolio(state) {
      return state.coins.filter(coin => coin.inPortfolio)
    }
  }
})
