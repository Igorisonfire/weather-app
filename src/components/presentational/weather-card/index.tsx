import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import moment from 'moment'

import './index.scss';

interface IProps {
    day: string
    maxTemp: number
    minTemp: number
    icon: string
    description: string
    unit: string
    onClick(): void
    checked: boolean
}

export const WeatherCard = ({day, maxTemp, minTemp, icon, description, unit, onClick, checked}: IProps) => {
    return (
        <Card className={'weather-card-wrapper'} elevation={3} variant={checked ? 'outlined' : 'elevation'} onClick={onClick}>
            <CardActionArea>
                <CardContent>
                    <div className={'center'}>
                        <img
                            className={'weather-image'} src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt='weather'/>
                        <Typography
                            className={'capitalize'}
                            variant="body2"
                            component="p"
                            align={'center'}
                            color="textSecondary"
                            gutterBottom>{description}</Typography>
                    </div>
                    <Typography
                        variant="h6"
                        component="p"
                        align={'center'}
                        gutterBottom>{moment(day).format('dddd MMM Do')}</Typography>
                    {Math.round(minTemp) === Math.round(maxTemp) ?
                        <Typography
                            variant="h5"
                            component="p"
                            color={'primary'}
                            align={'center'}>{Math.round(maxTemp) + unit}
                        </Typography> :
                        <Typography
                            variant="h5"
                            component="p"
                            color={'primary'}
                            align={'center'}>{Math.round(minTemp) + unit} &mdash; {Math.round(maxTemp) + unit}
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
