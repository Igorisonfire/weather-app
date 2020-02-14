import {dateToDay, dateToTime} from '../../helpers/string-helpers'

describe('test function dateToDay', () => {
    it('success', () => {
        const result = dateToDay("2020-02-14 00:00:00");
        expect(result).toEqual(14);
    });
});

describe('test function dateToDay', () => {
    it('success', () => {
        const result = dateToTime("2020-02-14 00:00:00");
        expect(result).toEqual('12:00 am');
    });
});