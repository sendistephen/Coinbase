import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CoinDataResponse } from './../../interfaces/Coins/index';
import axios from 'axios';

// This is the initial state for our component
interface InitialState {
	loading: boolean;
	error: string | null;
	coins: CoinDataResponse[];
}
export interface CoinArgs {
	currency: string;
	page: number;
	perPage: number;
}
// This is the initial value for the state object
const initialState: InitialState = {
	loading: false,
	error: null,
	coins: [],
};

/**
 * This function fetches coins data from the CoinGecko API
 * and returns it in the form of an array of CoinDataResponse objects
 */
export const fetchCoins = createAsyncThunk<CoinDataResponse[], CoinArgs>(
	'coins/fetch',
	async (args) => {
		const { currency, perPage, page } = args;

		// make a GET request to the CoinGecko API with the specified parameters
		const response = await axios.get<CoinDataResponse[]>(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
		);
		return response.data;
	}
);

const coinsSlice = createSlice({
	name: 'coins',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Handle the pending state of the fetchCoins action
		builder.addCase(fetchCoins.pending, (state, action) => {
			state.loading = true;
		});
		// Handle the fulfilled state of the fetchCoins action
		builder.addCase(fetchCoins.fulfilled, (state, action) => {
			state.loading = false;
			state.coins = state.coins.concat(action.payload);
		});
		// Handle the rejected state of the fetchCoins action
		builder.addCase(fetchCoins.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default coinsSlice.reducer;
