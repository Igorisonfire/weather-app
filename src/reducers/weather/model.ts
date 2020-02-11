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
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
    }

    export interface Weather {
        id: number
        main: string
        description: string
        icon: string
    }

    export interface Model extends ModelAPI {

    }

    export interface ModelState {
        weather: Maybe<Model>
    }
}

export default IWeather;
