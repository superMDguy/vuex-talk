import coins from './coins.json'

function simulateAsyncWait(averageTimeout) {
  const TIMEOUT = averageTimeout / 2 + Math.random() * averageTimeout
  return new Promise(resolve => setTimeout(resolve, TIMEOUT))
}

const api = {
  async fetchCoins() {
    await simulateAsyncWait(3000)
    throw 'Error fetching coins'
    // return Object.values(coins.data)
  }
}

const proxy = new Proxy(api, {
  get(target, key) {
    if (typeof key === 'string' && !(key in target)) {
      return () => simulateAsyncWait(1000)
    }

    return target[key]
  }
})

export default proxy
