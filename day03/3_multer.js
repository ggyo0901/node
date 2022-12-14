import express from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";

import upload from "./midleware/multer.js";
import { mkdir } from "./midleware/mkdir.js";

const app = express();
app.set("port", 3000);

const __dirname = path.resolve();
app.use(morgan("dev"), express.json(), express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", express.static(path.join(__dirname, "public")));

mkdir();

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);

  // DB에 파일 경로 저장하는 로직
  // 성공 했다는 메시지
  // 게시글 조회할 때 해당 경로를 DB에서 찾아서 프론트 엔드보냄

  const data = {
    success: "ok",
    data: {
      src: `/uploads/${req.file.filename}`,
    },
  };

  res.status(200).json(data);
});

/* 
upload.single 파일 1개만
upload.field 파일이 여러개일 때
    한 input type file에 파일이 여러개일 때와
    여러개의 input type file이 존재할 때
*/
app.post(
  "/uploads",
  upload.fields([{ name: "image_1" }, { name: "image_2" }]),
  (req, res) => {
    console.log(req.files);
    // console.log(req.files.image_1[0]);
    // console.log(req.files.image_2[0]);
    res.send("ok");
  }
);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 실행 중`);
});
