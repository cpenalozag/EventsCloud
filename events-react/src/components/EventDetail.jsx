import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.getEvent(this.props.match.params.id);
    }

    updateEvent() {
        const {name, category, place, address, startDate, endDate, type} = this.state;
        if (name.length === 0 || category.length === 0 || place.length === 0 || address.length === 0 || type.length === 0) alert("Please fill out all the fields");
        else fetch(`http://localhost:4000/events/update?id=${this.props.match.params.id}&name=${name}&category=${category}&place=${place}&address=${address}&startDate=${startDate}&endDate=${endDate}&type=${type}`)
            .then(this.getEvents, alert("The event was updated"))
            .catch(err => console.error(err))
    }

    getEvent(id) {
        fetch(`http://localhost:4000/events/detail?id=${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    name: data[0].name,
                    category: data[0].category,
                    place: data[0].place,
                    address: data[0].address,
                    startDate: data[0].start_date,
                    endDate: data[0].end_date,
                    type: data[0].type,
                });
            })
            .catch(err => console.error(err))
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };


    render() {
        return (
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
        );
    }
}

export default EventDetail;