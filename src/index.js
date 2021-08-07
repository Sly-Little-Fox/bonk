require("dotenv").config();
const { CommandoClient } = require("discord.js-commando");
const path = require("path");

const client = new CommandoClient({
  commandPrefix: "-",
  owner: "723971496107573328",
});

client.registry
  .registerDefaultTypes()
  .registerGroups([["bonk", "Bonk"]])
  .registerDefaultGroups()
  .registerDefaultCommands({
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
  console.log("I'm ready!");
});

client.login(process.env.bonk);
