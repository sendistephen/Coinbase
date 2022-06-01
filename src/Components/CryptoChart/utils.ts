export const lineChartOptions = {
	responsive: true,
	layout: {
		padding: {
			left: 10,
			right: 20,
			top: 10,
			bottom: 10,
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
export const barChartOptions = {
	responsive: true,
	layout: {
		padding: 20,
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

export const currencyFormat = (currency, fraction, value) =>
	new Intl.NumberFormat("us-EN", {
		style: "currency",
		maximumFractionDigits: fraction,
		currency: currency.toUpperCase(),
	}).format(value);
