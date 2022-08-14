import fs from "fs";
let text = null;

const fsPromise = fs.promises;
//동기
try {
  text = fs.readFileSync("./text1.txt", "utf-8");
  console.log(text);
} catch (err) {
  console.log("파일 읽기 실패");
} finally {
  console.log("결과 값과 상관없이 실행");
}

//비동기
fs.readFile("./text2.txt", "utf-8", (err, data) => {
  if (data) {
    console.log(data);
  } else {
    console.log(err);
  }
});

fsPromise
  .readFile("./text1.txt", "utf-8")
  .then((result) => console.log(result)) //성공 후 실행 할 내용
  .catch((err) => {
    console.log(err); //실패시 실행할 내용
  });
