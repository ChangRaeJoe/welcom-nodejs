const childProcess = require("child_process");

cmd = "ls -alw";
childProcess.exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error("exec error:", err);
    return;
  }
  console.log("out:", stdout);
  console.log("err:", stderr);
});
