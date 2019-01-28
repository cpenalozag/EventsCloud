const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_EVENTS_QUERY = "SELECT * FROM EVENTS";

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

app.get("/", (req, res) => {
    res.send("Go to /events to see the event list");
});

app.get("/events", (req, res) => {
    connection.query(SELECT_ALL_EVENTS_QUERY, (err, results) => {
        if (err) return res.send(err);
        else return res.json(results);
    });
});

app.get("/events/add", (req, res) => {
    const {name, category, place, address, startDate, endDate, type} = req.query;
    console.log(name, category, place, address, startDate, endDate, type);

    const INSERT_EVENT_QUERY = `INSERT INTO EVENTS(name,category,place,address,start_date,end_date,type) VALUES ('${name}', '${category}', '${place}', '${address}', '${startDate}', '${endDate}', '${type}');`;
    connection.query(INSERT_EVENT_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.send("Successfully added new event!")
        }
    });
});

app.listen(4000, () => console.log("Server listening on port 4000"));
