import Vue from 'vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlusSquare,
  faMinusSquare,
  faCartPlus,
  faCheck,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCurrencyFilter from 'vue-currency-filter'

library.add(faPlusSquare, faMinusSquare, faCartPlus, faCheck, faTrashAlt)
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

export default Vue
