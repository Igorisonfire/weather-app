import appStore from "../store";
import {preloaderGlobalOpen} from "../actions/preloader-global-open";

export const preloaderGlobalState = (status: boolean, timeout: number) => setTimeout(() => {
    appStore.dispatch(preloaderGlobalOpen(status));
}, timeout);
