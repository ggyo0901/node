import http from "http";
/*
 아무것도 없어도 실행은가능
 오고가는걸 보여주기위해 설정하는것
*/
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTTP 모듈 테스트</title>
    </head>
    <body>
        <h2>HTTP 모듈 테스트</h2>
        <p>처음으로 실행하는 node.js http 서버</p>
    </body>
    </html>
`
  );
});

server.listen(3000, () => {
  console.log("3000번포트로 서버실행중");
});
