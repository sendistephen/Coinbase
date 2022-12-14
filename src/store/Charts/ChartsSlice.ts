import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { CoinMarketChartResponseJson } from '../../interfaces/Coins';

// InitialState defines the shape of the initial state object
interface InitialState {
	data: CoinMarketChartResponseJson; // data containing prices, market_caps, and total_volumes
	loading: boolean; // indicates whether data is being loaded
	error: boolean; // indicates whether an error occurred while loading data
}

// initialState is the initial state object with empty data arrays,
// loading set to false, and error set to false
const initialState: InitialState = {
	data: {
		prices: [],
		market_caps: [],
		total_volumes: [],
	},
	loading: false,
	error: false,
};

// ChartArgs defines the shape of the arguments for the `fetchChartsData` thunk
interface ChartArgs {
	coin: string; // name of the coin to fetch data for
	duration: string; // duration of the data to fetch
}

/**
 * `fetchChartsData` is an async thunk action creator that fetches chart data from the CoinGecko API
 * It expects a `coin` and `duration` argument and dispatches pending, fulfilled, and rejected actions
 * based on the request's status
 */
export const fetchChartsData = createAsyncThunk<CoinMarketChartResponseJson, ChartArgs, {}>(
	'charts/fetchCharts',
	async (data, { getState }) => {
		const { coin, duration } = data;
		const {
			currency: { currency },
		} = getState() as RootState;
		// make a GET request to the Coingecko API to fetch chart data
		const response = await axios.get<CoinMarketChartResponseJson>(
			`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${duration}&interval=daily`
		);
		return response.data;
	}
);
// Define ChartsSlice, which manages the state for a set of charts.
export const ChartsSlice = createSlice({
	name: 'charts', // The name of the slice is 'charts'
	initialState, // The initial state for the slice is defined in a separate variable above
	reducers: {}, // The slice does not define any reducer functions
	extraReducers: (builder) => {
		// The slice defines some extra reducer functions using the 'builder' helper
		// The first extra reducer handles the 'pending' action for the 'fetchChartsData' asynchronous action
		builder
			.addCase(fetchChartsData.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			// The second extra reducer handles the 'fulfilled' action for the 'fetchChartsData' asynchronous action
			.addCase(fetchChartsData.fulfilled, (state, action) => {
				state.loading = false;
				state.error = false;
				state.data = action.payload; // Set the 'data' property of the slice's state to the payload of the action
			})
			// The third extra reducer handles the 'rejected' action for the 'fetchChartsData' asynchronous action
			.addCase(fetchChartsData.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});

export default ChartsSlice.reducer;
