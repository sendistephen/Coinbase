import axios from "axios";
import { CoinDataResponse, CoinsDataResponseJson } from "../interfaces/Coins";

const base = process.env.REACT_APP_COIN_API_URL;

export const fetchCoins = async (
	currency: string,
	perPage: number,
	page: number
): Promise<CoinDataResponse[]> => {
	const response = await axios.get<CoinDataResponse[]>(
		`${base}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
	);
	return response.data;
};
