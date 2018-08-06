# Steps

What to do to transition between each step during talk

## init --> vuex-init

- Create store.js
- In store.js, import vuex, vue
- `Vue.use(Vuex)`
- `export default new Vuex.store({})`
- `strict: process.env.NODE_ENV !== 'production',`
- State has coins, portfolio
- mutations, actions, getters all empty objects
- In main.js: import store, add to Vue constructor

## vuex-init --> fetch-coins

- Import api in store.js
- Create mutation `SET_COINS`
- Create action `fetchCoins` that `await`s `api.fetchCoins`, and runs commit
- In allCoins, `mapState` for `coins` and `mapActions` for `fetchCoins`
- Add v-for over coins in template, with `coin.name` and `coin.quotes.USD.price | currency` spans

## fetch-coins --> portfolio

- Add `coinById` helper
- Add `SET_AMOUNT_OWNED`, `ADD_TO_PORTFOLIO` mutations
- Create `inPortfolio` getter
- Add `addToPortfolio` action, that checks if in portfolio, resets amount owned, runs commit
- In AllCoins: `mapGetters` for `inPortfolio`, `mapActions` for `addToPortfolio`
- Add cart actions:

```html
<div class="actions">
    <font-awesome-icon v-if="inPortfolio(coin)" size="lg" icon="check" class="action added" />
    <font-awesome-icon v-else size="lg" icon="cart-plus" @click="addToPortfolio(coin)" class="clickable action add" />
</div>
```

- In Portfolio: `mapState` for portfolio
- Loop over portfolio, show name, price, `{amountOwned} {symbol}`
- Add `portfolioValue` getter to store, and map it into Portfolio
- Show portfolio value:

```html
<div class="portfolioValue">
    Portfolio Value: {{ portfolioValue | currency }}
</div>
```

```css
.portfolioValue {
  font-weight: 600;
  padding: 10px 0;
}
```

## portfolio --> 
