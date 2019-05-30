import Vue from '../shared/main'
import App from '../shared/App'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
