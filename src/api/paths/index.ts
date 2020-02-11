import {configuration} from "../config";

const base = (rest: string) => `${configuration.remoteApi}/${rest}`;

export default class Paths {
    static Swapi = class {
        static GetPeople = (id: number) => base(`people/${id}`);
    };

    static Weather = class  {
        static GetWeather = (units: string) => base(`data/2.5/forecast?q=Munich,de&units=${units}&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`)
    }
}
