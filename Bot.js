const { Client, Collection } = require("discord.js");
require("dotenv").config();
// Dépendances accès fichiers
const { readdir, statSync } = require("fs");
const path = require("path");

// Couleur dans la console
var colors = require("colors");
const discordModals = require("discord-modals");
colors.enable();

module.exports = class Bot extends Client {
  constructor() {
    super({
      intents: [
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "GUILD_PRESENCES",
        "GUILD_SCHEDULED_EVENTS",
        "GUILD_VOICE_STATES",
        "GUILD_WEBHOOKS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
      ],
      partials: ["MESSAGE", "CHANNEL", "REACTION"],
    });

    discordModals(this);

    this.commands = new Collection();

    void this.start();
  }

  start() {
    //Enregistrement des commandes
    void this.loadCommands();

    //Enregistrement des événements
    void this.loadEvents();

    //Connection API Discord
    void this.login(process.env.TOKEN);
  }

  //Enregistrement des commandes
  async loadCommands(filePath = path.join(__dirname, "./commands"), folder) {
    readdir(filePath, (err, files) => {
      if (err) return console.log(err);
      if (!files) return console.log('Aucun dossier nommé "commands"');

      for (let i = 0; i < files.length; i++) {
        if (statSync(path.join(filePath, files[i])).isDirectory()) {
          this.loadCommands(path.join(filePath, files[i]), files[i]);
        } else {
          const command = require(path.join(filePath, files[i]));
          this.commands.set(command.help.name, command);
          console.log("[CMD] ".blue + command.help.name);
        }
      }
    });
  }

  //Enregistrement des événements
  async loadEvents(filePath = path.join(__dirname, "./events"), folder) {
    readdir(filePath, (err, files) => {
      if (err) return console.log(err);
      if (!files) return console.log('Pas de dossier nommé "events"');

      for (let i = 0; i < files.length; i++) {
        if (statSync(path.join(filePath, files[i]), files[i]).isDirectory()) {
          this.loadEvents(path.join(filePath, files[i]), files[i]);
        } else {
          const event = require(path.join(filePath, files[i]));
          const evtName = files[i].split(".")[0];
          this.on(evtName, (...args) => event.run(this, ...args));
          console.log("[EVENT] ".yellow + evtName);
        }
      }
    });
  }
};
