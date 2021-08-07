const { Command } = require("discord.js-commando");
const micromatch = require("micromatch");

module.exports = class BonkCommand extends Command {
  constructor(client) {
    super(client, {
      name: "bonk",
      aliases: ["ban", "banana"],
      group: "bonk",
      memberName: "bonk",
      description: "Bonk",
      guildOnly: true,
      userPermissions: ["BAN_MEMBERS"],
      clientPermissions: ["BAN_MEMBERS"],
      args: [
        {
          key: "glob",
          prompt: "Who would you like to bonk?",
          type: "string",
        },
        {
          key: "reason",
          type: "string",
          prompt: "Bonk",
          default: "",
        },
      ],
    });
  }
  async run(message, { glob, reason }) {
    const members = await message.guild.members.fetch();
    const toBan = members.filter((m) =>
      micromatch.isMatch(m.user.username, glob)
    );
    let errors = 0;
    message.say("Bonking...");
    toBan.forEach((m) => {
      try {
        m.ban({
          reason: reason || `Requested by ${message.author.tag}`,
        }).catch(() => errors++);
      } catch {
        errors++;
      }
    });
    if (errors > 0) {
      message.say(`Operation completed with ${errors} errors :warning:`);
    } else {
      message.say("Operation completed successfully! :tada:");
    }
  }
};
