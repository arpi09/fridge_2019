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
    db.run(`CREATE TABLE IF NOT EXISTS fridge (
            id        integer,
            owner     string,

            PRIMARY KEY (id)
    )`)
    db.run(`CREATE TABLE IF NOT EXISTS grocery (
            id        integer,
            name      string,
            weight    int,
            category  string,
            fridgeID,

            PRIMARY KEY (id)
            FOREIGN KEY (fridgeID) REFERENCES Fridge(id)
    )`)
    db.run(`INSERT INTO fridge (owner) VALUES ("Arvid")`)
    db.run(`INSERT INTO grocery (name, weight, category) VALUES ("Milk", 1, "Dairy")`)
    db.run(`INSERT INTO grocery (name, weight, category) VALUES ("Milk2", 1, "Dairy")`)
});

app.get('/api/fridge', (req, res) => {
  db.get("SELECT * FROM fridge", function(err, row){
        res.json(row);
    });
});

app.get('/api/grocery', (req, res) => {
  db.all("SELECT * FROM grocery WHERE category=\"Dairy\"", function(err, row){
        res.json(row);
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
//
// //Route setup
// app.get('/', (req, res) => {
//   res.send('rootadasd route');
// })
//
// //Start server
// app.listen(port, (req, res) => {
//   console.log(`server listening on port: ${port}`)
// });
