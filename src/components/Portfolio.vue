<template>
    <div class="coinListWrapper">
        <h1 class="coinListTitle">Portfolio</h1>

        <ul class="coinList">
            <li v-for="coin in portfolio" :key="coin.id">
                <span>{{ coin.name }}: {{ coin.quotes.USD.price | currency }}</span>

                <span>1 share</span>

                <div class="actions">
                    <font-awesome-icon size="lg" icon="plus-square" @click="addShares(coin)" class="clickable action add" />
                    <font-awesome-icon size="lg" icon="minus-square" @click="removeFromPortfolio(coin)" class="clickable action remove" />
                </div>
            </li>
        </ul>

        <div class="portfolioValue">
            Total Value: {{ portfolioValue | currency }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['portfolio']),
    ...mapGetters(['portfolioValue'])
  },
  methods: {
    ...mapActions(['removeFromPortfolio'])
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/coinList';

.action {
  &.add {
    color: lightskyblue;
  }

  &.remove {
    color: red;
  }
}

.portfolioValue {
  padding: 10px 0;
}
</style>
