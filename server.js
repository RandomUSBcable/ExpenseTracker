const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "expense_tracker"
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add route handlers
app.get("/track", (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
  
});

// Add error handling for app.listen
app.listen(8081, (err) => {
  if (err) {
    console.error("error starting server:", err);
    return;
  }
  console.log("Listening...");
});