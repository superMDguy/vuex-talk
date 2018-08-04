<template>
    <div class="coinListWrapper">
        <h1 class="coinListTitle">Coins</h1>

        <ul class="coinList">
            <li v-for="coin in coins" :key="coin.id">
                <span>
                    {{ coin.name }}: {{ coin.quotes.USD.price | currency }}
                </span>

                <div class="actions">
                    <font-awesome-icon v-if="inPortfolio(coin)" size="lg" icon="check" class="action added" />
                    <font-awesome-icon v-else size="lg" icon="cart-plus" @click="addToPortfolio(coin)" title="Add to portfolio" class="clickable action add" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['coins']),
    ...mapGetters(['inPortfolio'])
  },
  methods: {
    ...mapActions(['fetchCoins', 'addToPortfolio'])
  },
  created() {
    this.fetchCoins()
  }
}
</script>


<style lang="scss" scoped>
@import '../styles/coinList';

.action {
  &.add {
    color: lightskyblue;
  }

  &.added {
    color: lightgreen;
  }
}
</style>
