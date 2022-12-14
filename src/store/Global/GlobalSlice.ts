import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalDataResponseJson } from '../../interfaces/Global/index';
import { fetchGlobal } from '../../services/GlobalService';

interface InitialState {
	data: GlobalDataResponseJson;
	loading: boolean;
	error: string | null;
}
// This is the initial value for the state object
const initialState: InitialState = {
	data: {
		data: {
			active_cryptocurrencies: 0,
			ended_icos: 0,
			market_cap_change_percentage_24h_usd: 0,
			market_cap_percentage: {
				btc: 0,
				eth: 0,
				ltc: 0,
			},
			markets: 0,
			ongoing_icos: 0,
			total_market_cap: {},
			total_volume: {},
			upcoming_icos: 0,
			updated_at: 0,
		},
	},
	loading: false,
	error: null,
};

/**
 * The first argument is a string that is used as the action type for this thunk
 * The second argument is a function that contains the logic for the thunk
 * The function receives two arguments: the payload of the action, and the thunk API object
 */
export const fetchGlobalData = createAsyncThunk<GlobalDataResponseJson, void>(
	'market/fetchMarketData',
	async (_, thunkAPI) => {
		try {
			// fetch the global data from the API
			return await fetchGlobal();
		} catch (error) {
			// If there is an error, we reject the thunk with the error as the value
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const GlobalSlice = createSlice({
	name: 'market',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Handle the pending state of the fetchGlobalData action
			.addCase(fetchGlobalData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			// Handle the fulfilled state of the fetchGlobalData action
			.addCase(
				fetchGlobalData.fulfilled,
				(state, action: PayloadAction<GlobalDataResponseJson>) => {
					state.loading = false;
					state.error = null;
					state.data = action.payload;
				}
			)
			// Handle the rejected state of the fetchGlobalData action
			.addCase(fetchGlobalData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});
export default GlobalSlice.reducer;
