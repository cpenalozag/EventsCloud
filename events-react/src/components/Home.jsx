import React, {Component} from 'react';
import AddEvent from "./AddEvent";
import Event from "./Event";
import AuthHelperMethods from "./AuthHelperMethods";
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withAuth from "./withAuth";


class Home extends Component {

    Auth = new AuthHelperMethods();


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            events: [],
            name: "",
            category: "",
            place: "",
            address: "",
            startDate: new Date('2018-08-18T20:15:00'),
            endDate: new Date('2018-08-19T20:15:00'),
            type: "",
        }
        this.addEvent = this.addEvent.bind(this)
        this.getEvents = this.getEvents.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
    }


    componentDidMount() {
        this.getEvents();
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleStartDateChange = date => {
        this.setState({startDate: date});
    };

    handleEndDateChange = date => {
        this.setState({endDate: date});
    };

    handleLogout = () => {
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    getEvents() {
        fetch("http://localhost:4000/events")
            .then(response => response.json())
            .then(data => this.setState({events: data}))
            .catch(err => console.error(err))
    }

    addEvent() {
        const {name, category, place, address, startDate, endDate, type} = this.state;
        if (name.length === 0 || category.length === 0 || place.length === 0 || address.length === 0 || type.length === 0) alert("Please fill out all the fields");
        else fetch(`http://localhost:4000/events/add?name=${name}&category=${category}&place=${place}&address=${address}&startDate=${startDate}&endDate=${endDate}&type=${type}`)
            .then(this.getEvents)
            .catch(err => console.error(err))
    }

    deleteEvent(e) {
        fetch(`http://localhost:4000/events/delete?id=${e.target.value}`)
            .then(this.getEvents)
            .catch(err => console.error(err))
    }

    renderEvents() {
        return this.state.events.map((event) => {
            return (
                <Event key={event.id} event={event} onDelete={this.deleteEvent.bind(this)}/>
            );
        })
    }

    render() {
        return (
            <div className="App">

                <AppBar position="static">
                    <Toolbar>
                        <Link to={"/"} style={{textDecoration: 'none', color: 'inherit'}}>
                            <Typography style={{flex: 1}} variant="h4" color="inherit">
                                Events
                            </Typography>
                        </Link>
                        <Button color="inherit" onClick={this.handleLogout}>Log out</Button>
                    </Toolbar>
                </AppBar>

                <AddEvent handleChange={this.handleChange.bind(this)}
                          addEvent={this.addEvent.bind(this)}
                          handleStartDateChange={this.handleStartDateChange.bind(this)}
                          handleEndDateChange={this.handleEndDateChange.bind(this)}
                          {...this.state}
                />

                <div className="container">
                    <div className="row">
                        {this.renderEvents()}
                    </div>
                </div>

            </div>

        );
    }
}

export default withAuth(Home);