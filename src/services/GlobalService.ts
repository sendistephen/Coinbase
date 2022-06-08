import axios from "axios";
import { GlobalDataResponseJson } from "../interfaces/Global";

const base = process.env.REACT_APP_COIN_API_URL;

export const fetchGlobal = async (): Promise<GlobalDataResponseJson> => {
	const response = await axios.get<GlobalDataResponseJson>(`${base}/global`);
	return response.data;
};
