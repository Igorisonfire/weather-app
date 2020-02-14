import IWeather from '../reducers/weather/model'

export const testApiWeatherData: IWeather.ModelAPI = {
    list: [
        {
            main: {temp: 4.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
            weather: [{
                id: 500,
                main: "Rain",
                description: "light rain",
                icon: "10n"
            }],
            dt_txt: "2020-02-13 21:00:00"
        },
        {
            main: {temp: 5.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
            weather: [{
                id: 500,
                main: "Rain",
                description: "light rain",
                icon: "10n"
            }],
            dt_txt: "2020-02-14 00:00:00"
        },
        {
            main: {temp: 6.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
            weather: [{
                id: 500,
                main: "Rain",
                description: "light rain",
                icon: "10n"
            }],
            dt_txt: "2020-02-14 03:00:00"
        },
        {
            main: {temp: 7.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
            weather: [{
                id: 500,
                main: "Rain",
                description: "light rain",
                icon: "10n"
            }],
            dt_txt: "2020-02-15 00:00:00"
        }
    ],
}

export const testConverseWeatherData: IWeather.WeatherDay[] = [
    {
        maxTemp: 4.1,
        minTemp: 4.1,
        maxInfo: {icon: "10n", description: "light rain"},
        day: "2020-02-13 21:00:00",
        segments: [
            {
                main: {temp: 4.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
                weather: [{id: 500, main: "Rain", description: "light rain", icon: "10n"}],
                dt_txt: "2020-02-13 21:00:00"
            }
        ]
    },
    {
        maxTemp: 6.1,
        minTemp: 5.1,
        maxInfo: {icon: "10n", description: "light rain"},
        day: "2020-02-14 00:00:00",
        segments: [
            {
                main: {temp: 5.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
                weather: [{id: 500, main: "Rain", description: "light rain", icon: "10n"}],
                dt_txt: "2020-02-14 00:00:00"
            },
            {
                main: {temp: 6.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
                weather: [{id: 500, main: "Rain", description: "light rain", icon: "10n"}],
                dt_txt: "2020-02-14 03:00:00"
            }
        ]
    },
    {
        maxTemp: 7.1,
        minTemp: 7.1,
        maxInfo: {icon: "10n", description: "light rain"},
        day: "2020-02-15 00:00:00",
        segments: [
            {
                main: {temp: 7.1, feels_like: -2.41, temp_min: 2.61, temp_max: 4.1},
                weather: [{id: 500, main: "Rain", description: "light rain", icon: "10n"}],
                dt_txt: "2020-02-15 00:00:00"
            }
        ]
    },
]