import {IRootAppReducerState} from "./model";
import peopleReducer from "../reducers/people";
import weatherReducer from "../reducers/weather";

const rootAppReducer = (state: IRootAppReducerState = {} as IRootAppReducerState, action: any) => {
    return {
        people: peopleReducer(state.people, action),
        weatherState: weatherReducer(state.weatherState, action),
    }
};

export default rootAppReducer;
