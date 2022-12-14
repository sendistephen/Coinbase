export const lineChartOptions = {
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

export const dateRangeObject = {
	'7d': '7',
	'14d': '14',
	'30d': '30',
	'90d': '90',
	'1y': '365',
	Max: 'max',
};
