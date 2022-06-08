import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CoinMarketChartResponseJson } from "../../interfaces/Coins";
import { fetchCharts } from "../../services/chartsService";

interface InitialState {
	data: CoinMarketChartResponseJson;
	loading: boolean;
	error: boolean;
}
const initialState: InitialState = {
	data: {
		prices: [],
		market_caps: [],
		total_volumes: [],
	},
	loading: false,
	error: false,
};

export const fetchChartsData = createAsyncThunk<
	CoinMarketChartResponseJson,
	void
>("charts/fetchCharts", async (_, thunkAPI) => {
	const {
		currency: { currency },
	} = thunkAPI.getState() as RootState;
	try {
		return await fetchCharts(currency as string);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const ChartsSlice = createSlice({
	name: "charts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchChartsData.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(
				fetchChartsData.fulfilled,
				(state, action: PayloadAction<CoinMarketChartResponseJson>) => {
					state.loading = false;
					state.error = false;
					state.data = action.payload;
				}
			)
			.addCase(fetchChartsData.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});
export default ChartsSlice.reducer;
