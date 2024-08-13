import fs from "fs";
import http from "http";
import {exit} from "process";

// process.send()
// 마스터로부터 메시지 받음

const server = http.createServer((req, res) => {
    let imgExt = "";
    console.log(process.pid);
    res.writeHead(200, `text/plain`);
    res.end("hello worker", "utf-8");
});
server.listen(8000, () => {
    console.log(process.pid, "시작");
});
