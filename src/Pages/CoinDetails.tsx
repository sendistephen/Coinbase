import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { CoinPriceChart } from '../Components/CoinPriceChart';
import { currencyFormat } from '../Components/CryptoChart/utils';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectCharts, selectCoin, selectCurrency } from '../store';
import { fetchCoinDetails } from '../store/CoinDetails/CoinDetailSlice';

function CoinDetails() {
	const { coinname } = useParams();
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectCoin);
	const { currency } = useAppSelector(selectCurrency);

	const {
		data: { prices },
	} = useAppSelector(selectCharts);

	const dataLabels = prices?.map((price) => {
		const date = new Date(price[0]).toLocaleString('en-gb', {
			day: 'numeric',
			month: '2-digit',
		});
		return date;
	});
	const dailyPrice = prices?.map((price) => parseInt(price[1].toFixed(2)));

	const coin = coinname.toLowerCase();

	useEffect(() => {
		dispatch(fetchCoinDetails({ coin }));
	}, [coin, dispatch]);

	return (
		<div className='container p-4 mx-auto'>
			{/* Coin stats */}
			<span className='p-1 text-xs bg-gray-500 rounded-lg text-gray-50'>
				Rank #{data?.coin?.market_cap_rank}
			</span>
			<div className='flex items-center mt-2 mb-6 space-x-2'>
				<img className='w-8 h-8' src={data?.coin?.image?.small} alt={data?.coin?.name} />
				<span className='text-2xl font-bold text-white'>
					{data?.coin?.name}
					<span className='ml-2 uppercase'>({data?.coin?.symbol})</span>
				</span>
			</div>
			{/* Coin info */}
			<div className='grid grid-cols-1 gap-4'>
				<div className='grid items-center grid-cols-1 gap-4 p-4 border border-gray-500 rounded-lg md:grid-cols-2'>
					<div className='grid items-center grid-rows-3 divide-y divide-gray-500'>
						<div className='flex items-center justify-between gap-4'>
							<span className='flex-1 text-sm font-light text-gray-500'>Market Cap:</span>
							<span className='text-sm font-light text-left text-gray-400'>
								{currencyFormat(currency, 2, data?.coin?.market_data?.market_cap[currency])}
							</span>
						</div>
						<div className='flex items-center justify-between gap-4'>
							<span className='flex-1 mt-4 text-sm font-light text-gray-500'>
								24 Hour Trading Vol:
							</span>
							<span className='text-sm font-light text-left text-gray-400'>
								{currencyFormat(currency, 2, data?.coin?.market_data?.market_cap_change_24h)}
							</span>
						</div>
						<div className='flex items-center justify-between gap-4'>
							<span className='flex-1 mt-4 text-sm font-light text-gray-500'>
								Fully Diluted Valuation:
							</span>
							<span className='text-sm font-light text-left text-gray-400'>
								{currencyFormat(
									currency,
									2,
									data?.coin?.market_data?.fully_diluted_valuation[currency]
								)}
							</span>
						</div>
					</div>
					<div className='grid items-center grid-rows-3 divide-y divide-gray-500'>
						<div className='flex items-center justify-between gap-4'>
							<span className='flex-1 text-sm font-light text-gray-500'>Max Supply:</span>
							<span className='text-sm font-light text-left text-gray-400'>
								{data?.coin?.market_data?.max_supply}
							</span>
						</div>
						<div className='flex items-center justify-between gap-4'>
							<span className='flex-1 mt-4 text-sm font-light text-gray-500'>Total Supply:</span>
							<span className='text-sm font-light text-left text-gray-400'>
								{data?.coin?.market_data?.total_supply}{' '}
							</span>
						</div>
						<div className='flex items-center justify-between gap-4'>
							<span className='flex-1 mt-4 text-sm font-light text-gray-500'>
								Circulating Supply:
							</span>
							<span className='text-sm font-light text-left text-gray-400'>
								{data?.coin?.market_data?.circulating_supply}
							</span>
						</div>
					</div>
				</div>
				<div className='flex flex-col p-4 space-y-4 border border-gray-500 rounded-lg'>
					<h3 className='text-2xl text-white'>Info</h3>
					<div className='flex items-center space-x-12'>
						<span className='flex-1 text-sm font-light text-gray-500'>Website:</span>
						<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>
							{data?.coin?.links?.homepage[0].slice(11)}
						</span>
					</div>
					<div className='flex items-center space-x-12'>
						<span className='flex-1 text-sm font-light text-gray-500'>Explorer:</span>
						<div className='flex space-x-1'>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>
								{data?.coin?.links?.blockchain_site[0].slice(8, 18)}
							</span>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>
								{data?.coin?.links?.blockchain_site[1].slice(8, 11)}
							</span>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>
								{data?.coin?.links?.blockchain_site[2].slice(12, 21)}
							</span>
						</div>
					</div>
					<div className='flex items-center space-x-12'>
						<span className='flex-1 text-sm font-light text-gray-500'>Community:</span>
						<div className='flex space-x-1'>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>
								Facebook
							</span>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>
								Twitter
							</span>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>Reddit</span>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>Reddit</span>
						</div>
					</div>
					<div className='flex items-center space-x-12'>
						<span className='flex-1 text-sm font-light text-gray-500'>Tags</span>
						<div className='flex space-x-1'>
							<span className='px-2 py-1 text-sm text-gray-200 rounded-lg bg-zinc-700'>
								{data?.coin?.categories[0]}
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* Description */}
			<div className='flex flex-col my-16 space-y-4'>
				<h3 className='text-2xl text-white'>What is {data?.coin?.name}?</h3>
				<p
					className='font-light text-gray-500'
					dangerouslySetInnerHTML={{ __html: data?.coin?.description.en }}
				/>
			</div>
			{/* Price chart */}
			<CoinPriceChart
				data={data}
				dataLabels={dataLabels}
				dailyPrices={dailyPrice}
				currency={currency}
			/>
		</div>
	);
}

export default CoinDetails;
