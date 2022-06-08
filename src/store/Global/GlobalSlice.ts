import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalDataResponseJson } from "../../interfaces/Global/index";
import { fetchGlobal } from "../../services/GlobalService";

interface InitialState {
	data: GlobalDataResponseJson;
	loading: boolean;
	error: string | null;
}
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

export const fetchGlobalData = createAsyncThunk<GlobalDataResponseJson, void>(
	"market/fetchMarketData",
	async (_, thunkAPI) => {
		try {
			return await fetchGlobal();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const GlobalSlice = createSlice({
	name: "market",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGlobalData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchGlobalData.fulfilled,
				(state, action: PayloadAction<GlobalDataResponseJson>) => {
					state.loading = false;
					state.error = null;
					state.data = action.payload;
				}
			)
			.addCase(fetchGlobalData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});
export default GlobalSlice.reducer;
