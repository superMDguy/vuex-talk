<template>
  <div class="coinListWrapper">
    <h1 class="coinListTitle">Portfolio</h1>

    <ul class="coinList">
      <li v-for="coin in portfolio" :key="coin.id">
        <span>{{ coin.name }}</span>

        <span>{{ coin.quotes.USD.price | currency }}</span>

        <span>{{ coin.amountOwned }} {{ coin.symbol }} owned</span>
      </li>
    </ul>

    <div class="portfolioValue">
      Portfolio Value: {{ portfolioValue | currency }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['portfolio']),
    ...mapGetters(['portfolioValue'])
  }
}
</script>


<style lang="scss" scoped>
@import '../../lib/styles/coinList';

.portfolioValue {
  font-weight: 600;
  padding: 10px 0;
}
</style>
