import express from "express";
import db from "./models/index.js";
import user from "./routes/userRouters.js";
const app = express();
app.set("port", 3000);

db.sequelize
  .sync()
  .then(() => {
    console.log("DB연결에 성공하였습니다");
  })
  .catch((err) => console.log(err));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", user);
app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 서버 실행중`);
});