const express = require("express");
const cors = require("cors");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mysql = require("mysql");

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const app = express();

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const jwtMW = exjwt({
    secret: 'a'
});


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "asd123456",
    database: "cloud"
});

connection.connect(err => {
    if (err) return err;
});


app.use(cors());


app.get("/API/events", (req, res) => {
    const {email} = req.query;
    const SELECT_ALL_EVENTS_QUERY = `SELECT id,name,category,place,created_at FROM EVENTST WHERE email='${email}' ORDER BY created_at DESC`;
    connection.query(SELECT_ALL_EVENTS_QUERY, (err, results) => {
        if (err) return res.send(err);
        else return res.json(results);
    });
});

app.get("/API/events/detail", (req, res) => {
    const id = parseInt(req.query['id']);
    const email = req.query['email'];
    const GET_DETAIL_QUERY = `SELECT * FROM EVENTST WHERE id=${id} and email='${email}';`;
    connection.query(GET_DETAIL_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        else {
            return res.send(results);
        }
    });
});


app.get("/API/events/add", (req, res) => {
    const {name, category, place, address, startDate, endDate, type, email} = req.query;

    const INSERT_EVENT_QUERY = `INSERT INTO EVENTST(name,category,place,address,start_date,end_date,type, email) VALUES ('${name}', '${category}', '${place}', '${address}', '${startDate}', '${endDate}', '${type}', '${email}');`;
    connection.query(INSERT_EVENT_QUERY, (err, results) => {
        if (err)  {
            return res.send(err);
        }
        else return res.send("Successfully added new event")
    });
});

app.get("/API/events/update", (req, res) => {
    const {id, name, category, place, address, startDate, endDate, type} = req.query;

    const UPDATE_EVENT_QUERY = `UPDATE EVENTST SET name='${name}', category='${category}', place='${place}', address='${address}', start_date='${startDate}', end_date='${endDate}', type='${type}' WHERE id=${id};`;
    connection.query(UPDATE_EVENT_QUERY, (err, results) => {
        if (err) return res.send(err);
        else return res.send("Successfully updated the event")
    });
});

app.get("/API/events/delete", (req, res) => {
    const id = parseInt(req.query['id']);
    const DELETE_EVENT_QUERY = `DELETE FROM EVENTST WHERE id=${id};`;
    connection.query(DELETE_EVENT_QUERY, (err, results) => {
        if (err) return res.send(err);
        else return res.send("Successfully deleted the event")
    });
});

app.post('/API/signup', (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        const INSERT_USER_QUERY = `INSERT INTO USERS(email, password) VALUES ('${email}', '${hash}');`;
        connection.query(INSERT_USER_QUERY, (err, results) => {
            if (err)  {
                return res.send(err);
            }
            else return res.send("Successfully added new user")
        });
    });
});

app.post('/API/log-in', (req, res) => {
    const { email, password } = req.body;

    const GET_USER_QUERY = `SELECT * FROM USERS WHERE email='${email}';`;
    connection.query(GET_USER_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        else {
            const user = results;
            if (!user||!user[0]) res.json(false);
            else {
                bcrypt.compare(password, user[0].password, function(err, result) {
                    if(result === true){
                        console.log("Valid!");
                        let token = jwt.sign({ email: user[0].email }, 'a', { expiresIn: 129600 }); // Signing the token
                        res.json({
                            sucess: true,
                            err: null,
                            token
                        });
                    }
                    else {
                        console.log("Entered Password and Hash do not match!");
                        res.status(401).json({
                            sucess: false,
                            token: null,
                            err: 'Entered Password and Hash do not match!'
                        });
                    }
                });
            }
        }
    });
});

app.listen(8080, () => console.log("Server listening on port 8080"));
