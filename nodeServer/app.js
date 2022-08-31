const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
var crypto = require("crypto");
const path = require("path");
require("dotenv").config(); //환경변수
const port = 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, "../build")));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

app.get("https://byeongchanhan.github.io/home", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  connection.query("SELECT * FROM reference", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
    console.log("The solution is: ", typeof rows);
  });
  // let inputid = "hne1234";
  // let inputPassword = "sksmsdi";
  // const salt = crypto.randomBytes(128).toString("base64");
  // const hashPassword = crypto
  //   .createHash("sha512")
  //   .update(inputPassword + salt)
  //   .digest("hex");

  // connection.query(
  //   "INSERT INTO user(id, password) VALUES(?, ?)",
  //   [inputid, hashPassword],
  //   (err, rows, fields) => {
  //     if (err) throw err;
  //     res.send(rows);
  //     console.log("The solution is: ", rows);
  //   }
  // );
});

app.get("https://byeongchanhan.github.io/abouts", (req, res) => {
  console.log("about page");
  res.send({
    about: true,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`);
});
