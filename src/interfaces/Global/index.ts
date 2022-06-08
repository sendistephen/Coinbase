export interface GlobalData {
	active_cryptocurrencies: number;
	ended_icos: number;
	market_cap_change_percentage_24h_usd: number;
	market_cap_percentage: {
		[key: string]: number;
	};
	markets: number;
	ongoing_icos: number;
	total_market_cap: {
		[key: string]: number;
	};
	total_volume: {
		[key: string]: number;
	};
	upcoming_icos: number;
	updated_at: number;
}
export interface GlobalDataResponseJson {
	data: GlobalData;
}
