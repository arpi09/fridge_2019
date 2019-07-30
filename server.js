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
            email     TEXT,
            password  TEXT,

            fridgeID  INT NOT NULL,

            PRIMARY KEY (email),
            FOREIGN KEY (fridgeID) REFERENCES fridges(id)
    )`)
    db.run(`CREATE TABLE fridges (
            id        INT,
            size      INT,

            PRIMARY KEY (id)
    )`)
    db.run(`CREATE TABLE groceries (
            id        INT,
            name      TEXT,
            weight    INT,
            category  TEXT,

            fridgeID  INT NOT NULL,

            PRIMARY KEY (id)
            FOREIGN KEY (fridgeID) REFERENCES fridges(id)
    )`)
    db.run(`INSERT INTO fridges (size) VALUES (20)`)
    db.run(`INSERT INTO users (name, email, password, fridgeID) VALUES ("admin@admin.com", "arvid@admin.com", "135711Ap!", 1)`)
    db.run(`INSERT INTO users (name, email, password, fridgeID) VALUES ("Siri", "siri@admin.com", "hejhej", 1)`)
    db.run(`INSERT INTO groceries (name, weight, category, fridgeID) VALUES ("Milk", 1, "Dairy", 1)`)
    db.run(`INSERT INTO groceries (name, weight, category, fridgeID) VALUES ("Milk2", 1, "Dairy", 1)`)
});

app.get('/api/fridge', (req, res) => {
  db.get("SELECT * FROM fridges", function(err, row){
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

app.get('/api/grocery', (req, res) => {
  db.all("SELECT * FROM groceries", function(err, row){
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

app.get("/api/login/:username/:password", (req, res, next) => {
    var sql = "select password FROM users WHERE name=?"
    var params = [req.params.username]
    db.get(sql, params, (err, row) => {
        console.log(params)
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if (req.params.password === row.password) {
          res.json({
              "message":"success",
              "data": null
          })
        } else {
          res.json({
              "message":"wrong password",
              "data": null
          })
          return;
        }
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
