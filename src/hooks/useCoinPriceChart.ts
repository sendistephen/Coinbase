import { useState, useEffect, useCallback } from 'react';
import { fetchChartsData } from '../store/Charts/ChartsSlice';
import { useAppDispatch } from '.';
import queryString from 'query-string';
import { useNavigate } from 'react-router';

/**
 *
 * @param props
 * @returns
 * @descripption  This hook allows for the management of state for the date range of the coin price chart.
 * It also fetches the charts data from the store and updates the URL with the selected date range.
 */
export function useCoinPriceChart(props) {
	// Parse the date range value from the URL query string.
	const { dateRange } = queryString.parse(window.location.search);
	// Initialize the date range state with the value from the URL query string.
	const [dateRangeValue, setDateRangeValue] = useState(dateRange);

	// Get a hook for navigating to different routes.
	const navigate = useNavigate();
	// Get a hook for dispatching Redux actions.
	const dispatch = useAppDispatch();

	/**
	 * This function sets the default date range to 30 days
	 * if the date range value is not set.
	 */
	const defaultDateRange = useCallback(() => {
		if (dateRangeValue === null || undefined) {
			// Update the URL with the default date range.
			navigate({
				pathname: window.location.pathname,
				search: `?dateRange=30`,
			});
			// Update the date range state with the default value.
			setDateRangeValue('30');
		}
	}, [dateRangeValue, navigate]);

	// Fetch the charts data when the date range value changes.
	useEffect(() => {
		if (dateRange) {
			dispatch(
				fetchChartsData({
					// Use the coin ID from the props.
					coin: props?.data?.coin?.id,
					duration: dateRange as string,
				})
			);
		}
	}, [dispatch, dateRange, props?.data?.coin?.id]);

	return {
		dateRangeValue,
		setDateRangeValue,
		defaultDateRange,
	};
}
