import fs from "fs";

const fsPromise = fs.promises;
// const fs = require("fs");
//nodeJS 기본지원 라이브러리(모듈),react에 import 같은것
// const fsProise = require("fs").promises;
//promises쓸수있는
const data = "going going";

//비동기식1
fs.writeFile("./text1.txt", data, "utf-8", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("파일이 정상적으로 저장되었습니다");
  }
});

//비동기식2
fsPromise
  .writeFile("./text2.txt", data, "utf-8")
  .then(() => {
    console.log("성공");
  })
  .catch((err) => {
    console.log(err);
  });

//동기
try {
  fs.writeFileSync("./text3.txt", data, "utf-8");
} catch (err) {
  console.log(err);
}
