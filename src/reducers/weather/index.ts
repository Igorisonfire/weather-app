import IWeather from "./model";
import {GET_WEATHER} from "../../actions/types";

const initState: IWeather.ModelState = {
    weather: null
};

const weatherReducer = (state = initState, action: any) => {
    switch (action.type) {
        case GET_WEATHER: {

            return {
                ...state,
                weather: action.payload
            };
        }
        default:
            return state;
    }
};

export default weatherReducer;
