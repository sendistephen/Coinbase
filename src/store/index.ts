import { configureStore } from "@reduxjs/toolkit";
import chartsReducer from "./Charts/ChartsSlice";
import { CurrencySlice, ICurrency } from "./Currency/CurrencySlice";

const store = configureStore({
	reducer: {
		charts: chartsReducer,
		currency: CurrencySlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export const selectCharts = (state: RootState) => state.charts;
export const selectCurrency = (state: RootState) => state.currency;

export default store;
