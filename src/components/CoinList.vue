<template>
  <ul>
    <li v-for="coin in coins" :key="coin.id">
      <span>{{ coin.name }}: {{ coin.quotes.USD.price | currency }}</span>
      <font-awesome-icon v-if="inPortfolio(coin)" size="lg" icon="trash-alt" @click="removeFromPortfolio(coin)" title="Remove from portfolio" class="iconBtn remove" />
      <font-awesome-icon v-else size="lg" icon="plus-square" @click="addToPortfolio(coin)" title="Add to portfolio" class="iconBtn add" />
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CoinList',
  props: {
    coins: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['inPortfolio'])
  },
  methods: {
    ...mapActions(['addToPortfolio', 'removeFromPortfolio'])
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    margin: 10px 0;
    padding: 15px;
    border: 1px solid gray;
    position: relative;
    line-height: 30px;
    height: 30px;

    .iconBtn {
      position: absolute;
      right: 15px;
      cursor: pointer;

      &.add {
        color: lightgreen;
      }

      &.remove {
        color: red;
      }
    }
  }
}
</style>
