<template>
    <div>
        <span>{{ coin.name }}: ${{ coin.quotes.USD.price }}</span>
        <button>Add to portfolio</button>
    </div>
</template>

<script>
export default {
  name: "CoinDetails",
  props: {
    coin: {
      type: Object,
      required: true
    }
  }
};
</script>
