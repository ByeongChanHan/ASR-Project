const express = require("express");
const app = express();
const mysql = require("mysql"); // DB
const session = require("express-session"); // 세션
const FileStore = require("session-file-store")(session); // 세션데이터 저장 공간
const cors = require("cors"); // cors 정책
var crypto = require("crypto"); // 크립토(비밀번호 암호화)
const path = require("path"); // 정적 파일 경로
require("dotenv").config(); //환경변수
const bodyParser = require("body-parser"); // post body 파싱
const port = 3001; //포트번호

app.set("view engine", "ejs");

app.use(cors());
app.use(express.static(path.join(__dirname, "../build")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "made by chan", // 임의의 값을 암호화
    resave: false, // 세션을 항상 저장할지 여부
    saveUninitialized: true, // 초기화 되지 않은채 스토어에 저장되는 세션
    store: new FileStore(), // 데이터 저장 형식
  })
);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

app.get("/home", (req, res) => {
  //로그인 안했을때는 데이터 보여주지 않기 위해 return
  if (req.session.logined !== true) {
    res.send({ islogin: false });
    return;
  }
  res.header("Access-Control-Allow-Origin", "*");
  connection.query("SELECT * FROM reference", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
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

//로그인 POST 요청
app.post("/login", (req, res) => {
  connection.query(
    "SELECT id,password FROM user WHERE id=?",
    [req.body.id],
    (err, rows, fields) => {
      if (err) throw err;
      if (req.body.id === rows[0].id && req.body.pwd === rows[0].password) {
        let resultData = {
          id: req.body.id,
          islogin: true,
        };
        req.session.logined = true;
        req.session.user_id = req.body.id;
        req.session.save((err) => {
          if (err) throw err;
          res.send(resultData);
        });
      } else {
        res.send({ islogin: false });
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//관리자 페이지
app.get("/managements", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  connection.query("SELECT id, tel, birth FROM user", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get("/abouts", (req, res) => {
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
