namespace IPreloader {
    interface ModelBase {

    }

    export interface ModelAPI extends ModelBase{

    }

    export interface Model extends ModelAPI {

    }

    export interface ModelState {
        globalPreloader: boolean
    }
}

export default IPreloader;
