import cluser from "cluster";
import {fileURLToPath} from "url"; // 👈 추가
import os from "os";
cluser.setupPrimary({
    exec: "worker.js",
    args: ["--use", "http"],
    silent: false,
});
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const path = __dirname + "img/lol.jpeg";

const cpuNums = os.cpus().length > 2 ? 2 : 1;
console.log(cpuNums);
for (let i = 0; i < cpuNums; i++) {
    const worker = cluser.fork();

    worker
        .on("listening", () => {
            console.log("listening");
        })
        .on("message", (msg) => {
            console.log("onProcess:", msg);
        })
        .on("error", (err) => {
            console.error(err);
        })
        .on("exit", (code, sig) => {
            console.log(code, sig);
        });
}
