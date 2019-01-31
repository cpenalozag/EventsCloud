import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import axios from 'axios';

import AuthHelperMethods from './AuthHelperMethods';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        textAlign: 'center'
    },
    avatar: {
        margin: 'auto',
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function TabContainer(props) {
    return (
        <span  style={{ padding: 8 * 3 }}>
            {props.children}
        </span>
    );
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            value: 0,
            email: "",
            password: ""
        };
    }

    Auth = new AuthHelperMethods();

    componentDidMount() {
        if(this.Auth.loggedIn()){
            this.props.history.push('/')
        }
    }

    handleLogin = e => {
        e.preventDefault();
        /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                if (res === false) {
                    return alert("Sorry those credentials don't exist!");
                }
                this.props.history.replace("/");
            })
            .catch(err => {
                alert(err);
            });
    };

    handleSignup = e => {
        e.preventDefault();

        //Add this part right here
        axios.post("http://localhost:4000/signup", {
            email: this.state.email,
            password: this.state.password
        }, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(data => {
                console.log("a",data);
                alert("The account was created successfully!");
                this.props.history.replace("/login");
            })
            .catch(err => {
                alert("There was an error creating your account");
            });
    };

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handleChange = (e) => {

        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )

        console.log(this.state);
    }

    render() {
        console.log(this.state)
        const { value } = this.state;
        return (
            <main className={this.classes.main}>
                <CssBaseline />
                <Paper className={this.classes.paper}>
                    <Tabs value={value} onChange={this.handleTabChange}>
                        <Tab label="Log In" />
                        <Tab label="Sign Up" />
                    </Tabs>
                    {value === 0 && <TabContainer>
                        <Avatar className={this.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <form className={this.classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                            </FormControl>
                            <Button
                                onClick={this.handleLogin}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.classes.submit}
                            >
                                Log in
                            </Button>
                        </form>
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        <Avatar className={this.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <form className={this.classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                            </FormControl>
                            <Button
                                onClick={this.handleSignup}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.classes.submit}
                            >
                                Sign Up
                            </Button>
                        </form>
                    </TabContainer>}
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(SignIn);