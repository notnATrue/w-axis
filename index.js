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

//mySql

var mysql      = require('mysql');
var connection = mysql.createConnection({
    database : 'users',
    host     : 'localhost',
    user     : 'root',
    password : ''
});

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     connection.query("CREATE DATABASE users", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

// connection.end();

// connection.connect(function(err) {  
//     if (err) throw err;  
//     console.log("Connected!");  
//     var sql = "CREATE TABLE employees (id INT, name VARCHAR(255), age INT(3), city VARCHAR(255))";  
//     connection.query(sql, function (err, result) {  
//     if (err) throw err;  
//     console.log("Table created");  
//     });  
// });  


// connection.query('SELECT * FROM employees', (error, result) => {
//     if (error) throw error;
//     console.log(result)
// });


// return id < 20
let arr = [];

function createArray() {
    for (i = 0; i <= 20; i++) {
        arr.push(i)
    };
    return arr;
};

createArray();

let res = '(';
function createIdMap() {
    
    for (i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            res += arr[i];
        } else {
            res += arr[i] + ',';
        }
    };
    res += ')';
    return res;
}

createIdMap();


  connection.query( "select * from employees where id IN " + res  , function( err_user, result_user ) { 
      console.log(result_user);
  });

// end return id < 20

// create users

// function createUserPool() {
//     return new Promise(function(resolve, reject) {
//         let userPool = [];
//         let defaultName = 'tony'
//         for (i = 0; i <= 49; i++) {
//             userPool[i] = {
//                 id : i,
//                 name : defaultName + i,
//                 age : i,
//                 city : 'Kiev'
//             };
//         };
//         console.log(userPool)
//         resolve(userPool);
//     });
// };

// function createUsers(users_) {
//     let pool = []
//     users_.forEach(function(item) {
//         pool.push(create(item))
//     })
//     return Promise.all(pool)
//     .then(() => console.log('all users added')) 
// };

// function create(user) {
//     return new Promise(function(resolve, reject) {
//     connection.query("INSERT INTO employees (id, name, age, city) VALUES(" + "'" + user.id + "'" + 
//     ", " + "'" + user.name + "'" + 
//     ", " + "'" +user.age + "'" + 
//     ", " + "'" + user.city + "'" + ")",function(err) {
//         if (err) throw err;
//         else resolve();
//     });
// });
// }

// createUserPool()
// .then( users => createUsers(users))
// .catch(err => { if (err) throw err;});

// end of users creating



//privatbank

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
