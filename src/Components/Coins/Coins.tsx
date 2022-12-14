import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCoins, selectCurrency } from '../../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCoins } from '../../store/Coins/CoinsSlice';
import TableData from '../TableData/TableData';
import { CoinDataResponse } from '../../interfaces/Coins';
import Spinner from '../Spinner';

/**
 *
 * @param param0
 * @returns
 * @description Table component for the coins
 */
function Table({ coins, currency }) {
	return (
		<table className='table w-full'>
			<thead className='border-gray-100 border-b-1 dark:bg-zinc-800 dark:text-gray-500'>
				<tr>
					<th className='sticky p-3 text-sm font-semibold tracking-wide text-left sticky-col-header sticky-first-col'>
						#
					</th>
					<th className='sticky p-3 text-sm font-semibold tracking-wide text-left sticky-col-header sticky-second-col'>
						Coin
					</th>
					<th className='p-3 text-sm font-semibold tracking-wide text-right'>Price</th>
					<th className='p-3 text-sm font-semibold tracking-wide text-right'>Ihr</th>
					<th className='p-3 text-sm font-semibold tracking-wide text-right'>24hr</th>
					<th className='p-3 text-sm font-semibold tracking-wide text-right'>7d</th>
					<th className='p-3 text-sm font-semibold tracking-wide text-right'>24 Volume</th>
					<th className='p-3 text-sm font-semibold tracking-wide text-right'>Mkt Cap</th>
					<th className='p-3 text-sm font-semibold tracking-wide text-right'>Last 7 Days</th>
				</tr>
			</thead>

			<tbody className='divide-y divide-gray-600'>
				{coins?.map((coin: CoinDataResponse, index: number) => (
					<TableData key={index} index={index} currency={currency} coin={coin} />
				))}
			</tbody>
		</table>
	);
}

function Coins() {
	/**
	 * Initialize the page state variable and set its initial value to 1,
	 * and also defines a function setPage for updating its value.
	 * */
	const [page, setPage] = React.useState(1);

	/**
	 * Gets the coins and currency data from the Redux store using the `useAppSelector` hook,
	 * which is a custom hook for selecting data from the store.
	 *  */
	const dispatch = useAppDispatch();
	const { coins } = useAppSelector(selectCoins);
	const { currency } = useAppSelector(selectCurrency);

	/**
	 * Dispatch the fetchCoins action to the Redux store when the component
	 * is mounted or when the currency or page state variables are updated.
	 * The fetchCoins action is called with the currency, perPage, and page parameters.
	 */
	useEffect(() => {
		dispatch(fetchCoins({ currency, perPage: 10, page: page }));
	}, [dispatch, currency, page]);

	/**
	 * Called when the user wants to fetch more data.
	 * It updates the page state variable by incrementing its value by 1.
	 * Used here on infinite scroll for coins table
	 */
	const fetchMore = () => {
		setPage(page + 1);
	};

	return (
		<div className='overflow-auto rounded-lg shadow-lg'>
			<h3 className='mt-4 mb-8 text-lg font-bold dark:text-gray-50'>
				Cryptocurrency Prices by Market Cap
			</h3>
			<InfiniteScroll
				dataLength={coins.length}
				next={fetchMore}
				hasMore={true}
				loader={
					<h4 className='py-5 text-center text-blue-400'>
						<Spinner />
					</h4>
				}
				endMessage={
					<p className='text-center text-blue-400'>You have reached the end of the list</p>
				}>
				<Table coins={coins} currency={currency}></Table>
			</InfiniteScroll>
		</div>
	);
}
export default Coins;
