import preloaderReducer from '../../reducers/preloader'

describe('test function preloaderReducer', () => {
    it('set status loader', () => {
        const expectedState = {
            globalPreloader: true,
        };

        const action = {
            payload: true,
            type: 'PRELOADER_GLOBAL_OPEN',
        };

        const result = preloaderReducer(undefined, action);

        expect(result).toEqual(expectedState);
    });

    it('set status loader', () => {
        const expectedState = {
            globalPreloader: false,
        };

        const action = {
            payload: false,
            type: 'PRELOADER_GLOBAL_OPEN',
        };

        const result = preloaderReducer(undefined, action);

        expect(result).toEqual(expectedState);
    });

    it('set status loader', () => {
        const initState = {
            globalPreloader: false,
        };

        const action = {
            payload: false,
            type: 'PRELOADER_GLOBAL_OPEN_1',
        };

        const result = preloaderReducer(undefined, action);

        expect(result).toEqual(initState);
    });
});