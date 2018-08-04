<template>
  <div id="app">
    <portfolio class="column" />
    <all-coins class="column" />
  </div>
</template>

<script>
import AllCoins from '@/components/AllCoins'
import Portfolio from '@/components/Portfolio'

export default {
  components: {
    AllCoins,
    Portfolio
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

    @media screen and (max-width: 800px) {
      flex-direction: column;
    }

    @media screen and (min-width: 800px) {
      flex-direction: row;
    }

    .column {
      flex: 1;
      padding: 0 10px;
    }
  }
}
</style>
