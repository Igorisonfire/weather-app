import {IRootAppReducerState} from "./model";
import weatherReducer from "../reducers/weather";
import uiReducer from '../reducers/ui'
import preloaderReducer from '../reducers/preloader'

const rootAppReducer = (state: IRootAppReducerState = {} as IRootAppReducerState, action: any) => {
    return {
        weatherState: weatherReducer(state.weatherState, action),
        uiState: uiReducer(state.uiState, action),
        preloaderState: preloaderReducer(state.preloaderState, action),
    }
};

export default rootAppReducer;
