import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();

app.set("port", 3000);
app.use(cookieParser("secret"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//기본셋팅
app.post("/setcookie", (req, res, next) => {
  try {
    res.cookie(
      "token",
      {
        token: "token",
        expired: 5 * 60000,
      },
      {
        maxAge: 5 * 60000,
        // httpOnly: true,
        // secure: true,
        //httpOnly,secure,signed 보안설정들
        //signed:true,암호화된 쿠키
        //secure:true,https에서만 사용이가능
        //httpOnly:true,웹서버를 통해서만 사용이가능
      }
    );
    res.send({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    next(err); //err 들어가면 에러핸들러가작동하고 err안들어가면 다음 미들웨어를 실행하게된다
  }
});

app.get("/showcookie", (req, res) => {
  res.send(req.cookies.token);
}); //쿠키가 제대로전달되는지 확인하는 로직

app.post("/clearcookie", (req, res) => {
  res.clearCookie("token");
  res.send({
    message: "success",
  });
});

/*jwt token*/

app.post("/jwtsetcookie", (req, res, next) => {
  try {
    const token = jwt.sign(
      { email: req.body.email },
      process.env.SECRET_JWT_TOKEN_KEY
    );

    res.cookie("access_token", token, { httpOnly: true });
    res.send({ message: "성공" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/jwtshowcookie", (req, res) => {
  const token = req.cookies.access_token;
  res.send(req.cookies.access_token);
}); //쿠키가 제대로전달되는지 확인하는 로직

//server
app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번으로 서버실행중`);
});
