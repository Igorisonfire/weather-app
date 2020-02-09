import * as React from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';

import {IMapServicesToProps, withService} from "../../hoc-helpers/with-service";
import {IService} from "../../../services/model";
import {ISwapiService} from "../../../services/swapi-service/model";

import './index.scss';
import {IRootAppReducerState} from "../../../reducer/model";
import IPeople from "../../../reducers/people/model";
import {Dispatch} from "redux";
import {getPeople} from "../../../actions/get-people";
import CheckboxGroup from "../checkbox-group";
import {WeatherCard} from "../../presentational/weather-card";
import CardSlider from "../cards-slider";

interface IProps {
    swapiService: ISwapiService;
    people: IPeople.Model;
    dispatch: Dispatch
}

interface IState extends ISizes{

}

interface ISizes {

}

class Home extends React.Component<IProps, IState> {



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

const mapServicesToProps: IMapServicesToProps = ({ swapiService }: IService) => ({ swapiService });

const mapStateToProps = ({ people }: IRootAppReducerState) => ({ people });

export default connect(mapStateToProps)(
    withService(mapServicesToProps)(Home)
);
