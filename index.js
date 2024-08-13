const http = require("node:http");
const fs = require("node:fs");
const url = require("url");

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  if (req.method === "GET") {
    const chunks = [];
    if (path === "/") {
      const rs = fs.createReadStream(__dirname + "/index.html");
      rs.on("readable", () => {
        let chunk;
        while (null !== (chunk = rs.read())) {
          chunks.push(chunk);
        }
      });
      rs.on("end", () => {
        const content = chunks.join("");
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(content, "utf-8");
      });
      rs.on("error", (err) => {
        res.writeHead(500, {"Content-type": "text/html"});
        res.end("Error", "utf-8");
      });
    } else if (path === "/dump.json") {
      // 랜덤한 주사위 숫자를 json으로 제공한다
      const diceNumber = {
        number: getDice(),
      };
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify(diceNumber));
    } else if (path === "/info") {
      const ip =
        req.headers["x-forwarded-for"] || req.headers.host.split(":")[0];
      console.log(ip);
      res.writeHead(200, {"Content-type": "text/plain"});
      res.end("Info");
    } else if (path === "/samepleImg") {
      let rs = fs.createReadStream(__dirname + "/samplelotto.png");
      const chunks = [];
      rs.on("readable", () => {
        let chunk;
        while (null !== (chunk = rs.read())) {
          chunks.push(chunk);
        }
      });
      rs.on("end", () => {
        const content = chunks.join("");
      });
      rs.on("error", (err) => {
        res.writeHead(500, {"Content-type": "text/html"});
        res.end("Error", "utf-8");
      });
    } else if (path.search(/^[/]img[/][a-zA-Z0-9]+[.][a-zA-Z]+$/) !== -1) {
      // 경로 확인 - 파일존재 확인 - 파일열기핸들확인 - 파일열기 - 읽기 - 닫기
      if (!fs.existsSync(`.${path}`)) {
        res.statusCode = 404;
        res.setHeader("Content-type", "text/plain");
        res.end("Not found");
        return;
      }
      const rs = fs.createReadStream(`.${path}`);
      let chunks = "";
      rs.setEncoding("binary");

      rs.on("open", () => {
        console.log("open");
      })
        .on("data", (chunk) => {
          chunks += chunk;
          console.log("data");
        })
        .on("end", () => {
          console.log("end");
          res.writeHead(200, {"Content-type": "image/png"});
          res.end(chunks, "binary");
        })
        .on("error", (err) => {
          res.writeHead(500, {"Content-type": "text/html"});
          res.end("Error", "utf-8");
        });
    } else {
      res.writeHead(404, {"Content-type": "text/html"});
      res.end("Not found img file", "utf-8");
    }
  }
  //server scope
});

server.listen(port, hostname, () => {
  console.log(`Server running start: ${new Date()}`);
});

// functions
function getDice(min = 1, max = 6) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
