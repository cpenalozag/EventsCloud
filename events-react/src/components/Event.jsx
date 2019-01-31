import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

class Event extends Component {
    render() {
        const {event} = this.props;
        return (
            <div className="col-md-4">

                    <Card className={"card"}>
                        <CardContent>
                            <Link to={`/events/${event.id}`} query={{id:event.id}} style={{ textDecoration: 'none' }}>
                            <Typography variant="h4" component="h3">
                                {event.name}
                            </Typography>
                            <Typography color="textSecondary" variant="body1">
                                {event.category}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Place:</strong> {event.place}
                            </Typography>
                                <hr />
                            </Link>
                            <span><button className="btn btn-danger" value={event.id} onClick={this.props.onDelete}>Delete</button></span>
                        </CardContent>
                    </Card>


            </div>
        );
    }
}

export default Event;