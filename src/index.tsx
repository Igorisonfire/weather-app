import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '@styles/global.scss';

import App from './app';
import appStore from "./store";
import service from "./services";
import {ServiceProvider} from "./components/context/service-context";
import {HelmetSet} from "./components/presentational/helmet-set";

ReactDOM.render((
    <Provider store={appStore}>
        <ServiceProvider value={service}>
            {/*HashRouter for github pages (BrowserRouter - preferable)*/}
            <HashRouter basename={process.env.PUBLIC_URL}>
                <HelmetSet/>
                <App/>
            </HashRouter>
        </ServiceProvider>
    </Provider>
), document.getElementById('root'));
