import { createAction, createReducer } from "@reduxjs/toolkit";
import { Action } from "history";
import { Currency } from "../../interfaces/Currency";

const initialState: Currency = {
	currency: "usd",
};

export const handleCurrencurrcyChange = createAction(
	"currency/change",
	(currency) => {
		return {
			payload: {
				currency,
			},
		};
	}
);

export const CurrencySlice = createReducer(initialState, (builder) => {
	builder.addCase(handleCurrencurrcyChange, (state, action) => action.payload);
});
