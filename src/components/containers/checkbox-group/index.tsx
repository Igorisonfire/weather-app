import * as React from 'react';
import {connect} from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

import './index.scss';
import {IRootAppReducerState} from "../../../reducer/model";
import IWeather from '../../../reducers/weather/model'
import {Dispatch} from 'redux'
import {setUnitOfMeasure} from '../../../actions/set-unit-of-measure'

interface IProps {
    weatherState: IWeather.ModelState
    dispatch: Dispatch
}

interface IState {
    value: string
}

class CheckboxGroup extends React.Component<IProps, IState> {

    state: IState = {
        value: 'imperial'
    };

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: event.target.value
        })
        this.props.dispatch(setUnitOfMeasure(event.target.value))
    };

    render() {
        return (
            <RadioGroup color={'primary'} className={'checkbox-group-wrapper'} row={true} aria-label="unit-of-measure"
                        name="unit-of-measure" value={this.state.value} onChange={this.handleChange}>
                <Grid container spacing={3}>
                    <Grid item xs={6}
                          container
                          justify="center"
                          alignItems="center">
                        <FormControlLabel value="metric" control={<Radio color="primary"/>} label="Celcius"/>
                    </Grid>
                    <Grid item xs={6}
                          container
                          justify="center"
                          alignItems="center">
                        <FormControlLabel value="imperial" control={<Radio color="primary"/>} label="Fahrenheit"/>
                    </Grid>
                </Grid>
            </RadioGroup>
        )
    }
}

const mapStateToProps = ({ weatherState }: IRootAppReducerState) => ({ weatherState });

export default connect(mapStateToProps)(CheckboxGroup);
