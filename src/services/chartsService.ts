// import { Chart } from "../store/Charts/ChartsSlice";
import axios from "axios";
import { CoinMarketChartResponseJson } from "../interfaces/Coins";

const base = process.env.REACT_APP_COIN_API_URL;

export const fetchCharts = async (
	currency: string
): Promise<CoinMarketChartResponseJson> => {
	const response = await axios.get<CoinMarketChartResponseJson>(
		`${base}/coins/bitcoin/market_chart?vs_currency=${currency}&days=30&interval=daily`
	);
	return response.data;
};
