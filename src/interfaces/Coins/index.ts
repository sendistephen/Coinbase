export interface CoinMarketChartResponseJson {
	prices: Array<Array<number>>;
	market_caps: Array<Array<number>>;
	total_volumes: Array<Array<number>>;
}
export interface CoinMarketChartResponse {
	data: CoinMarketChartResponseJson;
}

export interface CoinDataResponse {
	ath: number;
	atl: number;
	ath_change_percentage: number;
	ath_date: Date;
	atl_change_percentage: number;
	atl_date: Date;
	circulating_supply: number;
	cmc_rank: number;
	date_added: Date;
	date_updated: Date;
	id: string;
	current_price: number;
	fully_diluted_valuation: number;
	high_24h: number;
	image: string;
	low_24h: number;
	name: string;
	price_change_24h: number;
	price_change_percentage_24h: number;
	price_change_percentage_1h_in_currency: number;
	price_change_percentage_7d_in_currency: number;
	price_change_percentage_24h_in_currency: number;
	market_cap: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	market_cap_rank: number;
	roi: {
		times: number;
		percentage: number;
		currency: string;
	} | null;
	sparkline_in_7d: {
		prices: Array<number>;
	};
	symbol: string;
	total_supply: number | null;
	total_volume: number;
}

export interface CoinsDataResponseJson {
	data: Array<CoinDataResponse>;
}
