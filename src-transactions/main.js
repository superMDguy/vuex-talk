import Vue from '../lib/main'
import App from '../lib/App'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
