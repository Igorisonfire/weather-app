import moment from 'moment'
import IWeather from '../reducers/weather/model'
import {dateToDay} from './string-helpers'


export const weatherDataConversion = (weatherData: IWeather.ModelAPI) => {


    let daysObj: any = {}

    // Create a weather object by day
    weatherData.list.reduce((prev: IWeather.WeatherSegment[], item: IWeather.WeatherSegment) => {

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
            if (nextItem.main.temp >= maxTemp) {
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

    return finalDaysArr
}
