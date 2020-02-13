import * as React from 'react';

import './index.scss';
import {IRootAppReducerState} from "../../../reducer/model";
import {connect} from "react-redux";
import IPreloader from "../../../reducers/preloader/model";
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
    preloaderState: IPreloader.ModelState;
}

const PreloaderGlobal = ({preloaderState}: IProps) => {
    if(!preloaderState || !preloaderState.globalPreloader) return null;

    return (
        <div className={`preloader-global-wrapper`}>
            <CircularProgress/>
        </div>
    );
}

const mapStateToProps = ({ preloaderState }: IRootAppReducerState) => ({ preloaderState });

export default connect(mapStateToProps)(PreloaderGlobal);
