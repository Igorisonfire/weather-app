import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './index.scss';

interface IProps {
    number: number
}

export const WeatherCard = ({number}: IProps) => {
    return (
        <Card className={''}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>{number}</Typography>
                <Typography variant="h5" component="h2" gutterBottom>Day</Typography>
                <Typography variant="body2" component="p">Temp</Typography>
            </CardContent>
        </Card>
    );
};
