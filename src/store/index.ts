import { configureStore } from "@reduxjs/toolkit";
import chartsReducer from "./Charts/ChartsSlice";
import { CurrencySlice } from "./Currency/CurrencySlice";
import GlobalReducer from "./Global/GlobalSlice";

const store = configureStore({
	reducer: {
		charts: chartsReducer,
		currency: CurrencySlice,
		global: GlobalReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectCharts = (state: RootState) => state.charts;
export const selectCurrency = (state: RootState) => state.currency;
export const selectGlobal = (state: RootState) => state.global;

export default store;
