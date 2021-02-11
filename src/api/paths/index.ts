import {configuration} from "../config";

const base = (rest: string) => `${configuration.remoteApi}/${rest}`;

export default class Paths {
    static Swapi = class {
        static GetPeople = (id: number) => base(`people/${id}`);
    };

    static Weather = class  {
        static GetWeather = (units: string) => base(`data/2.5/forecast?q=Munich,de&units=${units}&APPID=9620ff55a3b5a404d3e4404d37cd690b&cnt=40`)
    }
}