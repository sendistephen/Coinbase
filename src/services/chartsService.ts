import { Chart } from "../store/Charts/ChartsSlice";
import axios from "axios";

const base = process.env.REACT_APP_COIN_API_URL;

export const fetchCharts = async (currency): Promise<Chart> => {
	// console.log(getState().currency);
	const response = await axios.get(
		`${base}/coins/bitcoin/market_chart?vs_currency=${currency}&days=30&interval=daily`
	);
	return response.data;
};
