const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.sqlite')
let jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
let config = require('./config')
let middleware = require('./middleware')

app.use(express.static(path.join(__dirname, 'fridge/build')))

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, "fridge/build/index.html"))
// })

// db.serialize(function() {
//     db.run("DROP TABLE IF EXISTS users")
//     db.run("DROP TABLE IF EXISTS fridges")
//     db.run("DROP TABLE IF EXISTS groceries")
//     db.run("DROP TABLE IF EXISTS fridgesHistory")
//     db.run(`CREATE TABLE IF NOT EXISTS users (
//             name      TEXT,
//             email     TEXT NOT NULL,
//             password  TEXT,
//
//             fridgeID  INT,
//
//             PRIMARY KEY (email),
//             FOREIGN KEY (fridgeID) REFERENCES fridges(id)
//     )`)
//     db.run(`CREATE TABLE IF NOT EXISTS fridges (
//             id        INT,
//             size      INT,
//
//             PRIMARY KEY (id)
//     )`)
//     db.run(`CREATE TABLE IF NOT EXISTS groceries (
//             id          INTEGER PRIMARY KEY AUTOINCREMENT,
//             groceryName TEXT,
//             weight      INT,
//             category    TEXT,
//             expireDate  DATE,
//
//             fridgeID    INT,
//
//             FOREIGN KEY (fridgeID) REFERENCES fridges(id)
//     )`)
//     db.run(`CREATE TABLE IF NOT EXISTS fridgesHistory (
//             id          INTEGER PRIMARY KEY AUTOINCREMENT,
//             y           INT,
//             x           DATE,
//
//             fridgeID    INT,
//
//             FOREIGN KEY (fridgeID) REFERENCES fridges(id)
//     )`)
//     db.run(`INSERT INTO fridges (size) VALUES (20)`)
//     db.run(`INSERT INTO users (name, email, password, fridgeID) VALUES ("Arvid", "admin@admin.com", "135711Ap!", 1)`)
//     db.run(`INSERT INTO users (name, email, password, fridgeID) VALUES ("Siri", "siri@admin.com", "hejhej", 1)`)
//     db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Milk", 1, "Dairy", 1, "2020-01-01")`)
//     db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k2", 1, "Dairy", 1, "2020-01-01")`)
//     db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Milk2", 2, "Dairy", 1, "2020-01-01")`)
//     db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k32", 10, "Dairy", 1, "2020-01-01")`)
//     db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k32", 1, "Dairy", 1, "2020-01-01")`)
//     db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Milk2", 1, "Meat", 1, "2020-01-01")`)
//     db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k2", 1, "Dairy", 1, "2020-01-01")`)
//
//     db.run(`INSERT INTO fridgesHistory (y, x, fridgeID) VALUES (1, datetime('now'), 1)`)
//     db.run(`INSERT INTO fridgesHistory (y, x, fridgeID) VALUES (2, datetime('now'), 1)`)
//     db.run(`INSERT INTO fridgesHistory (y, x, fridgeID) VALUES (3, datetime('now'), 1)`)
//     db.run(`INSERT INTO fridgesHistory (y, x, fridgeID) VALUES (4, datetime('now'), 1)`)
//     db.run(`INSERT INTO fridgesHistory (y, x, fridgeID) VALUES (5, datetime('now'), 1)`)
//     db.run(`INSERT INTO fridgesHistory (y, x, fridgeID) VALUES (6, datetime('now'), 1)`)
//     db.run(`INSERT INTO fridgesHistory (y, x, fridgeID) VALUES (7, datetime('now'), 1)`)
// });




app.post('/api/groceries/:name/:weight/:category/:expiredate/:fridgeID', (req, res) => {
  var params = [req.params.name, req.params.weight, req.params.category, req.params.fridgeID, req.params.expiredate]
  var sql = `INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES (?,?,?,?,?)`
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message": "success",
        "data": this.lastID
    })
  });
});

app.get('/api/history/:id', (req, res) => {
  var params = [req.params.id]
  db.all("SELECT x, y FROM fridgesHistory WHERE fridgeID=?", params, function(err, row){
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message": "success",
        "data":row
    })
  });
});

app.delete('/api/groceries/:fridgeID', function(req, res) {
  var params = [req.params.fridgeID]
  var sql = `DELETE FROM groceries WHERE id=?`
  db.run(sql, params, function (err, row) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data": this.lastID
    })
  });
});

app.get('/api/groceries/:id', middleware.checkToken, (req, res) => {
  // let token = req.headers['authorization']; // Express headers are auto converted to lowercase
  // if (token.startsWith('Bearer ')) {
  //   // Remove Bearer from string
  //   token = token.slice(7, token.length);
  // }
  // console.log("-----------")
  // console.log(token)
  // console.log("-----------")
  // if (token) {
  //   jwt.verify(token, config.secret, (err, decoded) => {
  //     if (err) {
  //       return res.json({
  //         success: false,
  //         message: 'Token is not valid'
  //       });
  //     } else {
  //       req.decoded = decoded;
  //       return
  //     }
  //   });
  // } else {
  //   return res.json({
  //     success: false,
  //     message: 'Auth token is not supplied'
  //   });
  // }
  var params = [req.params.id]
  db.all("SELECT * FROM groceries WHERE fridgeID=?", params, function(err, row){
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":row
    })
  });
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.use(express.json());

app.post("/api/login", (req, res, next) => {
    console.log(process.env.JWT)
    var params = [req.body.username]
    let username = req.body.username
    let password = req.body.password

    var sql = `select *
               FROM   users
               WHERE  email=?`
    db.all(sql, params, username, password, (err, row) => {
      if (username && password) {
        if (username === row[0].email && password === row[0].password) {
          let token = jwt.sign({username: username},
            process.env.JWT,
            { expiresIn: '5s'
            }
          )
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          })
        } else {
          res.json({
            success: false,
            message: 'Incorrect username or password'
          })
        }
      } else {
        res.json({
          success: false,
          message: 'Authentication failed! Please check the request'
        })
      }
    })
})


//build mode
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/fridge/build/index.html'));
})

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname+'/fridge/build/index.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname+'/fridge/build/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})
