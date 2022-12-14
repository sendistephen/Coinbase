import { createAction, createReducer } from '@reduxjs/toolkit';
import { Action } from 'history';
import { Currency } from '../../interfaces/Currency';

// This code creates an initial state for the `currency` slice of the Redux store,
// with a default currency of "usd".
const initialState: Currency = {
	currency: 'usd',
};

// This action creator creates an action that can be dispatched to update
// the currency in the Redux store.
export const handleCurrencurrcyChange = createAction('currency/change', (currency) => {
	return {
		payload: {
			currency,
		},
	};
});

// This reducer listens for `handleCurrencurrcyChange` actions and updates
// the currency slice of the Redux store accordingly.
export const CurrencySlice = createReducer(initialState, (builder) => {
	builder.addCase(handleCurrencurrcyChange, (state, action) => action.payload);
});
