import React, {Component} from 'react';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


import './App.css';

import Event from "./components/Event";



const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {

    state = {
        events: [],
        event: {
            name: "",
            category: "",
            place: "",
            address: "",
            startDate: new Date('2018-08-18T21:11:54'),
            endDate: new Date('2018-08-19T21:26:35'),
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
                <Event key={event.id} event={event}/>
            );
        })
    }

    render() {
        const event = this.state.event;
        console.log(event);
        console.log(this.state.events)
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h4" color="inherit">
                                Events
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div className="jumbotron">

                       <div className="container">
                           <h2>Add a new event</h2>
                           <Grid container justify="space-around">
                               <FormControl>
                                   <TextField
                                       label="Name"
                                       value={event.name}
                                       onChange={e => this.setState({event: {...event, name: e.target.value}})}
                                   />
                               </FormControl>

                               <FormControl>
                                   <InputLabel>Category</InputLabel>
                                   <Select
                                       value={event.category}
                                       onChange={e => this.setState({event: {...event, category: e.target.value}})}
                                       style={{width: 200}}
                                   >
                                       <MenuItem value={"conferencia"}>Conferencia</MenuItem>
                                       <MenuItem value={"seminario"}>Seminario</MenuItem>
                                       <MenuItem value={"congreso"}>Congreso</MenuItem>
                                       <MenuItem value={"curso"}>Curso</MenuItem>
                                   </Select>
                               </FormControl>

                               <FormControl>
                                   <TextField
                                       label="Place"
                                       value={this.state.place}
                                       onChange={e => this.setState({event: {...event, place: e.target.value}})}
                                   />
                               </FormControl>

                               <FormControl>
                                   <TextField
                                       label="Address"
                                       value={this.state.address}
                                       onChange={e => this.setState({event: {...event, address: e.target.value}})}
                                   />
                               </FormControl>

                               <FormControl>
                                   <InputLabel>Type</InputLabel>
                                   <Select
                                       value={event.type}
                                       onChange={e => this.setState({event: {...event, type: e.target.value}})}
                                       style={{width: 200}}
                                   >
                                       <MenuItem value={"virtual"}>Virtual</MenuItem>
                                       <MenuItem value={"presencial"}>Presencial</MenuItem>
                                   </Select>
                               </FormControl>

                           </Grid>

                           <br/>

                           <MuiPickersUtilsProvider utils={DateFnsUtils}>
                               <Grid container justify="space-around">
                                   <DatePicker
                                       label="Start Date"
                                       value={event.startDate}
                                       onChange={date => this.setState({event: {...event, startDate: date}})}
                                   />
                                   <TimePicker
                                       label="Start Time"
                                       value={event.startDate}
                                       onChange={date => this.setState({event: {...event, startDate: date}})}
                                   />
                                   <DatePicker
                                       label="End Date"
                                       value={event.endDate}
                                       onChange={date => this.setState({event: {...event, endDate: date}})}
                                   />
                                   <TimePicker
                                       label="End Time"
                                       value={event.endDate}
                                       onChange={date => this.setState({event: {...event, endDate: date}})}
                                   />
                               </Grid>
                           </MuiPickersUtilsProvider>
                       </div>

                        <br/>

                        <Button onClick={console.log("click")} variant="contained" color="primary" >
                            Guardar
                        </Button>

                    </div>


                </MuiThemeProvider>
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
