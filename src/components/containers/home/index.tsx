import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import Container from '@material-ui/core/Container';

import {IMapServicesToProps, withService} from "../../hoc-helpers/with-service";
import {IService} from "../../../services/model";
import './index.scss';
import {IRootAppReducerState} from "../../../reducer/model";
import CheckboxGroup from "../checkbox-group";
import {WeatherCard} from "../../presentational/weather-card";
import CardSlider from "../cards-slider";
import {IWeatherService} from "../../../services/weather-service/model";
import IWeather from "../../../reducers/weather/model";
import {getWeather} from "../../../actions/get-weather";

interface IProps {
    weatherService: IWeatherService;
    weatherState: IWeather.ModelState
    dispatch: Dispatch
}

interface IState extends ISizes{

}

interface ISizes {

}

class Home extends React.Component<IProps, IState> {

    componentDidMount(): void {
        this.getWeather()
    }

    private getWeather = async () => {
        try {
            // imperial or metric
            const response = await this.props.weatherService.getWeather('metric');
            this.props.dispatch(getWeather(response));
        } catch (err) {
            console.error(err);
        }
    };


    render() {
        return (
            <Container className={'home-container'}>
                <CheckboxGroup/>

                <CardSlider>
                    <WeatherCard number={1}/>
                    <WeatherCard number={2}/>
                    <WeatherCard number={3}/>
                    <WeatherCard number={4}/>
                    <WeatherCard number={5}/>
                </CardSlider>
            </Container>
        )
    }
}

const mapServicesToProps: IMapServicesToProps = ({ weatherService }: IService) => ({ weatherService });

const mapStateToProps = ({ weatherState }: IRootAppReducerState) => ({ weatherState });

export default connect(mapStateToProps)(
    withService(mapServicesToProps)(Home)
);
