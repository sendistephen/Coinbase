import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectCoins, selectCurrency } from "../../store";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCoins } from "../../store/Coins/CoinsSlice";
import TableData from "../TableData/TableData";

function Coins() {
	const [page, setPage] = React.useState(1);
	const { coins } = useAppSelector(selectCoins);

	const dispatch = useAppDispatch();
	const { currency } = useAppSelector(selectCurrency);

	useEffect(() => {
		dispatch(fetchCoins({ currency, perPage: 10, page: page }));
	}, [dispatch, currency, page]);

	const fetchMore = () => {
		setPage(page + 1);
	};

	return (
		<div className="overflow-auto rounded-lg shadow-lg">
			<h3 className="mt-4 mb-8 text-lg font-bold dark:text-gray-50">
				Cryptocurrency Prices by Market Cap
			</h3>
			<InfiniteScroll
				dataLength={coins.length}
				next={fetchMore}
				hasMore={true}
				loader={<h4 className="py-5 text-center text-blue-400">Loading...</h4>}
				endMessage={
					<p className="text-center text-blue-400">
						You have reached the end of the list
					</p>
				}>
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
						{coins?.map((coin, index) => (
							<TableData
								key={index}
								index={index}
								currency={currency}
								coin={coin}
							/>
						))}
					</tbody>
				</table>
			</InfiniteScroll>
		</div>
	);
}
export default Coins;
