import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Event extends Component {
    render() {
        const {event} = this.props;
        return (
            <div className="col-md-4">
                <Card className={"card"}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {event.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {event.category}
                        </Typography>
                        <Typography component="h5">
                            <strong>Place:</strong> {event.place}
                            <br />
                            <strong>Address:</strong> {event.address}
                            <br />
                            <strong>Start date:</strong> {event.start_date}
                            <br />
                            <strong>End date:</strong> {event.end_date}
                            <br />
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Event;