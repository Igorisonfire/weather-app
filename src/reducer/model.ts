import IPeople from "../reducers/people/model";
import IWeather from "../reducers/weather/model";

export interface IRootAppReducerState {
    people: IPeople.Model,
    weatherState: IWeather.ModelState,
}
