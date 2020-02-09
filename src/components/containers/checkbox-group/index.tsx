import * as React from 'react';
import {connect} from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './index.scss';
import {IRootAppReducerState} from "../../../reducer/model";


interface IProps {

}

interface IState {
    value: string
}

class CheckboxGroup extends React.Component<IProps, IState> {

    state: IState = {
        value: 'celcius'
    };

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: event.target.value
        })
    };

    render() {
        return(

                <RadioGroup className={'checkbox-group-wrapper'} row={true} aria-label="unit-of-measure" name="unit-of-measure" value={this.state.value} onChange={this.handleChange}>
                    <FormControlLabel value="celcius" control={<Radio />} label="Celcius" />
                    <FormControlLabel value="fahrenheit" control={<Radio />} label="Fahrenheit" />
                </RadioGroup>
        )
    }
}

const mapStateToProps = ({ people }: IRootAppReducerState) => ({ people });

export default connect(mapStateToProps)(CheckboxGroup);
