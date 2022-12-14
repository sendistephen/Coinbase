import millify from 'millify';
import { Link } from 'react-router-dom';
import { CoinDataResponse } from '../../interfaces/Coins';
import { currencyFormat } from '../CryptoChart/utils';
import { SparklineChart } from './TableChart';

interface TableDataProps {
	key: number;
	index: number;
	coin: CoinDataResponse;
	currency: string;
}

function TableData(props: TableDataProps) {
	function isNegative(value: number) {
		// Convert the value to a number
		const num = Number(value);
		// Return true if the number is negative, false otherwise
		return Math.sign(num) === -1 ? true : false;
	}
	return (
		<tr className='border-gray-100 border-b-1 dark:bg-zinc-900'>
			<td className='w-16 px-3 py-3 text-sm text-gray-400 whitespace-nowrap'>{props.index + 1}</td>
			<td className='px-3 py-3 text-sm font-semibold text-left text-white '>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<img className='w-6 h-6' src={props.coin?.image} alt='coin logo' />
						<Link
							to={`/coins/${props.coin?.id}?dateRange=30`}
							className='px-3 py-3 text-sm font-bold text-left text-white hover:text-green-500'>
							{props.coin?.name}
						</Link>
					</div>
					<span className='font-normal text-left text-gray-400 uppercase'>
						{props.coin?.symbol}
					</span>
				</div>
			</td>
			<td className='px-3 py-3 text-sm text-right text-gray-400 w-36'>
				{currencyFormat(props.currency, 2, props.coin?.current_price)}
			</td>
			<td
				className={`w-20 px-3 py-3 text-sm text-right ${
					isNegative(props.coin?.price_change_percentage_1h_in_currency)
						? 'text-red-400'
						: 'text-green-400'
				}`}>
				{props.coin?.price_change_percentage_1h_in_currency
					? props.coin?.price_change_percentage_1h_in_currency.toFixed(2)
					: 0}
				%
			</td>
			<td
				className={`w-20 px-3 py-3 text-sm text-right ${
					isNegative(props.coin?.price_change_percentage_24h_in_currency)
						? 'text-red-400'
						: 'text-green-400'
				}`}>
				{props.coin?.price_change_percentage_24h
					? props.coin?.price_change_percentage_24h.toFixed(2)
					: 0}
				%
			</td>
			<td
				className={`w-20 px-3 py-3 text-sm text-right ${
					isNegative(props.coin?.price_change_percentage_7d_in_currency)
						? 'text-red-400'
						: 'text-green-400'
				}`}>
				{props.coin?.price_change_percentage_7d_in_currency.toFixed(2)}%
			</td>
			<td className='px-3 py-3 text-sm text-right text-gray-400 w-42'>
				{millify(props.coin?.total_volume)}
			</td>
			<td className='px-3 py-3 text-sm text-right text-gray-400 w-42'>
				{millify(props.coin?.market_cap)}
			</td>
			<td className='w-40 px-3 py-3 text-sm text-right text-gray-400'>
				<SparklineChart labels={props.coin?.sparkline_in_7d} data={props.coin?.sparkline_in_7d} />
			</td>
		</tr>
	);
}
export default TableData;
