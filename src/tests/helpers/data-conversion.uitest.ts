import {weatherDataConversion} from '../../helpers/data-conversion'
import {testApiWeatherData, testConverseWeatherData} from '../../constants/test-data'

describe('test function weatherDataConversion', () => {
    it('success', () => {
        const result = weatherDataConversion(testApiWeatherData);
        expect(result).toEqual(testConverseWeatherData);
    });
});