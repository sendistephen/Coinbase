import { NavLink } from "react-router-dom";
import { CurrencyDollarIcon, SearchIcon } from "@heroicons/react/solid";

const Navbar = (): JSX.Element => {
	return (
		<header className="bg-zinc-200 dark:bg-gray-900">
			<nav className="container relative mx-auto p-4">
				<div className="flex justify-between items-center">
					{/* left side */}
					<div className="flex space-x-4 items-center">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? "active-link" : "inactive-link"
							}>
							Coins
						</NavLink>
						<NavLink
							to="/portfolio"
							className={({ isActive }) =>
								isActive ? "active-link" : "inactive-link"
							}>
							Portfolio
						</NavLink>
					</div>
					{/* right side */}
					<div className="flex items-center space-x-6">
						<div className="relative">
							<div className="absolute left-0 top-1  pl-2">
								<SearchIcon className="h-6 w-6 text-gray-400" />
							</div>
							<input className="search" type="text" placeholder="Search..." />
						</div>
						<div className="relative ">
							<div className="absolute left-0 top-1">
								<CurrencyDollarIcon className="h-6 w-6" />
							</div>
							<select className="select" name="currency" id="currency">
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
								<option value="BTC">BTC</option>
							</select>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
export default Navbar;
