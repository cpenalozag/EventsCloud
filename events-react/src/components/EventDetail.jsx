import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from "material-ui-pickers";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import withAuth from "./withAuth";
import {Link} from "react-router-dom";

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            name: "",
            category: "",
            place: "",
            address: "",
            startDate: new Date('2018-08-18T21:11:54'),
            endDate: new Date('2018-08-19T21:26:35'),
            type: ""
        }
        this.updateEvent = this.updateEvent.bind(this);
    }

    componentDidMount() {
        let parts = this.props.history.location.pathname.split("/");
        const id = parseInt(parts[parts.length-1]);
        this.setState({id:id});
        this.getEvent(id);
    }

    updateEvent() {
        const {name, category, place, address, startDate, endDate, type} = this.state;
        if (name.length === 0 || category.length === 0 || place.length === 0 || address.length === 0 || type.length === 0) alert("Please fill out all the fields");
        else fetch(`/events/update?id=${this.state.id}&name=${name}&category=${category}&place=${place}&address=${address}&startDate=${startDate}&endDate=${endDate}&type=${type}`)
            .then(this.getEvents, alert("The event was updated"))
            .catch(err => console.error(err))
    }

    getEvent(id) {
        fetch(`/events/detail?id=${id}&email=${this.props.confirm.email}`)
            .then(response => response.json())
            .then(data => {
                if (data[0]){
                    this.setState({
                        name: data[0].name,
                        category: data[0].category,
                        place: data[0].place,
                        address: data[0].address,
                        startDate: data[0].start_date,
                        endDate: data[0].end_date,
                        type: data[0].type,
                    });
                }
                else {
                    this.props.history.push('/events');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };


    render() {
        return (
            <div>
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
                <div className="details jumbotron">

                    <div className="container">
                        <h2>Event details</h2>
                        <Grid container justify="space-around">
                            <FormControl>
                                <TextField
                                    label="Name"
                                    name={"name"}
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </FormControl>

                            <FormControl>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={this.state.category}
                                    name={"category"}
                                    onChange={this.handleChange}
                                    style={{width: 200}}
                                >
                                    <MenuItem value={"Conferencia"}>Conferencia</MenuItem>
                                    <MenuItem value={"Seminario"}>Seminario</MenuItem>
                                    <MenuItem value={"Congreso"}>Congreso</MenuItem>
                                    <MenuItem value={"Curso"}>Curso</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <TextField
                                    name={"place"}
                                    label="Place"
                                    value={this.state.place}
                                    onChange={this.handleChange}
                                />
                            </FormControl>

                            <FormControl>
                                <TextField
                                    name={"address"}
                                    label="Address"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                />
                            </FormControl>

                            <FormControl>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    name={"type"}
                                    value={this.state.type}
                                    onChange={this.handleChange}
                                    style={{width: 200}}
                                >
                                    <MenuItem value={"Virtual"}>Virtual</MenuItem>
                                    <MenuItem value={"Presencial"}>Presencial</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        <br/>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <DatePicker
                                    label="Start Date"
                                    name={"startDate"}
                                    value={this.state.startDate}
                                    onChange={date => this.setState({startDate: date})}
                                />
                                <TimePicker
                                    label="Start Time"
                                    name="startDate"
                                    value={this.state.startDate}
                                    onChange={date => this.setState({startDate: date})}
                                />
                                <DatePicker
                                    label="End Date"
                                    name={"endDate"}
                                    value={this.state.endDate}
                                    onChange={date => this.setState({endDate: date})}
                                />
                                <TimePicker
                                    label="End Time"
                                    name={"endDate"}
                                    value={this.state.endDate}
                                    onChange={date => this.setState({endDate: date})}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>

                    <br/>

                    <button onClick={this.updateEvent} className="btn btn-primary">
                        Update details
                    </button>

                </div>
            </div>
        );
    }
}

export default withAuth(EventDetail);