import React, {Component} from 'react';

import './App.css';

import Event from "./components/Event";
import AddEvent from "./components/AddEvent";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            name: "",
            category: "",
            place: "",
            address: "",
            startDate: new Date('2018-08-18T21:11:54'),
            endDate: new Date('2018-08-19T21:26:35'),
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

    getEvents() {
        fetch("http://localhost:4000/events")
            .then(response => response.json())
            .then(data => this.setState({events: data}))
            .catch(err => console.error(err))
    }

    addEvent() {
        const {name, category, place, address, startDate, endDate, type} = this.state;
        if (name.length === 0 || category.length === 0 || place.length === 0 || address.length === 0 || type.length === 0) alert("Please fill out all the fields");
        else fetch(`http://localhost:4000/events/add?name=${name}&category=${category}&place=${place}&address=${address}&startDate=${startDate.toDateString().concat(" ", startDate.toTimeString())}&endDate=${endDate.toDateString().concat(" ", startDate.toTimeString())}&type=${type}`)
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
                          addEvent={this.addEvent.bind(this)} {...this.state}/>

                <div className="container">
                    <div className="row">
                        {this.renderEvents()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;