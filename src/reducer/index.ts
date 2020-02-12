import {IRootAppReducerState} from "./model";
import peopleReducer from "../reducers/people";
import weatherReducer from "../reducers/weather";
import uiReducer from '../reducers/ui'

const rootAppReducer = (state: IRootAppReducerState = {} as IRootAppReducerState, action: any) => {
    return {
        people: peopleReducer(state.people, action),
        weatherState: weatherReducer(state.weatherState, action),
        uiState: uiReducer(state.uiState, action),
    }
};

export default rootAppReducer;
