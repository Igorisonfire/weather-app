import IWeather from "./model";
import {SET_WEATHER, SET_UNIT_OF_MEASURE, CLEAN_WEATHER} from "../../actions/types";
import {weatherDataConversion} from '../../helpers/data-conversion'
import {Maybe} from '../../toolbox/custom-types'

const initState: IWeather.ModelState = {
    weatherListImperial: null,
    weatherListMetric: null,
    weatherListToMap: null,
    unitOfMeasure: 'imperial',
    unit: '°F'
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
            let unit: string = ''

            if(action.payload === 'imperial'){
                listToMap = state.weatherListImperial
                unit = '°F'
            } else if(action.payload === 'metric'){
                listToMap = state.weatherListMetric
                unit = '°C'
            }

            return {
                ...state,
                unitOfMeasure: action.payload,
                weatherListToMap: listToMap,
                unit: unit
            };
        }
        case CLEAN_WEATHER: {

            return {
                ...state,
                weatherListImperial: null,
                weatherListMetric: null,
                weatherListToMap: null,
                unitOfMeasure: 'imperial',
                unit: '°F'
            };
        }
        default:
            return state;
    }
};

export default weatherReducer;
