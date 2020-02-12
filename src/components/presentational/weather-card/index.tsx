import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './index.scss';

interface IProps {
    day: string
    maxTemp: number
    minTemp: number
    icon: string
    description: string
}

export const WeatherCard = ({day, maxTemp, minTemp, icon, description}: IProps) => {
    return (
        <Card className={''}>
            <CardContent>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=''/>
                <Typography variant="h5" component="h2" gutterBottom>{day}</Typography>
                <Typography variant="h5" component="h2" gutterBottom>{description}</Typography>
                <Typography variant="body2" component="p">Max: {maxTemp}</Typography>
                <Typography variant="body2" component="p">Min: {minTemp}</Typography>
            </CardContent>
        </Card>
    );
};
