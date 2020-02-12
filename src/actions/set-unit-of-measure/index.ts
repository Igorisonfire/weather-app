import {SET_UNIT_OF_MEASURE} from "../types";

export const setUnitOfMeasure = (payload: string) => {
    return {
        type: SET_UNIT_OF_MEASURE,
        payload
    }
};
