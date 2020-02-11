import IWeather from "./model";
import {SET_WEATHER} from "../../actions/types";
import {dateToDay} from '../../helpers/string-helpers'

const initState: IWeather.ModelState = {
    weather: null
};

const weatherReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_WEATHER: {

            const mainWeatherData = action.payload
            let daysObj: any = {}

            // Create a weather object by day
            mainWeatherData.list.reduce((prev: IWeather.WeatherSegment[], item: IWeather.WeatherSegment) => {

                const filtered = prev.filter((itemPrev: IWeather.WeatherSegment) => {
                    return dateToDay(itemPrev.dt_txt) === dateToDay(item.dt_txt)
                })

                if (!(dateToDay(item.dt_txt) in daysObj)) {
                    daysObj[dateToDay(item.dt_txt)] = {
                        day: item.dt_txt,
                        segments: filtered.concat(item)
                    };

                    return prev.filter((itemPrev: IWeather.WeatherSegment) => {
                        return dateToDay(itemPrev.dt_txt) !== dateToDay(item.dt_txt)
                    })
                }

                if (dateToDay(item.dt_txt) in daysObj) {
                    daysObj[dateToDay(item.dt_txt)].segments.push(item)

                    return prev;
                }

                return prev.concat(item);
            }, [])

            //Make an array of objects
            const startDaysArr: any = Object.values(daysObj)

            //Collect a new array with the necessary fields
            const finalDaysArr = startDaysArr.map((item: IWeather.WeatherDay) => {

                let maxTemp = item.segments[0].main.temp
                let minTemp = item.segments[0].main.temp
                let maxInfo = {}

                item.segments.forEach((nextItem: IWeather.WeatherSegment) => {
                    if (nextItem.main.temp > maxTemp) {
                        maxTemp = nextItem.main.temp;
                        maxInfo = {
                            icon: nextItem.weather[0].icon,
                            description: nextItem.weather[0].description
                        }
                    } else if (nextItem.main.temp < minTemp) {
                        minTemp = nextItem.main.temp;
                    }
                })

                return{
                    maxTemp,
                    minTemp,
                    maxInfo,
                    ...item
                }
            })

            return {
                ...state,
                weather: finalDaysArr
            };
        }
        default:
            return state;
    }
};

export default weatherReducer;
