import SwapiService from "./swapi-service";
import WeatherService from "./weather-service";
import {IService} from "./model";

class Service implements IService {
    public swapiService = new SwapiService();
    public weatherService = new WeatherService();
}

const service = new Service();

export default service;
