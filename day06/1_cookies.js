import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
app.set("port", 3000);
app.use(cookieParser("secret"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

/** 기본 쿠키설정 */
app.post("/setcookie", (req, res, next) => {
    try {
        res.cookie(
            "token",
            { token: "token", expired: 5 * 60000 },
            {
                // signed: true, 암호화 된 쿠키, cookieParser()안에 암호화 키 등록
                // secure: https에서만 사용이 가능
                // httpOnly: 웹 서버를 통해서만 사용이 가능
                httpOnly: true,
                maxAge: 5 * 60000,
            }
        );
        res.send({ message: "success" });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

app.get("/showcookie", (req, res) => {
    console.log(req.cookies.token);
    // res.send(req.signedCookies.token) signed: true의 경우
    res.send(req.cookies.token);
});

app.post("/clreacookie", (req, res) => {
    res.clearCookie("token");
    res.send({ message: "success" });
});

/** jwt token */
app.post("/jwtSetcookie", (req, res, next) => {
    try {
        const token = jwt.sign(
            { email: req.body.email },
            process.env.SECRET_JWT_TOKEN_KEY
        );
        res.cookie("access_token", token, { httpOnly: true });
        res.header("authorize", token);
        res.send({ message: "success" });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

app.get("/jwtShowcookie", (req, res) => {
    const token = req.cookies.access_token;
    // console.log(jwt.verify(token, 복화화 키)); // 복호화키, 정상적인 토큰인지 검사
    // console.log(jwt.decode(token)) //복호화 키 없이 해석
    res.send(req.cookies.access_token);
});

/** server */

app.listen(app.get("port"), () => {
    console.log(`${app.get("port")}번으로 서버 실행 중`);
});
