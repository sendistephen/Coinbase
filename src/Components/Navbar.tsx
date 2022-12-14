import { NavLink } from 'react-router-dom';
import { CurrencyDollarIcon, SearchIcon, MenuIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';

import { Transition } from '@headlessui/react';
import Logo from '../logo.png';
import { handleCurrencurrcyChange } from '../store/Currency/CurrencySlice';

const Navbar = (): JSX.Element => {
	// Initialize a state variable isOpen with a value of false.
	const [isOpen, setIsOpen] = useState(false);

	// Define `useAppDispatch` hook to create a dispatch function for dispatching Redux actions.
	const dispatch = useAppDispatch();

	/**
	 * The onHandleChange function is passed to an event handler and is
	 * used to dispatch a Redux action when the event is triggered.
	 * The function gets the value of the event target and converts
	 * it to lowercase before dispatching the action.
	 */
	const onHandleChange = (event: { target: { value: string } }) => {
		dispatch(handleCurrencurrcyChange(event.target.value.toLowerCase()));
	};

	return (
		<header className='bg-zinc-200 dark:bg-black'>
			<nav className='container mx-auto'>
				<div className='flex items-center justify-between h-16'>
					<div className='grid items-center grid-cols-3 gap-4 lg:flex lg:space-x-40'>
						<div className='flex-shrink-0'>
							<img src={Logo} className='w-12 ' alt='Coinbase' />
						</div>
						<div className='hidden md:flex md:space-x-4 md:items-center'>
							<NavLink
								to='/'
								className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
								Coins
							</NavLink>
						</div>
						<div className='relative md:hidden'>
							<div className='absolute px-2 inset-y-1'>
								<CurrencyDollarIcon className='w-6 h-6 text-gray-500' />
							</div>
							<select
								onChange={onHandleChange}
								className='pl-10 text-xs rounded-lg'
								name='currency'
								id='currency'>
								<option value='USD'>USD</option>
								<option value='EUR'>EUR</option>
								<option value='BTC'>BTC</option>
							</select>
						</div>
					</div>
					<div className='hidden md:flex md:justify-between md:items-center'>
						{/* right side */}
						<div className='flex items-center space-x-6'>
							{/* TODO: Implement search feature */}
							<div className='relative'>
								<div className='absolute pl-2 inset-y-1.5'>
									<SearchIcon className='w-5 h-5 text-gray-500' />
								</div>
								<input className='search' type='text' placeholder='Search...' />
							</div>
							<div className='relative py-0.5 sm:pr-12'>
								<div className='absolute left-0 top-1'>
									<CurrencyDollarIcon className='w-6 h-6' />
								</div>
								<select
									onChange={onHandleChange}
									className='text-sm select'
									name='currency'
									id='currency'>
									<option value='USD'>USD</option>
									<option value='EUR'>EUR</option>
									<option value='BTC'>BTC</option>
								</select>
							</div>
						</div>
					</div>

					{/* Mobile menu */}
					<div className='px-4 mflex md:hidden'>
						<button onClick={() => setIsOpen(!isOpen)}>
							<span className='sr-only'>Open main menu</span>
							{/* toggle menu */}
							{!isOpen ? (
								<MenuIcon className='w-6 h-6 text-white' />
							) : (
								<XIcon className='w-6 h-6 text-white' />
							)}
						</button>
					</div>
				</div>
				<Transition
					show={isOpen}
					enter='transition ease-out duration-100 transform'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='transition ease-in duration-75 transform'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'>
					{(ref) => (
						<div className='md:hidden'>
							<div ref={ref} className='flex flex-col px-2 pt-2 pb-3 space-y-4 sm:px-3'>
								<NavLink
									to='/'
									className={({ isActive }) => (isActive ? 'text-green-500' : 'text-white')}>
									Coins
								</NavLink>
							</div>
							<div className='px-2'>
								<input className='mb-5 search' type='text' placeholder='Search...' />
							</div>
						</div>
					)}
				</Transition>
			</nav>
		</header>
	);
};
export default Navbar;
