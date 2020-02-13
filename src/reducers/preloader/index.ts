import {
    PRELOADER_GLOBAL_OPEN
} from "../../actions/types";
import IPreloader from "./model";

const initState: IPreloader.ModelState = {
    globalPreloader: false,
};

const preloaderReducer = (state = initState, action: any) => {
    switch (action.type) {
        case PRELOADER_GLOBAL_OPEN:
            return {
                ...state,
                globalPreloader: action.payload
            };
        default:
            return state;
    }
};

export default preloaderReducer;
