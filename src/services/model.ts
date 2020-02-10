import {ISwapiService} from "./swapi-service/model";
import {IWeatherService} from "./weather-service/model";

export interface IService {
    swapiService: ISwapiService,
    weatherService: IWeatherService,
}
