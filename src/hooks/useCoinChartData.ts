import { useEffect } from 'react';
import { selectCharts } from '../store';
import { fetchCoinDetails } from '../store/CoinDetails/CoinDetailSlice';
import { useAppDispatch, useAppSelector } from '.';

/**
 *
 * @param coinname
 * @returns
 * @description custom hook to fetch and format data for a given coin's chart
 */
function useCoinChartData(coinname: string) {
	// Import the useAppDispatch hook to dispatch an action
	const dispatch = useAppDispatch();
	// Convert the given coin name to lowercase
	const coin = coinname.toLowerCase();
	// Use the useAppSelector hook to get the chart data for the given coin
	const {
		data: { prices },
	} = useAppSelector(selectCharts);

	// Map the daily prices to a new array of formatted prices
	const dailyPrice = prices?.map((price) => parseInt(price[1].toFixed(2)));

	// Map the daily prices to a new array of formatted dates
	const dataLabels = prices?.map((price) => {
		// Create a date object from the timestamp
		const date = new Date(price[0]).toLocaleString('en-gb', {
			day: 'numeric',
			month: '2-digit',
		});
		// Return the formatted date
		return date;
	});
	// Use the `useEffect` hook to dispatch an action to fetch the details for the given coin
	useEffect(() => {
		dispatch(fetchCoinDetails({ coin }));
	}, [coin, dispatch]);

	// Return the arrays of formatted dates and prices
	return [dataLabels, dailyPrice];
}
export default useCoinChartData;
