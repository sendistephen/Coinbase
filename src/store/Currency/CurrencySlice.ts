import { createAction, createReducer } from "@reduxjs/toolkit";
import { Action } from "history";

export interface ICurrency {
	currency: String;
}

const initialState = {
	currency: "usd",
} as ICurrency;

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
