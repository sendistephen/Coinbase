import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCurrency, selectGlobal } from "../../store";
import { fetchGlobalData } from "../../store/Global/GlobalSlice";
import millify from "millify";

function Global() {
	const dispatch = useAppDispatch();
	const { currency } = useAppSelector(selectCurrency);

	const {
		data: { data },
	} = useAppSelector(selectGlobal);
	const {
		active_cryptocurrencies,
		total_market_cap,
		total_volume,
		markets,
		market_cap_percentage,
	} = data;

	useEffect(() => {
		dispatch(fetchGlobalData());
	}, [currency, dispatch]);

	return (
		<div className="flex justify-between px-4 py-2 mx-auto mb-6 text-xs rounded-b-lg md:w-1/2 dark:bg-black dark:text-gray-50">
			<div className="flex flex-col">
				<p className="font-bold">Coins:</p>
				<span className="font-medium text-blue-400">
					{active_cryptocurrencies}
				</span>
			</div>
			<div>
				<p className="font-bold">Exchange:</p>
				<span className="font-medium text-blue-400">{markets}</span>
			</div>
			<div>
				<p className="font-bold">Market Cap:</p>
				<span className="font-medium text-blue-400">
					$
					{millify(total_market_cap[currency] ? total_market_cap[currency] : 0)}
				</span>
			</div>
			<div>
				<p className="font-bold">24h Vol:</p>
				<span className="font-medium text-blue-400">
					${millify(total_volume[currency] ? total_volume[currency] : 0)}
				</span>
			</div>
			<div>
				<p className="font-bold">Dominance:</p>
				<span className="font-medium text-blue-400">
					BTC {market_cap_percentage.btc.toFixed(2)}%
				</span>
			</div>
		</div>
	);
}

export default Global;
