const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
var passport = require("passport");

const app = express();

const SELECT_ALL_EVENTS_QUERY = "SELECT id,name,category,place,created_at FROM EVENTST ORDER BY created_at DESC";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "asd123456",
    database: "cloud0"
});

connection.connect(err => {
    if (err) return err;
});


app.use(cors());
app.use(passport.initialize());
require("./config/passport");


app.get("/", (req, res) => {
    res.send("Go to /events to see the event list");
});

app.get("/events", (req, res) => {
    connection.query(SELECT_ALL_EVENTS_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        else return res.json(results);
    });
});

app.get("/events/detail", (req, res) => {
    const id = parseInt(req.query['id']);
    const GET_DETAIL_QUERY = `SELECT * FROM EVENTST WHERE id=${id};`;
    connection.query(GET_DETAIL_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.send(results)
        }
    });
});


app.get("/events/add", (req, res) => {
    const {name, category, place, address, startDate, endDate, type} = req.query;

    const INSERT_EVENT_QUERY = `INSERT INTO EVENTST(name,category,place,address,start_date,end_date,type) VALUES ('${name}', '${category}', '${place}', '${address}', '${startDate}', '${endDate}', '${type}');`;
    connection.query(INSERT_EVENT_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        else {
            return res.send("Successfully added new event")
        }
    });
});

app.get("/events/delete", (req, res) => {
    const id = parseInt(req.query['id']);
    const DELETE_EVENT_QUERY = `DELETE FROM EVENTST WHERE id=${id};`;
    connection.query(DELETE_EVENT_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        else {
            return res.send("Successfully deleted the event")
        }
    });
});

app.listen(4000, () => console.log("Server listening on port 4000"));
