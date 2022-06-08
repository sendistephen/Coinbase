export interface CoinMarketChartResponseJson {
	prices: Array<Array<number>>;
	market_caps: Array<Array<number>>;
	total_volumes: Array<Array<number>>;
}
export interface CoinMarketChartResponse {
	data: CoinMarketChartResponseJson;
}
