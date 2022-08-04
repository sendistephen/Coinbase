import { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
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
import { fetchChartsData } from "../../store/Charts/ChartsSlice";
import { selectCharts, selectCurrency } from "../../store";
import { currencyFormat, barChartOptions, lineChartOptions } from "./utils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

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

const CryptoChart = () => {
	const dispatch = useAppDispatch();
	const { currency } = useAppSelector(selectCurrency);
	const {
		data: { prices, total_volumes },
	} = useAppSelector(selectCharts);
	const dailyPrice: any = prices?.map((price) => price[1].toFixed(2));
	const dailyVolumes = total_volumes?.map((volume) => volume[1].toFixed(0));
	const dateLabels = prices?.map((price) => {
		const date = new Date(price[0]).toLocaleString("en-gb", {
			day: "numeric",
			month: "2-digit",
		});
		return date;
	});
	//------------------------------------
	const todayPrice = dailyPrice.slice(-1);

	const todayVolumes = dailyVolumes.slice(-1);
	const [month, day, year] = new Date().toString().split(" ");

	//------------------------------------

	const lineChartData = {
		labels: dateLabels.slice(0, -2),
		datasets: [
			{
				label: "Price",
				fill: true,
				data: dailyPrice.slice(0, -2),
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				tension: 0.1,
			},
		],
	};
	const BarChartData = {
		labels: dateLabels.slice(0, -2),
		datasets: [
			{
				label: "Price",
				data: dailyPrice.slice(0, -2),
				fill: true,
				backgroundColor: "rgb(97, 184, 91)",
				borderColor: "#0f6c0e",
				tension: 0.1,
			},
		],
	};

	useEffect(() => {
		dispatch(
			fetchChartsData({
				coin: "bitcoin",
				duration: "30",
			})
		);
	}, [currency, dispatch]);

	return (
		<div className="container">
			<div className="items-center xl:space-x-12 xl:flex xl:justify-between">
				<div className="p-4 mb-12 rounded-lg md:flex-1 dark:bg-black dark:text-gray-50">
					<div className="flex flex-col space-y-2">
						<h1>Price</h1>
						<h2 className="text-2xl font-extrabold md:text-4xl">
							{currencyFormat(currency, 2, todayPrice)}
						</h2>
						<p className="font-light">
							{month} {day}, {year}
						</p>
					</div>
					<Line data={lineChartData} options={lineChartOptions} />
				</div>
				<div className="p-4 mb-12 rounded-lg md:flex-1 dark:bg-black dark:text-gray-50">
					<div className="flex flex-col space-y-2">
						<h1>Volumes 24h</h1>
						<h2 className="text-2xl font-extrabold md:text-4xl">
							{currencyFormat(currency, 0, todayVolumes)}
						</h2>
						<p className="font-light">
							{month} {day}, {year}
						</p>
					</div>
					<Bar data={BarChartData} options={barChartOptions} />
				</div>
			</div>
		</div>
	);
};

export default CryptoChart;
