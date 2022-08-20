import express from "express";
import morgan from "morgan";
import multer from "multer";

import fs from "fs";
import path from "path";

const app = express();
app.set("port", 3000);

app.use(morgan("dev"), express.json(), express.urlencoded({ extended: false }));
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", express.static(path.join(__dirname, "public")));

//
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads"); //도착지 설정 done(err,폴더명)
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      //파일이름의 확장자명
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // 확장자를 제외한 파일명 + 현재시간 +확장자명
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  //기준은 byte 5MB
});
//

try {
  fs.readdirSync("uploads");
} catch (err) {
  fs.mkdirSync("uploads/");
}
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
}); //폴더자동으로 만드는 로직

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번으로 연결`);
});
