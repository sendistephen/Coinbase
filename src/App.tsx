import React, { lazy } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
const Navbar = lazy(() => import("./Components/Navbar"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
