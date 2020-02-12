import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
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
        <Card className={''} elevation={3} variant={checked ? 'outlined' : 'elevation'} onClick={onClick}>
            <CardContent>
                <CardMedia
                    component="img"
                    image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                />
                <Typography variant="h5" component="h2" align={'center'} color={'primary'}
                            gutterBottom>{moment(day).format('dddd')}</Typography>
                <Typography variant="body2" component="p" align={'center'} color="textSecondary"
                            gutterBottom>{description}</Typography>
                <Typography variant="body2" component="p"
                            align={'center'}>{Math.round(minTemp) + unit} &mdash; {Math.round(maxTemp) + unit}</Typography>
            </CardContent>
        </Card>
    );
};
