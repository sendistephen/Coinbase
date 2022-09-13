import React, { lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketBar from "./Components/Global/Global";
const CoinDetails = lazy(() => import("./Pages/CoinDetails"));
const Navbar = lazy(() => import("./Components/Navbar"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));

function App(): JSX.Element {
	return (
		<Suspense fallback={<div></div>}>
			<BrowserRouter>
				<Navbar />
				<div className="bg-zinc-200 dark:bg-zinc-900">
					<MarketBar />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/coins/:coinname" element={<CoinDetails />} />
					</Routes>
				</div>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;
