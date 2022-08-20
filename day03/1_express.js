import express from "express";
import morgan from "morgan";
import path from "path";

const app = express();
app.set("port", 3000);

//미들웨어
/*
morgan(log)
로그를 찍어줌
모드로는 dev,combined,common,short,tiny
보통 개발용은 dev, 배포용은 combined 사용
*/
app.use(morgan("dev"));

/*
body-parser
express 4.16.0부터 기본내장
데이터 형식허용여부와, req message로 전달받은 body의 데이터의 해석
*/

app.use(express.json()); //json데이터 형식을 읽는 것을 허용
app.use(express.urlencoded({ extended: false }));
//url에 있는 정보를 express 내에 있는 정보를 해석툴로 읽을것이냐
//extended => fasle  //nodeJs에 내장된 querystring 모듈
//extended => true   //추가로 설치하여 외부 해석툴(qs)로 해석

/*
static
express 탑재, 정적인 파일을 제공
*/
const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "public")));

//express static을 사용해서 public에있는 파일을 쓸수있다
//주소가복잡하기떄문에 절대경로(localhost:3000)를 상대경로(public)로 바꿔서 접근한다
// localhost:3000/public/style/style.css
// public/style/style.css

//웹서버에 있는 정적인 파일에 접근하기 위해 사용
// 사용자가 https://www.백엔드주소.com/--> public 폴더로 접근이가능
// https://www.백엔드주소.com/_body.html ---> public 폴더의 _body.html로 접근

//이미지를 백엔드 데이터를 통해서가 아니라 사용자가 바로 웹서버에 접근할 수 있게 해준다는 것

app.listen(app.get("port"), () => {
  //서버구동
  console.log(`${app.get("port")}번으로 서버실행 중`);
});

app.get("/", (req, res) => {
  res.send("hellog");
});

// app.get("/body", (req, res) => {
//   res.sendFile(__dirname + "/_body.html");
// });

app.get("/body", (req, res) => {
  res.sendFile("./public/_body.html");
});
