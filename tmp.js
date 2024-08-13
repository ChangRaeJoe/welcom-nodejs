//https://www.acmicpc.net/problem/9086
// 케이스입력 -> 문자열 입력 -> 첫자,마지막자 출력 -> 2번으로 or 끝
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let caseNumber = 0;
let words = [];
rl.question("", (answer) => {
    caseNumber = Number.parseInt(answer);
    rl.pause();
});
for (let i = 0; i < caseNumber; i++) {
    rl.question("", (answer) => {
        words.push(answer);
        rl.pause();
    });
}
rl.on("line", (input) => {
    console.log(`Received: ${input}`);
});
