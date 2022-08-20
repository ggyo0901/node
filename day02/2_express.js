import express from "express"; //import

const app = express();

app.set("port", 3000); // 변수설정

app.listen(app.get("port"), () => {
  // 서버구동
  console.log(`${app.get("port")}번 포트에서 실행중...`);
});
