import CryptoChart from "../Components/CryptoChart/CryptoChart";

function Dashboard() {
	return (
		<div className="bg-zinc-200 dark:bg-zinc-900">
			<div className="container p-4 mx-auto">
				<h1 className="my-2 font-bold dark:text-gray-50">BITCOIN OVERVIEW</h1>
				<CryptoChart />
			</div>
		</div>
	);
}

export default Dashboard;
