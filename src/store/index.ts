import { configureStore } from "@reduxjs/toolkit";
import chartsReducer from "./Charts/ChartsSlice";
import { CurrencySlice } from "./Currency/CurrencySlice";
import GlobalReducer from "./Global/GlobalSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import coinsReducer from "./Coins/CoinsSlice";

/**
 * Setup the store
 */
const store = configureStore({
	reducer: {
		charts: chartsReducer,
		currency: CurrencySlice,
		global: GlobalReducer,
		coins: coinsReducer,
	},
});

setupListeners(store.dispatch);
/**
 * We define the state type with RootState.
 * this will be used for selectors and action dispatch.
 * When we type individual states and actions, we get a strongly typed store correctly inferred.
 */
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const selectCharts = (state: RootState) => state.charts;
export const selectCurrency = (state: RootState) => state.currency;
export const selectGlobal = (state: RootState) => state.global;
export const selectCoins = (state: RootState) => state.coins;
export default store;
