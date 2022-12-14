import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CoinDataResponse, CoinResponse } from '../../interfaces/Coins';

// This is the initial state for our component
interface InitialState {
	loading: boolean;
	error: string | null;
	// coin is the data for the selected coin, if it has been fetched
	coin: CoinResponse | null;
}

// The Coin interface defines the shape of the "coin" argument to the fetchCoinDetails thunk
interface Coin {
	// coin is the identifier for the coin we want to fetch
	coin: string;
}

// This is the initial value for the state object
const initialState: InitialState = {
	loading: false,
	error: null,
	coin: null,
};

/**
 * This is the thunk that fetches the details for a coin from the CoinGecko API
 * The first argument is the action type, and the second is the type of the "coin" argument
 * The thunk handler takes the "coin" argument and the thunkAPI object, and returns the coin data
 */
export const fetchCoinDetails = createAsyncThunk<CoinResponse, Coin>(
	'coin/fetch',
	async (Coin, thunkAPi) => {
		// Destructure the "coin" property from the "Coin" argument
		const { coin } = Coin;
		// Make a GET request to the CoinGecko API to fetch the coin data
		const response = await axios.get<CoinResponse>(
			`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
		);
		// Return the data from the response
		return response.data;
	}
);

export const coinDetailsSlice = createSlice({
	name: 'coin',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Handle the pending state of the fetchCoinDetails action
		builder.addCase(fetchCoinDetails.pending, (state, action) => {
			state.loading = true;
		});

		// Handle the fulfilled state of the fetchCoinDetails action
		builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
			state.loading = false;
			state.coin = action.payload;
		});

		// Handle the rejected state of the fetchCoinDetails action
		builder.addCase(fetchCoinDetails.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default coinDetailsSlice.reducer;
