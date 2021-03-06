import {Maybe} from "../../toolbox/custom-types";

namespace IWeather {
    export interface ModelAPI {
        list: WeatherSegment[]
    }

    export interface WeatherSegment {
        main: Main
        weather: Weather[]
        dt_txt: string
    }

    export interface Main {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
    }

    export interface Weather {
        id: number
        main: string
        description: string
        icon: string
    }
    
    
    export interface WeatherDay {
        maxTemp: number
        minTemp: number
        maxInfo: {
            icon: string,
            description: string
        }
        day: string
        segments: IWeather.WeatherSegment[]
    }

    export interface Model extends ModelAPI {

    }

    export interface ModelState {
        weatherListImperial: Maybe<WeatherDay[]>
        weatherListMetric: Maybe<WeatherDay[]>
        weatherListToMap: Maybe<WeatherDay[]>
        unitOfMeasure: string
        unit: string
    }
}

export default IWeather;
