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
import {setWeather} from "../../../actions/set-weather";

interface IProps {
    weatherService: IWeatherService;
    weatherState: IWeather.ModelState
    dispatch: Dispatch
}

interface IState extends ISizes{
    tabIndex: number
}

interface ISizes {

}

class Home extends React.Component<IProps, IState> {

    state: IState = {
        tabIndex: 0
    }

    componentDidMount(): void {
        this.getWeather()
    }

    private getWeather = async () => {
        try {
            const responseImperial = await this.props.weatherService.getWeather('imperial');
            const responseMetric = await this.props.weatherService.getWeather('metric');
            this.props.dispatch(setWeather({
                imperial: responseImperial,
                metric: responseMetric
            }));
        } catch (err) {
            console.error(err);
        }
    };

    private tapCard = (index: number) => {
        this.setState({
            tabIndex: index
        })
    }


    render() {

        console.log(this.props.weatherState)

        const weather = this.props.weatherState.weatherListToMap
        const unit = this.props.weatherState.unit
        const tabIndex = this.state.tabIndex

        if(!weather) return null

        return (
            <Container className={'home-container'}>
                <CheckboxGroup/>

                <CardSlider>
                    {weather && weather.map((item: IWeather.WeatherDay, index: number) => (
                        <WeatherCard
                            key={index}
                            day={item.day}
                            maxTemp={item.maxTemp}
                            minTemp={item.minTemp}
                            description={item.maxInfo.description}
                            icon={item.maxInfo.icon}
                            unit={unit}
                            onClick={() => this.tapCard(index)}
                            checked={tabIndex === index}
                        />
                    ))}
                </CardSlider>

                <div className={'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}>
                    {weather && weather[tabIndex].segments.map((segment: IWeather.WeatherSegment, index: number) => (
                        <p key={index}>{segment.main.temp+unit}</p>
                    ))}
                </div>
            </Container>
        )
    }
}

const mapServicesToProps: IMapServicesToProps = ({ weatherService }: IService) => ({ weatherService });

const mapStateToProps = ({ weatherState }: IRootAppReducerState) => ({ weatherState });

export default connect(mapStateToProps)(
    withService(mapServicesToProps)(Home)
);
