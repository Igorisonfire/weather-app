import {SET_WEATHER} from "../types";
import IWeather from "../../reducers/weather/model";

export const setWeather = (payload: IWeather.Model) => {
    return {
        type: SET_WEATHER,
        payload
    }
};
