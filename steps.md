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
- Mention `map{*}` helpers vs `this.$store.{*}`. Debuggability?
- Add v-for over coins in template, with `coin.name` and `coin.quotes.USD.price | currency` spans

## fetch-coins --> portfolio

- Add `SET_AMOUNT_OWNED`, `ADD_TO_PORTFOLIO` mutations
- Add `addToPortfolio` action, that checks if in portfolio, resets amount owned, runs commit
- Add `portfolio` getter, that filters coins for `inPortfolio`
- In AllCoins: `mapActions` for `addToPortfolio`
- Add cart actions:

```html
<div class="actions">
    <font-awesome-icon v-if="coin.inPortfolio" size="lg" icon="check" class="action added" />
    <font-awesome-icon v-else size="lg" icon="cart-plus" @click="addToPortfolio(coin)" class="clickable action add" />
</div>
```

- In Portfolio: `mapGetters` for portfolio
- Loop over portfolio, show name, price, `{amountOwned} {symbol}`
- Add `portfolioValue` getter to store, and map it into Portfolio
- Discuss local computed vs store getter. Maybe only if used by multiple components?
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

## portfolio --> transactions

- Add `TRANSACTION` mutation to store

```js
TRANSACTION(state, { coin, amount }) {
    coin.amountOwned += amount
}
```

- Add `buy` and `sell` actions. Both run `amount = parseFloat(amount)`, sell has extra `amount <= coin.amountOwned` check that throws error otherwise.
- In Portfolio: `mapActions` `buy` and `sell`. Add `initBuy` and `initSell`, that use prompt.
- Add icon buttons for `buy` and `sell`

```html
<div class="actions">
    <font-awesome-icon size="lg" icon="plus-square" @click="initBuy(coin)" class="clickable action buy" />
    <font-awesome-icon size="lg" icon="minus-square" @click="initSell(coin)" class="clickable action sell" />
</div>
```

- Add remove from portfolio mutation, action. Action should also SET_AMOUNT_OWNED to 0, and also check if in portfolio.
- Add remove action to Portfolio comp

```html
<font-awesome-icon size="lg" icon="trash-alt" @click="removeFromPortfolio(coin)" class="clickable action trash" />
```

## transactions -> tuxi

- Show how slow it is
- import asyncTask in store
- Add `fetchCoinsTask` to state
- Refactor fetchCoins to do `state.fetchCoins.start()`
- In AllCoins: `mapState` in the `fetchCoinsTask`, and add `div.loader` if it's spinning
- Add `v-else-if="fetchCoinsTask.hasValue"` to `ul.coinList`
- In `api.js` add line to throw exception. In AllCoins, add `div.error` if `fetchCoinsTask.error` with text `{{ fetchCoinsTask.error }}`
- Discuss: has loading, also error. Features: always uses newest request, discards returned value and ends promise chain if newer request sent. Also way to deal with situatiouns where you want multiple concurrent requests, for example when adding items to portfolio. Talk to me afterwards if interested.
