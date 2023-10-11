const readline = require("readline");
const { addToLog, getRecentLogs } = require("./modules/logger");
const { characters, modifyHP } = require("./modules/characters");
const { clearTerminal } = require("./modules/display");

const colors = [
  "\x1b[31m", // Red
  "\x1b[32m", // Green
  "\x1b[33m", // Yellow
  "\x1b[34m", // Blue
  "\x1b[35m", // Magenta
  "\x1b[36m", // Cyan
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function listHP() {
  const hpList = characters
    .map((c, index) => {
      const color = colors[index % colors.length];
      return `${color}${c.name}\x1b[0m: ${c.HP} HP`;
    })
    .join("\n");
  const recentLogs = getRecentLogs(3);
  console.log(`✦✦✦ Current HP ✦✦✦\n\n${hpList}`);
  console.log(`\n\n✦   Battle Log   ✦\n\n${recentLogs}`);
}

function showHelp() {
  const helpText = `
    izzy's DmToolz 🧠 Battle Tracker
     
    // Initialize players and their HP in characters.json file.
    // Track and modify hit points of all characters in a combat.
    // Saves battle log in a text file.
  
    Available Commands:
    - modify [CharacterName] [Value] [Attacker]: Modifies the HP of a character. Value can be negative.
    - m (modify shorthand).
    - log: Prints the battle log to the console.
    - list: Lists current HP of all characters.
    - help: Shows this help menu.
  `;
  console.log(helpText);
}

clearTerminal();
showHelp();
listHP();

rl.on("line", function (line) {
  const [command, name, valueStr, attacker] = line.split(" ");
  const value = parseInt(valueStr);

  if (command === "modify" || "m") {
    const character = modifyHP(name, value);
    if (character) {
      let actionType = value < 0 ? "attack" : "heal";
      let verb = actionType === "attack" ? "attacked" : "healed";
      addToLog(
        `${attacker} ${verb} ${name}. New HP: ${character.HP}`,
        actionType
      );
    }
  } else if (command === "log") {
    console.log(getRecentLogs(3));
  } else if (command === "help") {
    showHelp();
  } else if (command === "list") {
    listHP();
  } else {
    addToLog("Invalid command");
  }

  clearTerminal();
  showHelp();
  listHP();
}).on("close", function () {
  process.exit(0);
});
