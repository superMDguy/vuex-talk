<template>
  <div id="app">
    <coin-list></coin-list>
    <portfolio></portfolio>
  </div>
</template>

<script>
import Portfolio from "@/components/Portfolio";
import CoinList from "@/components/CoinList";

export default {
  components: {
    CoinList,
    Portfolio
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }
}
</style>
