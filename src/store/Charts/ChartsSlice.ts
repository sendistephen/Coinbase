import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ChartsState {
	prices: [];
	marketCaps: [];
	totalVolumes: [];
	loading: boolean;
}

// thunk
export const fetchCharts = createAsyncThunk("charts/fetchCharts", async () => {
	const response = await axios.get(
		"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
	);
	return response.data;
});
