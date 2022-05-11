import { NavLink } from "react-router-dom";
import {
	CurrencyDollarIcon,
	SearchIcon,
	MenuIcon,
	XIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Logo from "../logo.png";

const Navbar = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<header className="bg-zinc-200 dark:bg-gray-900">
			<nav className="container  mx-auto">
				<div className="flex justify-between  items-center h-16">
					<div className="px-4 flex space-x-40 items-center">
						<div className="flex-shrink-0">
							<img src={Logo} className="h-12 w-12" alt="Coinbase" />
						</div>
						<div className="hidden md:flex md:space-x-4 md:items-center">
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
						<div className="relative md:hidden">
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
					<div className="hidden md:flex md:justify-between md:items-center">
						{/* right side */}
						<div className="flex items-center space-x-6">
							<div className="relative">
								<div className="absolute left-0 top-1  pl-2">
									<SearchIcon className="h-6 w-6 text-gray-400" />
								</div>
								<input className="search" type="text" placeholder="Search..." />
							</div>
							<div className="relative sm:pr-12">
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

					{/* Mobile menu */}
					<div className="px-4 flex md:hidden">
						<button onClick={() => setIsOpen(!isOpen)}>
							<span className="sr-only">Open main menu</span>
							{/* toggle menu */}
							{!isOpen ? (
								<MenuIcon className="h-6 w-6 text-white" />
							) : (
								<XIcon className="h-6 w-6 text-white" />
							)}
						</button>
					</div>
				</div>
				<Transition
					show={isOpen}
					enter="transition ease-out duration-100 transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="transition ease-in duration-75 transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95">
					{(ref) => (
						<div className="md:hidden">
							<div
								ref={ref}
								className="flex flex-col px-2 pt-2 pb-3 space-y-4 sm:px-3">
								<NavLink
									to="/"
									className={({ isActive }) =>
										isActive ? "text-green-500" : "text-white"
									}>
									Coins
								</NavLink>
								<NavLink
									to="/portfolio"
									className={({ isActive }) =>
										isActive ? "text-green-500" : "text-white"
									}>
									Portfolio
								</NavLink>
							</div>
							<div className="px-2">
								<input className="search mb-5" type="text" placeholder="Search..." />
							</div>
						</div>
					)}
				</Transition>
			</nav>
		</header>
	);
};
export default Navbar;
