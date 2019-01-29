import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

class AddEvent extends Component {
    render() {
        return (
            <div className="jumbotron">

                <div className="container">
                    <h2>Add a new event</h2>
                    <Grid container justify="space-around">
                        <FormControl>
                            <TextField
                                label="Name"
                                name={"name"}
                                value={this.props.name}
                                onChange={this.props.handleChange}
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={this.props.category}
                                name={"category"}
                                onChange={this.props.handleChange}
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
                                value={this.props.place}
                                onChange={this.props.handleChange}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                name={"address"}
                                label="Address"
                                value={this.props.address}
                                onChange={this.props.handleChange}
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel>Type</InputLabel>
                            <Select
                                name={"type"}
                                value={this.props.type}
                                onChange={this.props.handleChange}
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
                                value={this.props.startDate}
                                onChange={this.props.handleChange}
                            />
                            <TimePicker
                                label="Start Time"
                                name="startDate"
                                value={this.props.startDate}
                                onChange={this.props.handleChange}
                            />
                            <DatePicker
                                label="End Date"
                                name={"endDate"}
                                value={this.props.endDate}
                                onChange={this.props.handleChange}
                            />
                            <TimePicker
                                label="End Time"
                                name={"endDate"}
                                value={this.props.endDate}
                                onChange={this.props.handleChange}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>

                <br/>

                <button onClick={this.props.addEvent} className="btn btn-primary">
                    Create
                </button>

            </div>
        );
    }
}

export default AddEvent;