<template>
  <div>
    <h1>
      Coins
    </h1>
    <ul>
      <li v-for="coin in coins" :key="coin.id">
        <coin-details :coin="coin"></coin-details>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import CoinDetails from "@/components/CoinDetails"

export default {
  name: "CoinList",
  components: {
    CoinDetails
  },
  data() {
    return {
      coins: []
    };
  },
  created() {
    axios
      .get("/ticker?structure=array")
      .then(res => (this.coins = res.data.data));
  }
};
</script>
