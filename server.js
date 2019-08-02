const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:')

//Static file declaration
app.use(express.static(path.join(__dirname, 'fridge/public')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'fridge/public')));
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'fridge/public/index.html'));
  })
}

db.serialize(function() {
    db.run("DROP TABLE IF EXISTS users")
    db.run("DROP TABLE IF EXISTS fridges")
    db.run("DROP TABLE IF EXISTS groceries")
    db.run(`CREATE TABLE users (
            name      TEXT,
            email     TEXT NOT NULL,
            password  TEXT,

            fridgeID  INT,

            PRIMARY KEY (email),
            FOREIGN KEY (fridgeID) REFERENCES fridges(id)
    )`)
    db.run(`CREATE TABLE fridges (
            id        INT,
            size      INT,

            PRIMARY KEY (id)
    )`)
    db.run(`CREATE TABLE groceries (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            groceryName TEXT,
            weight      INT,
            category    TEXT,
            expireDate  DATE,

            fridgeID    INT,

            FOREIGN KEY (fridgeID) REFERENCES fridges(id)
    )`)
    db.run(`INSERT INTO fridges (size) VALUES (20)`)
    db.run(`INSERT INTO users (name, email, password, fridgeID) VALUES ("admin@admin.com", "arvid@admin.com", "U2FsdGVkX1+Wzg9xOPC6eanaasKWx4iT9bLltm1sCJc=", 1)`)
    db.run(`INSERT INTO users (name, email, password, fridgeID) VALUES ("Siri", "siri@admin.com", "hejhej", 1)`)
    // db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Milk", 1, "Dairy", 1, "2020-01-01")`)
    // db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k2", 1, "Dairy", 1, "2020-01-01")`)
    // db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Milk2", 2, "Dairy", 1, "2020-01-01")`)
    // db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k32", 10, "Dairy", 1, "2020-01-01")`)
    // db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k32", 1, "Dairy", 1, "2020-01-01")`)
    // db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Milk2", 1, "Meat", 1, "2020-01-01")`)
    // db.run(`INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES ("Mil3k2", 1, "Dairy", 1, "2020-01-01")`)
});

app.post('/api/groceries/:name/:weight/:category/:expiredate/:fridgeID', (req, res) => {
  var params = [req.params.name, req.params.weight, req.params.category, req.params.fridgeID, req.params.expiredate]
  console.log(params)
  var sql = `INSERT INTO groceries (groceryName, weight, category, fridgeID, expireDate) VALUES (?,?,?,?,?)`
  db.run(sql, params, function (err) {
    console.log(this)
    if (err) {
      console.log(err)
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data": this.lastID
    })
  });
});

app.del('/api/groceries/:fridgeID', function(req, res) {
  var params = [req.params.fridgeID]
  console.log(params)
  var sql = `DELETE FROM groceries WHERE id=?`
  db.run(sql, params, function (err, row) {
    console.log(this)
    if (err) {
      console.log(err)
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data": this.lastID
    })
  });
});

app.get('/api/groceries/:id', (req, res) => {
  var params = [req.params.id]
  db.all("SELECT * FROM groceries WHERE fridgeID=?", params, function(err, row){
    console.log(row)
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

app.get("/api/login/:username", (req, res, next) => {
    var params = [req.params.username]
    var sql = `select *
               FROM   users
               WHERE  name=?`
    db.all(sql, params, (err, row) => {
        console.log(row)
        if (err) {
          res.status(400).json({"error":err.message});
          return
        }
        res.json({
            "message":"success",
            "data": row
        })
        return
      });

});

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/fridge/public/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})
