import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { CoinMarketChartResponseJson } from "../../interfaces/Coins";

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

interface ChartArgs {
	coin: string;
	duration: string;
}

export const fetchChartsData = createAsyncThunk<
	CoinMarketChartResponseJson,
	ChartArgs,
	{}
>("charts/fetchCharts", async (data, { getState }) => {
	const { coin, duration } = data;
	const {
		currency: { currency },
	} = getState() as RootState;

	const response = await axios.get<CoinMarketChartResponseJson>(
		`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${duration}&interval=daily`
	);
	return response.data;
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
			.addCase(fetchChartsData.fulfilled, (state, action) => {
				state.loading = false;
				state.error = false;
				state.data = action.payload;
			})
			.addCase(fetchChartsData.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});
export default ChartsSlice.reducer;
