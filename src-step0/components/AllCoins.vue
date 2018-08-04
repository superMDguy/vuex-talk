<template>
  <div class="coinListWrapper">
    <h1 class="coinListTitle">Coins</h1>

    <ul class="coinList">
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/coinList';

.action {
  &.add {
    color: #29b6f6;
  }

  &.added {
    color: #9e9e9e;
  }
}
</style>
