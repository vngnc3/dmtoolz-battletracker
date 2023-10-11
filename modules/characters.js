let rawdata = require("fs").readFileSync("characters.json");
let characters = JSON.parse(rawdata).characters;

function modifyHP(name, value) {
  const character = characters.find((c) => c.name === name);
  if (character) {
    character.HP += value;
    character.HP = Math.max(0, character.HP); // HP can't go below 0
  }
  return character;
}

module.exports = { characters, modifyHP };
