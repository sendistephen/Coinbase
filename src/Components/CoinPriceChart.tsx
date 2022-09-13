import React, {
	FunctionComponent,
	useCallback,
	useEffect,
	useState,
} from "react";
import queryString from "query-string";
import { Line } from "react-chartjs-2";
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
} from "chart.js";
import { useNavigate } from "react-router";
import { fetchChartsData } from "../store/Charts/ChartsSlice";
import { useAppDispatch } from "../hooks/hooks";

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

export const CoinPriceChart: FunctionComponent<CoinPriceChartProps> = (
	props
) => {
	const { dateRange } = queryString.parse(window.location.search);
	const [dateRangeValue, setDateRangeValue] = useState(dateRange);

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	// set default date range

	const defaultDateRange = useCallback(() => {
		if (dateRangeValue === null || undefined) {
			navigate({
				pathname: window.location.pathname,
				search: `?dateRange=30`,
			});
			setDateRangeValue("30");
		}
	}, [dateRangeValue, navigate]);

	const dateRangeObject = {
		"7d": "7",
		"14d": "14",
		"30d": "30",
		"90d": "90",
		"1y": "365",
		Max: "max",
	};
	useEffect(() => {
		if (dateRange) {
			dispatch(
				fetchChartsData({
					coin: props?.data?.coin?.id,
					duration: dateRange as string,
				})
			);
		}
	}, [dispatch, dateRange, props?.data?.coin?.id]);

	useEffect(() => {
		defaultDateRange();
	}, [defaultDateRange]);

	// handle change date range
	const handleChangeDateRange = (e) => {
		const value = dateRangeObject[e.target.value];
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
				backgroundColor: "#22ff0033",
				borderColor: "#6dff63",
				tension: 0.1,
			},
		],
	};

	const lineChartOptions = {
		responsive: true,
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
		elements: {
			point: {
				radius: 4,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
	};

	return (
		<div className="flex flex-col my-16 space-y-4">
			<h3 className="text-2xl text-white">
				{props.data?.coin?.name} Price Chart (
				{props.currency.toLocaleUpperCase()})
			</h3>
			{/* date range options */}
			<div className="flex items-center justify-center space-x-4">
				{Object.keys(dateRangeObject).map((key) => (
					<div key={key} className="space-x-4">
						<input
							className="w-8 h-8 text-green-600 border-2 border-green-600 rounded-full form-radio focus:outline-none focus:border-green-600 checked:bg-green-600 checked:border-4 checked:border-green-800 checked:hover:bg-emerald-300 checked:text-green-600 focus:text-green-600"
							type="radio"
							id="key"
							name="dateRange"
							value={key}
							defaultChecked={
								dateRangeObject[key] === dateRangeValue ? true : false
							}
							onClick={handleChangeDateRange}
						/>
						<label className="text-lg text-gray-100" htmlFor="key">
							{key}
						</label>
					</div>
				))}
			</div>

			<div className="mt-24">
				<Line data={lineChart} options={lineChartOptions} />
			</div>
		</div>
	);
};
