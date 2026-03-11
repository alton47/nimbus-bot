const fs = require("fs");
const path = require("path");

module.exports = {
  name: "upskill",
  description: "Increase a skill bonus for a character",

  execute(message, args) {
    if (args.length < 2) {
      return message.reply("Usage: !upskill <charactername> <skillname>");
    }

    const characterName = args[0];
    const skillName = args[1].toLowerCase();

    const filePath = path.join(
      __dirname,
      "../../character_sheets",
      `${characterName}.json`,
    );

    if (!fs.existsSync(filePath)) {
      return message.reply(`Character ${characterName} not found.`);
    }

    const characterData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!characterData.character_sheet.skills[skillName]) {
      return message.reply(`Skill "${skillName}" does not exist.`);
    }

    characterData.character_sheet.skills[skillName] += 1;

    fs.writeFileSync(filePath, JSON.stringify(characterData, null, 2));

    const newValue = characterData.character_sheet.skills[skillName];

    message.reply(
      `${skillName} increased to ${newValue} for ${characterName}.`,
    );
  },
};
