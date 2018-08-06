import coins from './coins.json'

const api = {
  simulateAsyncWait() {
    const TIMEOUT = 500 + Math.random() * 1000
    return new Promise(resolve => setTimeout(resolve, TIMEOUT))
  },

  async fetchCoins() {
    // axios
    //   .get('/ticker?structure=array')
    //   .then(res => commit('SET_COINS', res.data.data))
    await this.simulateAsyncWait()
    return Object.values(coins.data)
  }
}

const handler = {
  get(target, key) {
    if (typeof key === 'string' && !(key in target)) {
      return api.simulateAsyncWait
    }

    return target[key]
  }
}

const proxy = new Proxy(api, handler)

export default proxy
