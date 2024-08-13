const http = require("node:http");
const fs = require("node:fs");
const url = require("url");

const filePath = "./stream.txt";
fs.stat(filePath, (err, stats) => {
    // err
    if (err) {
        console.log(err);
        return;
    }
    for (let i = 1; i < 40; i++) {
        writeToTextFile(filePath, i.toString(10) + "\n");
    }
});

function writeToTextFile(name, data) {
    const fd = fs.createWriteStream(name, {flags: "a"});

    fd.on("open", () => {
        // console.log("open");
    }).on("ready", () => {
        // console.log("ready");
        fd.write(data);

        fd.end();
    });
    console.log("endOfFunc");
}

console.log("endofProgram");
