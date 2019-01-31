import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import EventDetail from "./components/EventDetail";
import Home from "./components/Home";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/events" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/events/:id" component={EventDetail} />
                </Switch>
            </MuiThemeProvider>
        </BrowserRouter>
    ,
    document.getElementById("root")
);