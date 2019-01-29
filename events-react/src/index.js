import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Route, Switch, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import blue from "@material-ui/core/colors/blue";
import Login from "./components/Login";
import EventDetail from "./components/EventDetail";

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Link to={"/"} style={{ textDecoration: 'none', color:'inherit' }}>
                            <Typography variant="h4" color="inherit">
                                Events
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/events/:id" component={EventDetail} />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    </MuiThemeProvider>
    ,
    document.getElementById("root")
);