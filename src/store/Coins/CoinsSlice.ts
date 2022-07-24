import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoinDataResponse } from "./../../interfaces/Coins/index";
import axios from "axios";
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

const initialState: InitialState = {
	loading: false,
	error: null,
	coins: [],
};

export const fetchCoins = createAsyncThunk<CoinDataResponse[], CoinArgs>(
	"coins/fetch",
	async (args) => {
		const { currency, perPage, page } = args;

		const response = await axios.get<CoinDataResponse[]>(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
		);
		return response.data;
	}
);

const coinsSlice = createSlice({
	name: "coins",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCoins.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchCoins.fulfilled, (state, action) => {
			state.loading = false;
			state.coins = state.coins.concat(action.payload);
		});
		builder.addCase(fetchCoins.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default coinsSlice.reducer;
