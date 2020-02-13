import {PRELOADER_GLOBAL_OPEN} from "../types";

export const preloaderGlobalOpen = (payload: boolean) => {
    return {
        type: PRELOADER_GLOBAL_OPEN,
        payload
    }
};
