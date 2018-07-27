import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlusSquare,
  faTrashAlt,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCurrencyFilter from 'vue-currency-filter'

library.add(faPlusSquare, faTrashAlt, faCheck)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false
})

Vue.config.productionTip = false
axios.defaults.baseURL = '/api'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
