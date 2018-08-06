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

## portfolio --> transactions

- Add `TRANSACTION` mutation to store

```js
TRANSACTION(state, { coin, amount }) {
    coinById(state.portfolio, coin.id).amountOwned += amount
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

```js
REMOVE_FROM_PORTFOLIO(state, coin) {
    const coinIndex = state.portfolio.findIndex(
        portfolioItem => portfolioItem.id === coin.id
    )
    state.portfolio.splice(coinIndex, 1)
}
```

- Add remove action to Portfolio comp

```html
<font-awesome-icon size="lg" icon="trash-alt" @click="removeFromPortfolio(coin)" class="clickable action trash" />
```
