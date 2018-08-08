import coins from './coins.json'

function simulateAsyncWait() {
  const TIMEOUT = 500 + Math.random() * 1000
  return new Promise(resolve => setTimeout(resolve, TIMEOUT))
}

const api = {
  async fetchCoins() {
    await simulateAsyncWait()
    return Object.values(coins.data)
  }
}

const proxy = new Proxy(api, {
  get(target, key) {
    if (typeof key === 'string' && !(key in target)) {
      return simulateAsyncWait
    }

    return target[key]
  }
})

export default proxy
