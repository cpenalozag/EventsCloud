import React, {Component} from 'react';

import './App.css';

import AuthHelperMethods from './components/AuthHelperMethods';
import withAuth from './components/withAuth';

import Event from "./components/Event";
import AddEvent from "./components/AddEvent";


class App extends Component {

    Auth = new AuthHelperMethods();

    constructor(props) {
        super(props);
        this.state = {
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

    _handleLogout = () => {

        this.Auth.logout()
        this.props.history.replace('/login');

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


                <AddEvent handleChange={this.handleChange.bind(this)}
                          addEvent={this.addEvent.bind(this)}
                          handleStartDateChange={this.handleStartDateChange.bind(this)}
                          handleEndDateChange={this.handleEndDateChange.bind(this)} {...this.state}/>

                <div className="container">
                    <div className="row">
                        {this.renderEvents()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(App);