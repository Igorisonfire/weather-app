import IWeather from "../reducers/weather/model";
import IUi from '../reducers/ui/model'
import IPreloader from '../reducers/preloader/model'

export interface IRootAppReducerState {
    weatherState: IWeather.ModelState,
    uiState: IUi.ModelState,
    preloaderState: IPreloader.ModelState,
}
