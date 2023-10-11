const fs = require("fs");

const logDir = "./logs/";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const date = new Date();
const fileName = `${logDir}battleLog_${date.getFullYear()}_${
  date.getMonth() + 1
}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.txt`;

let battleLog = [];

function addToLog(text, actionType) {
  let coloredText = text;

  if (actionType === "attack") {
    coloredText = "\x1b[31m" + text + "\x1b[0m"; // Red for attack
  } else if (actionType === "heal") {
    coloredText = "\x1b[32m" + text + "\x1b[0m"; // Green for heal
  }

  battleLog.push(coloredText);
  fs.appendFileSync(fileName, text + "\n");
}

function getRecentLogs(count) {
  return battleLog.slice(-count).join("\n");
}

module.exports = { addToLog, getRecentLogs };
