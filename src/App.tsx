import React, { lazy } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketBar from "./Components/Global/Global";
const Navbar = lazy(() => import("./Components/Navbar"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="bg-zinc-200 dark:bg-zinc-900">
				<MarketBar />
				<Routes>
					<Route path="/" element={<Dashboard />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
