import uiReducer from '../../reducers/ui'

describe('test function uiReducer', () => {
    it('set sliderTabIndex', () => {
        const expectedState = {
            sliderTabIndex: 1,
        };

        const action = {
            payload: 1,
            type: 'SET_SLIDER_TAB_INDEX',
        };

        const result = uiReducer(undefined, action);

        expect(result).toEqual(expectedState);
    });

    it('reset status sliderTabIndex', () => {
        const expectedState = {
            sliderTabIndex: 0,
        };

        const action = {
            type: 'RESET_SLIDER_TAB_INDEX',
        };

        const result = uiReducer(undefined, action);

        expect(result).toEqual(expectedState);
    });

    it('set sliderTabIndex', () => {
        const initState = {
            sliderTabIndex: 0,
        };

        const action = {
            payload: 10,
            type: 'PRELOADER_GLOBAL_OPEN_1',
        };

        const result = uiReducer(undefined, action);

        expect(result).toEqual(initState);
    });
});