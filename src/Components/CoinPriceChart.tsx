import React, { FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	Filler,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { dateRangeObject, lineChartOptions } from '../Constants';
import { useNavigate } from 'react-router';
import { useCoinPriceChart } from '../hooks/useCoinPriceChart';

ChartJS.register(
	CategoryScale,
	Filler,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

type CoinPriceChartProps = {
	data: any;
	dataLabels: string[];
	dailyPrices: number[];
	currency: string;
};

export const CoinPriceChart: FunctionComponent<CoinPriceChartProps> = (props) => {
	const navigate = useNavigate();

	const { dateRangeValue, setDateRangeValue } = useCoinPriceChart(props);

	// handle change date range
	const handleChangeDateRange = (e: React.MouseEvent<HTMLInputElement>): void => {
		const value = dateRangeObject[e.currentTarget.value];
		setDateRangeValue(value);
		navigate({
			pathname: window.location.pathname,
			search: `?dateRange=${value}`,
		});
	};

	const lineChart = {
		labels: props.dataLabels,
		datasets: [
			{
				data: props.dailyPrices.slice(0, -2),
				fill: true,
				backgroundColor: '#22ff0033',
				borderColor: '#6dff63',
				tension: 0.1,
			},
		],
	};

	return (
		<div className='flex flex-col my-16 space-y-4'>
			<h3 className='text-2xl text-white'>
				{props.data?.coin?.name} Price Chart ({props.currency.toLocaleUpperCase()})
			</h3>
			<div className='flex items-center justify-center gap-8'>
				{Object.keys(dateRangeObject).map((key) => (
					<div key={key} className='flex flex-col items-center gap-2'>
						<input
							className='w-8 h-8 text-green-600 border-2 border-green-600 rounded-full form-radio focus:outline-none focus:border-green-600 checked:bg-green-600 checked:border-4 checked:border-green-800 checked:hover:bg-emerald-300 checked:text-green-600 focus:text-green-600'
							type='radio'
							id='key'
							name='dateRange'
							value={key}
							defaultChecked={dateRangeObject[key] === dateRangeValue ? true : false}
							onClick={handleChangeDateRange}
						/>
						<label className='text-lg font-light text-gray-400' htmlFor='key'>
							{key}
						</label>
					</div>
				))}
			</div>

			<div className='mt-24'>
				<Line
					data={lineChart}
					options={lineChartOptions}
					className='p-4 border border-gray-500 rounded-lg'
				/>
			</div>
		</div>
	);
};
