//#region 
const express = require('express')
const app = express()
const request = require('request');
const googlePlaces = require('googleplaces');
const GooglePlaces = require('node-googleplaces');

const places = new GooglePlaces('AIzaSyDuS_9bipbVGNIOMak9D29PxzHp2V8vAok');

app.listen(3000, () => {
    console.log('Start server at port 3000.')
})
//#endregion

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var https = require('follow-redirects').https;

var query;

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/Scg', (req, res, next) => {
    res.send("SCG");
})

app.get('/findPlaces', (req, res, next) => {

    const params = {
        type: ['restaurant'],
        location: '13.828253 , 100.52845070000001',
        radius: 1000
    };

    places.nearbySearch(params, (err, response) => {
        res.send(response.body);
    });

})

app.get('/GetHistory', (req, res) => {

    var sql = require("mssql");

    var config = {
        user: 'phrompong',
        password: 'Kaerkgcd39',
        server: '203.151.47.84',
        database: 'TunnerConcepthTH'
    };

    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT * FROM HistorySCG', function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

            sql.close();

        });
    });

})

app.get('/SaveHistory', (req, res) => {

    var sql = require("mssql");

    var config = {
        user: 'phrompong',
        password: 'Kaerkgcd39',
        server: '203.151.47.84',
        database: 'TunnerConcepthTH'
    };

    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT * FROM HistorySCG', function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

            sql.close();

        });
    });

})

app.get('/find', (req, res) => {


    var data = ["X", "5", "9", "15", "23", "Y", "Z"];

    var result = [];

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {

            if (data[i].toLowerCase() == "x" || data[i].toLowerCase() == "y" || data[i].toLowerCase() == "z") {
                result.push(data[i]);
            }
        }
    } else {
        result.push("No value");
    }

    res.send(result);

})



