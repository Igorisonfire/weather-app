import {GET_WEATHER} from "../types";
import IWeather from "../../reducers/weather/model";

export const getWeather = (payload: IWeather.Model) => {
    return {
        type: GET_WEATHER,
        payload
    }
};
