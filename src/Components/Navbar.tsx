import { NavLink } from "react-router-dom";
import {
	CurrencyDollarIcon,
	SearchIcon,
	MenuIcon,
	XIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import Logo from "../logo.png";
import { handleCurrencurrcyChange } from "../store/Currency/CurrencySlice";
import { selectCurrency } from "../store";

const Navbar = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const onHandleChange = (event) => {
		dispatch(handleCurrencurrcyChange(event.target.value.toLowerCase()));
	};

	return (
		<header className="bg-zinc-200 dark:bg-black">
			<nav className="container mx-auto">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center px-4 space-x-40">
						<div className="flex-shrink-0">
							<img src={Logo} className="w-12 h-12" alt="Coinbase" />
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
								<CurrencyDollarIcon className="w-6 h-6" />
							</div>
							<select
								onChange={onHandleChange}
								className="select"
								name="currency"
								id="currency">
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
								<div className="absolute left-0 pl-2 top-1">
									<SearchIcon className="w-6 h-6 text-gray-400" />
								</div>
								<input className="search" type="text" placeholder="Search..." />
							</div>
							<div className="relative py-0.5 sm:pr-12">
								<div className="absolute left-0 top-1">
									<CurrencyDollarIcon className="w-6 h-6" />
								</div>
								<select
									onChange={onHandleChange}
									className="text-sm select"
									name="currency"
									id="currency">
									<option value="USD">USD</option>
									<option value="EUR">EUR</option>
									<option value="BTC">BTC</option>
								</select>
							</div>
						</div>
					</div>

					{/* Mobile menu */}
					<div className="flex px-4 md:hidden">
						<button onClick={() => setIsOpen(!isOpen)}>
							<span className="sr-only">Open main menu</span>
							{/* toggle menu */}
							{!isOpen ? (
								<MenuIcon className="w-6 h-6 text-white" />
							) : (
								<XIcon className="w-6 h-6 text-white" />
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
								<input
									className="mb-5 search"
									type="text"
									placeholder="Search..."
								/>
							</div>
						</div>
					)}
				</Transition>
			</nav>
		</header>
	);
};
export default Navbar;
