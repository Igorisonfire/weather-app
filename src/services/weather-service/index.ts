import {IFetcher} from "../../api/fetcher/model";
import Paths from "../../api/paths";
import {IWeatherService} from "./model";
import {injectPropertyFetcher} from "../../injects/injects-fetcher";

export default class WeatherService implements IWeatherService {

    @injectPropertyFetcher
    private fetcher!: IFetcher;

    getWeather = async(units: string) => {
        return await this.fetcher.get(Paths.Weather.GetWeather(units));
    };
}
