import axios from 'axios';
import { GlobalDataResponseJson } from '../interfaces/Global';

// Define the base URL for the Coin API
const base = process.env.REACT_APP_COIN_API_URL;

// Define the fetchGlobal function that fetches global data from the Coin API
export const fetchGlobal = async (): Promise<GlobalDataResponseJson> => {
	// Make a GET request to the Coin API's global data endpoint
	const response = await axios.get<GlobalDataResponseJson>(`${base}/global`);
	// Return the data from the response
	return response.data;
};
