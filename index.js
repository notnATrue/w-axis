let express = require('express');
  
let app = express();

const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

const cookieParser = require('cookie-parser');

let request = require('request');

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
    
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/src'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/index.html')
});

app.get('/course', function(req, res) {
    dates()
    .then(function(dte) {
        return dte;
    })
    .then(function(data) {
        getCourse(data)
        .then(function(fromProm) {
            res.send(fromProm);
        });
    });
});

function dates() {
    return new Promise(function(resolve, reject) {
        let result = {};
        let milliseconds = new Date().getTime();
        let next ;
        for(i = 0; i < 7; i++) {
            if (i === 0) {
                next = milliseconds;
            } else {
                next = next - 86400000;
            };
            let nowDay = new Date(next).getDate();
            let nowMonth = new Date(next).getMonth();
            if (nowMonth.length == '1') {
                nowMonth = "0" + nowMonth;
            }
            let nowYear = new Date(next).getFullYear();
            let fullDate = nowDay + '.' + nowMonth + '.' + nowYear;
            console.log(fullDate)
            result[i] = fullDate;
        };
        resolve(result);
    });
};

function getCourse(date) {
    return new Promise(function(resolve, reject) {
        return Promise.all([requestable(date[0]),requestable(date[1]),requestable(date[2]),requestable(date[3]),requestable(date[4]),requestable(date[5]),requestable(date[6])])
        .then(function(data) {
            resolve(data)
        });
    });
};

function requestable(date) {
    return new Promise(function(resolve, reject) {
        return request('https://api.privatbank.ua/p24api/exchange_rates?json&date=' + date, function(err, res, body) {
            console.log(date)
            console.log(res.body)    
            resolve(res.body)
            });
        })
};

app.listen(port);
