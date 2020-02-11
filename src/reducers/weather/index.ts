import IWeather from "./model";
import {GET_WEATHER} from "../../actions/types";
import {dateToDay} from '../../helpers/string-helpers'

const initState: IWeather.ModelState = {
    weather: null
};

const weatherReducer = (state = initState, action: any) => {
    switch (action.type) {
        case GET_WEATHER: {

            let daysObj: any = {}

            action.payload.list.reduce((prev: any[], item: any) => {

                const filtered = prev.filter((itemPrev: any) => dateToDay(itemPrev.dt_txt) === dateToDay(item.dt_txt));


                if(!(dateToDay(item.dt_txt) in daysObj)) {
                    daysObj[dateToDay(item.dt_txt)] = {
                        day: item.dt_txt,
                        segments: filtered.concat(item)
                    };

                    return prev.filter((itemPrev: any) => dateToDay(itemPrev.dt_txt) !== dateToDay(item.dt_txt));
                }

                if(dateToDay(item.dt_txt) in daysObj) {
                    daysObj[dateToDay(item.dt_txt)].segments.push(item)

                    return prev;
                }

                return prev.concat(item);
            }, [])

            const nerArr = Object.values(daysObj)



            const testB = nerArr.map((item: any) => {

                let maxTemp = item.segments[0].main.temp
                let minTemp = item.segments[0].main.temp

                for (let i = 0; i < item.segments.length; i++) {

                    if (item.segments[i].main.temp > maxTemp) {
                        maxTemp = item.segments[i].main.temp;
                    }

                    if (item.segments[i].main.temp < minTemp) {
                        minTemp = item.segments[i].main.temp;
                    }
                }

                return{
                    maxTemp,
                    minTemp,
                    ...item
                }
            })

            console.log(nerArr);
            console.log('testB',testB);

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
