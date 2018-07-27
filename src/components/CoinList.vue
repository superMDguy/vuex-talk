<template>
  <ul>
    <li v-for="coin in coins" :key="coin.id">
      <span>{{ coin.name }}: {{ coin.quotes.USD.price | currency }}</span>

      <template v-if="inPortfolio(coin)">
        <font-awesome-icon v-if="showRemove" size="lg" icon="trash-alt" @click="removeFromPortfolio(coin)" class="clickable icon remove" />
        <font-awesome-icon v-else size="lg" icon="check" class="icon added" />
      </template>

      <font-awesome-icon v-else size="lg" icon="plus-square" @click="addToPortfolio(coin)" title="Add to portfolio" class="clickable icon add" />
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
    },
    showRemove: {
      type: Boolean,
      default: false
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

    .icon {
      position: absolute;
      right: 15px;

      &.clickable {
        cursor: pointer;
      }

      &.add {
        color: lightskyblue;
      }

      &.added {
        color: lightgreen;
      }

      &.remove {
        color: red;
      }
    }
  }
}
</style>
