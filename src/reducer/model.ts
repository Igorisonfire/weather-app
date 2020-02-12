import IPeople from "../reducers/people/model";
import IWeather from "../reducers/weather/model";
import IUi from '../reducers/ui/model'

export interface IRootAppReducerState {
    people: IPeople.Model,
    weatherState: IWeather.ModelState,
    uiState: IUi.ModelState,
}
