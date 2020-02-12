import IWeather from "./model";
import {SET_WEATHER, SET_UNIT_OF_MEASURE} from "../../actions/types";
import {weatherDataConversion} from '../../helpers/data-conversion'
import {Maybe} from '../../toolbox/custom-types'

const initState: IWeather.ModelState = {
    weatherListImperial: null,
    weatherListMetric: null,
    weatherListToMap: null,
    unitOfMeasure: 'imperial'
};

const weatherReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_WEATHER: {

            const weatherDataImperial = action.payload.imperial
            const weatherDataMetric = action.payload.metric

            const finalImperialData = weatherDataConversion(weatherDataImperial)
            const finalMetricData = weatherDataConversion(weatherDataMetric)

            return {
                ...state,
                weatherListImperial: finalImperialData,
                weatherListMetric: finalMetricData,
                weatherListToMap: finalImperialData,
            };
        }
        case SET_UNIT_OF_MEASURE: {

            let listToMap: Maybe<IWeather.WeatherDay[]> = []

            if(action.payload === 'imperial'){
                listToMap = state.weatherListImperial
            } else if(action.payload === 'metric'){
                listToMap = state.weatherListMetric
            }

            return {
                ...state,
                unitOfMeasure: action.payload,
                weatherListToMap: listToMap
            };
        }
        default:
            return state;
    }
};

export default weatherReducer;
