import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchCharts } from "../../services/chartsService";

export interface Chart {
	prices: number[];
	total_volumes: number[];
	market_caps: string[];
	loading: boolean;
	error: boolean;
}
const initialState: Chart = {
	prices: [],
	total_volumes: [],
	market_caps: [],
	loading: false,
	error: false,
};

export const fetchChartsData = createAsyncThunk<Chart, void>(
	"charts/fetchCharts",
	async (_, thunkAPI) => {
		const {
			currency: { currency },
		} = thunkAPI.getState() as RootState;
		try {
			return await fetchCharts(currency);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

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
				(state, action: PayloadAction<Chart>) => {
					state.loading = false;
					state.error = false;
					state.prices = action.payload.prices;
					state.total_volumes = action.payload.total_volumes;
					state.market_caps = action.payload.market_caps;
				}
			)
			.addCase(fetchChartsData.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});
export default ChartsSlice.reducer;
