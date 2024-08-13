import {Server} from "http";
import url from "url";
import cluster from "cluster";
import os from "os";

if (cluster.isPrimary) {
    let numReqs = 0;
    setInterval(() => {
        console.log("numReqs = ", numReqs);
    }, 1000);

    const msgHandler = (msg) => {
        if (msg.cmd && msg.cmd === "notifyRequest") {
            console.log("noti");
            numReqs += 1;
        }
    };
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs - 1; i++) {
        cluster.fork();
        console.log("new fork!");
    }
    Object.keys(cluster.workers).forEach((id) => {
        cluster.workers[id].on("message", msgHandler);
    });
} else {
    Server((req, res) => {
        res.writeHead(200);
        res.end("hello world\n");

        process.send({cmd: "notifyRequest"});
    }).listen(8000);
}
