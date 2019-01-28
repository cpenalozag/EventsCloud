import React, {Component} from 'react';
import './App.css';

class App extends Component {

    state = {
        events: [],
        event: {
            name: "",
            category: "",
            place: "",
            address: "",
            startDate: "",
            endDate: "",
            type: ""
        }
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        fetch("http://localhost:4000/events")
            .then(response => response.json())
            .then(data => this.setState({events: data}))
            .catch(err => console.error(err))
    }

    addEvent() {
        const {event} = this.state;
        fetch(`http://localhost:4000/events/add?name=${event.name}&category=${event.category}&place=${event.place}&address=${event.address}&startDate=${event.startDate}&endDate=${event.endDate}&type=${event.type}`)
            .then(response => response.json())
            .then(this.getEvents)
            .catch(err => console.error(err))
    }

    renderEvents() {
        return this.state.events.map((event) => {
            return (
                <div key={event.id}>
                    <p>{event.name}</p>
                </div>
            )
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="App">
                {this.renderEvents()}
            </div>
        );
    }
}

export default App;
