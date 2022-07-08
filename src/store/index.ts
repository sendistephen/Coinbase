import { configureStore } from "@reduxjs/toolkit";
import chartsReducer from "./Charts/ChartsSlice";
import { CurrencySlice } from "./Currency/CurrencySlice";
import GlobalReducer from "./Global/GlobalSlice";
import CoinsReducer from "./Coins/CoinsSlice";

const store = configureStore({
	reducer: {
		charts: chartsReducer,
		currency: CurrencySlice,
		global: GlobalReducer,
		coins: CoinsReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectCharts = (state: RootState) => state.charts;
export const selectCurrency = (state: RootState) => state.currency;
export const selectGlobal = (state: RootState) => state.global;
export const selectCoins = (state: RootState) => state.coins;

export default store;
