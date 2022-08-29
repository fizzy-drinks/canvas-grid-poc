import { combineReducers, configureStore, createReducer } from "@reduxjs/toolkit";
import GridReducer from "./reducers/grid/reducer";
import RootState from "./rootState";

const store = configureStore<RootState>({
  reducer: combineReducers({
    grid: GridReducer
  })
})

export type AppDispatch = typeof store.dispatch

export default store;
