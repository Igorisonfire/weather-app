import IWeather from "./model";
import {GET_WEATHER} from "../../actions/types";
import moment from 'moment'

const initState: IWeather.ModelState = {
    weather: null
};

const weatherReducer = (state = initState, action: any) => {
    switch (action.type) {
        case GET_WEATHER: {

            const dateToDay = (date: string) => {
                return Number(moment(date).format('D'))
            }

            let daysObj: any = {}

            action.payload.list.reduce((prev: IWeather.WeatherSegment[], item: IWeather.WeatherSegment) => {

                const filtered = prev.filter((itemPrev: any) => dateToDay(itemPrev.dt_txt) === dateToDay(item.dt_txt));

                if(filtered.length > 0 && !(dateToDay(item.dt_txt) in daysObj)) {
                    daysObj[dateToDay(item.dt_txt)] = filtered.concat(item);

                    return prev.filter((itemPrev: any) => dateToDay(itemPrev.dt_txt) !== dateToDay(item.dt_txt));
                }

                if(dateToDay(item.dt_txt) in daysObj) {
                    daysObj[dateToDay(item.dt_txt)].push(item)

                    return prev;
                }

                return prev.concat(item);
            }, [])

            console.log(Object.values(daysObj));

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
