import { configureStore, combineReducers } from "@reduxjs/toolkit";

// combine reducers
const reducers = combineReducers({});

const store = configureStore({
	reducer: reducers,
});

export default store;
