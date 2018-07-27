<template>
  <div id="app">
    <div class="column">
      <h1>
        Coins
      </h1>
      <coin-list :coins="coins"></coin-list>
    </div>

    <div class="column">
      <h1>Portfolio</h1>
      <coin-list :coins="portfolio"></coin-list>

      <div class="portfolioValue">
        Total Value: {{ portfolioValue | currency }}
      </div>
    </div>
  </div>
</template>

<script>
import CoinList from '@/components/CoinList'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    CoinList
  },
  computed: {
    ...mapState(['coins', 'portfolio']),
    ...mapGetters(['portfolioValue'])
  },
  methods: {
    ...mapActions(['fetchCoins'])
  },
  created() {
    this.fetchCoins()
  }
}
</script>

<style lang="scss">
body {
  margin: 0;

  #app {
    width: 100vw;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    display: flex;
    flex-direction: row;

    .column {
      flex: 1;
      padding: 0 10px;
    }
  }
}
</style>
