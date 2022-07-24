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
			radius: 0,
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
		tooltip: false,
		decimation: false,
	},
	scales: {
		y: {
			display: false,
		},
		x: {
			title: {
				display: false,
			},
			display: false,
			grid: {
				display: false,
			},
		},
	},
};
export const SparklineChart = (props) => {
	const lineChartData = {
		labels: props?.data?.price?.slice(0, 7),
		datasets: [
			{
				// label: "Price",
				fill: true,
				data: props?.data?.price?.slice(0, 7),
				backgroundColor: "transparent",
				borderColor: "#a7ff63",
				tension: 0.5,
			},
		],
	};
	return (
		<Line className="w-14" data={lineChartData} options={lineChartOptions} />
	);
};
