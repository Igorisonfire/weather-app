import {SET_SLIDER_TAB_INDEX} from "../../actions/types";
import IUi from './model'

const initState: IUi.ModelState = {
    sliderTabIndex: 0
};

const uiReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_SLIDER_TAB_INDEX: {



            return {
                ...state,
                sliderTabIndex: 0
            };
        }
        default:
            return state;
    }
};

export default uiReducer;
