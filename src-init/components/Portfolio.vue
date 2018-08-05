<template>
  <div class="coinListWrapper">
    <h1 class="coinListTitle">Portfolio</h1>

    <ul class="coinList">
    </ul>

    <div class="portfolioValue">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/coinList';

.action {
  &.add {
    color: #81c784;
  }

  &.remove {
    color: #f44336;
  }
}

.portfolioValue {
  font-weight: 600;
  padding: 10px 0;
}
</style>
