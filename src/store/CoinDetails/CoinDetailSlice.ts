import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CoinDataResponse, CoinResponse } from "../../interfaces/Coins";

interface InitialState {
	loading: boolean;
	error: string | null;
	coin: CoinResponse | null;
}
interface Coin {
	coin: string;
}

const initialState: InitialState = {
	loading: false,
	error: null,
	coin: null,
};

export const fetchCoinDetails = createAsyncThunk<CoinResponse, Coin>(
	"coin/fetch",
	async (Coin, thunkAPi) => {
		const { coin } = Coin;
		const response = await axios.get<CoinResponse>(
			`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
		);
		return response.data;
	}
);

export const coinDetailsSlice = createSlice({
	name: "coin",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCoinDetails.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
			state.loading = false;
			state.coin = action.payload;
		});
		builder.addCase(fetchCoinDetails.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default coinDetailsSlice.reducer;
