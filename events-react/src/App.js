import React, {Component} from 'react';

import './App.css';
import { Redirect } from "react-router-dom";

import withAuth from './components/withAuth';


class App extends Component {


    render() {
        return (
            <div className="App">
                {this.props.history.location.pathname === "/" ? <Redirect to="/events"/> : null}
            </div>
        );
    }
}

export default withAuth(App);