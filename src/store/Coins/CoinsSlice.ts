import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
	CoinDataResponse,
	CoinsDataResponseJson,
} from "../../interfaces/Coins";
import { fetchCoins } from "../../services/CoinsService";

interface InitialState {
	data: CoinDataResponse;
	loading: boolean;
	error: boolean;
	hasMore: boolean;
	page: number;
	perPage: number;
	currency: string;
}
const initialState: InitialState = {
	data: {} as CoinDataResponse,
	loading: false,
	error: false,
	hasMore: true,
	page: 1,
	perPage: 10,
	currency: "usd",
};

// Define action creators
export const fetchCoinsData = createAsyncThunk<CoinDataResponse[], void>(
	"coins/fetchCoinsData",
	async (_, thunkAPI) => {
		const {
			coins: { perPage, page, currency },
		} = thunkAPI.getState() as RootState;
		try {
			return await fetchCoins(currency, perPage, page);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const CoinsSlice = createSlice({
	name: "coins",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCoinsData.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.hasMore = true;
			})
			.addCase(
				fetchCoinsData.fulfilled,
				(state, action: PayloadAction<CoinDataResponse[]>) => {
					state.data[0] = action.payload;
					state.loading = false;
					state.error = false;
					state.hasMore = true;
				}
			)
			.addCase(fetchCoinsData.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});

export default CoinsSlice.reducer;
