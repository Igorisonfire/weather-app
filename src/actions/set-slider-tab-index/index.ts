import {SET_SLIDER_TAB_INDEX} from "../types";

export const setSliderTabIndex = (payload: number) => {
    return {
        type: SET_SLIDER_TAB_INDEX,
        payload
    }
};
