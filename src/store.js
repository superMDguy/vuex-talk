import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const TIMEOUT = 3000;

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    coins: [],
    portfolio: []
  },
  mutations: {},
  actions: {}
});
