import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/../lib/api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    coins: [],
    portfolio: []
  },

  mutations: {
    SET_COINS(state, coins) {
      state.coins = coins
    }
  },

  actions: {
    async fetchCoins({ commit }) {
      const coins = await api.fetchCoins()
      commit('SET_COINS', coins)
    }
  },

  getters: {}
})
