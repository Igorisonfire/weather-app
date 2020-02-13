import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import Container from '@material-ui/core/Container';
import { BarChart, Bar, LabelList, XAxis} from 'recharts';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { debounce } from 'lodash'

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
import {dateToTime} from '../../../helpers/string-helpers'
import IUi from '../../../reducers/ui/model'
import {setSliderTabIndex} from '../../../actions/set-slider-tab-index'
import {preloaderGlobalState} from '../../../helpers/preloader-global-helper'
import {cleanWeather} from '../../../actions/clean-weather'
import {resetSliderTabIndex} from '../../../actions/reset-slider-tab-index'

interface IProps {
    weatherService: IWeatherService
    weatherState: IWeather.ModelState
    uiState: IUi.ModelState
    dispatch: Dispatch
}

interface IState extends ISizes{
    barChartWidth: number
}

interface ISizes {

}

class Home extends React.Component<IProps, IState> {

    state: IState = {
        barChartWidth: 0
    }

    componentDidMount(): void {
        this.getWeather()
    }

    private getWeather = async () => {
        try {
            const start = preloaderGlobalState(true, 300);
            const responseImperial = await this.props.weatherService.getWeather('imperial');
            const responseMetric = await this.props.weatherService.getWeather('metric');
            this.props.dispatch(setWeather({
                imperial: responseImperial,
                metric: responseMetric
            }));
            clearTimeout(start);
            preloaderGlobalState(false, 300);
            this.getContainerWidth()
            window.addEventListener('resize', debounce(this.getContainerWidth, 500));
        } catch (err) {
            console.error(err);
            preloaderGlobalState(false, 300);
        }
    };

    private tapCard = (index: number) => {
        this.props.dispatch(setSliderTabIndex(index))
    }

    private getContainerWidth = () => {
        const container: HTMLElement | null = document.getElementById('container');

        if(container){
            this.setState({
                barChartWidth: container.offsetWidth - 32,
            });
        }
    }

    componentWillUnmount(): void {
        this.props.dispatch(cleanWeather())
        this.props.dispatch(resetSliderTabIndex())
    }


    render() {
        const weather = this.props.weatherState.weatherListToMap
        const unit = this.props.weatherState.unit
        const tabIndex = this.props.uiState.sliderTabIndex
        const {barChartWidth} = this.state

        if(!weather) return null

        return (
            <Container id={'container'} className={'home-container'}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <CheckboxGroup/>
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12} >
                        <BarChart
                            baseValue={'dataMax'}
                            width={barChartWidth}
                            height={250}
                            data={weather[tabIndex].segments}
                        >
                            <Bar maxBarSize={200} dataKey='main.temp' fill={"#7986cb"}>
                                <LabelList
                                    dataKey="main.temp"
                                    position="top"
                                    formatter={(temp) => Math.round(Number(temp)) + unit}
                                />
                            </Bar>
                            <XAxis tickFormatter={dateToTime} dataKey={"dt_txt"}/>
                        </BarChart>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const mapServicesToProps: IMapServicesToProps = ({ weatherService }: IService) => ({ weatherService });

const mapStateToProps = ({ weatherState, uiState }: IRootAppReducerState) => ({ weatherState, uiState });

export default connect(mapStateToProps)(
    withService(mapServicesToProps)(Home)
);

