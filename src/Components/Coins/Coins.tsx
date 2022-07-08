import millify from "millify";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCoins } from "../../store";
import { fetchCoinsData } from "../../store/Coins/CoinsSlice";
import { currencyFormat } from "../CryptoChart/utils";

function Coins() {
	const dispatch = useAppDispatch();
	const { currency, data, error, hasMore, loading, page, perPage } =
		useAppSelector(selectCoins);

	useEffect(() => {
		dispatch(fetchCoinsData());
	}, [dispatch]);

	function isPostive(value: number) {
		return value > 0;
	}

	return (
		<div className="overflow-auto rounded-lg shadow-lg">
			<h1 className="mt-4 mb-8 text-lg font-bold dark:text-gray-50">
				Cryptocurrency Prices by Market Cap
			</h1>

			<table className="w-full ">
				<thead className="border-gray-100 border-b-1 dark:bg-zinc-800 dark:text-gray-500">
					<tr>
						<th className="p-3 text-sm font-semibold tracking-wide text-left">
							#
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left">
							Coin
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-right">
							Price
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-right">
							Ihr
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-right">
							24hr
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-right">
							7d
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-right">
							24 Volume
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-right">
							Mkt Cap
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-right">
							Last 7 Days
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-600">
					{data[0]?.map((coin, index) => (
						<tr
							key={index}
							className="border-gray-100 border-b-1 dark:bg-zinc-900">
							<td className="w-16 px-3 py-3 text-sm text-gray-400 whitespace-nowrap">
								{index + 1}
							</td>
							<td className="px-3 py-3 text-sm font-semibold text-left text-white ">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<img className="w-6 h-6" src={coin.image} alt="coin logo" />
										<span className="px-3 py-3 text-sm font-bold text-left text-white">
											{coin.name}
										</span>
									</div>
									<span className="font-normal text-left text-gray-400 uppercase">
										{coin.symbol}
									</span>
								</div>
							</td>
							<td className="px-3 py-3 text-sm text-right text-gray-400 w-36">
								{currencyFormat(currency, 2, coin.current_price)}
							</td>
							<td
								className={`w-20 px-3 py-3 text-sm text-right ${
									isPostive(
										coin.price_change_percentage_1h_in_currency.toFixed(2)
									)
										? "text-green-400"
										: "text-red-400"
								}`}>
								{coin.price_change_percentage_1h_in_currency.toFixed(2)}%
							</td>
							<td
								className={`w-20 px-3 py-3 text-sm text-right ${
									isPostive(
										coin.price_change_percentage_24h_in_currency.toFixed(2)
									)
										? "text-green-400"
										: "text-red-400"
								}`}>
								{coin.price_change_percentage_24h_in_currency.toFixed(2)}%
							</td>
							<td
								className={`w-20 px-3 py-3 text-sm text-right ${
									isPostive(
										coin.price_change_percentage_7d_in_currency.toFixed(2)
									)
										? "text-green-400"
										: "text-red-400"
								}`}>
								{coin.price_change_percentage_7d_in_currency.toFixed(2)}%
							</td>
							<td className="px-3 py-3 text-sm text-right text-gray-400 w-42">
								{millify(coin.total_volume)}
							</td>
							<td className="px-3 py-3 text-sm text-right text-gray-400 w-42">
								{millify(coin.market_cap)}
							</td>
							<td className="w-40 px-3 py-3 text-sm text-right text-gray-400">
								{coin.price_change_percentage_7d_in_currency}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default Coins;
