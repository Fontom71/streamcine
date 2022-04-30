require("dotenv").config();
const prefix = process.env.PRF;

module.exports.run = async (client, message) => {
  // Authorisation du bot //

  if (message.author.bot) return;
  if (message.channel.type === "DM") return;

  if (!message.content.startsWith(prefix)) return;

  // Récupère le nom de la commande dans Discord pour l'executer //

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commande = args.shift().toLowerCase();

  if (!commande) return;

  const cmd =
    client.commands.get(commande) ||
    client.commands.find(
      (a) => a.help.aliases && a.help.aliases.includes(commande)
    );

  if (!cmd) return;

  // Supprime la commande d'entrée //
  message.delete();

  // Vérification des permissions pour la commande //

  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];
  if (message.author.id != process.env.ID_OWNER) {
    if (cmd.help.permissions.length) {
      let invalidPerms = [];
      for (const perm of cmd.help.permissions) {
        if (!validPermissions.includes(perm)) {
          return console.log(`Permission(s) Invalide(s) ${perm}`);
        }
        if (
          !message.guild.members.cache
            .get(message.member.user.id)
            .permissions.has(perm)
        ) {
          invalidPerms.push(perm);
        }
      }
      if (invalidPerms.length) {
        return message.channel
          .send(`Permission(s) Manquante(s): \`${invalidPerms.join(", ")}\``)
          .then((message) => setTimeout(() => message.delete(), 5000));
      }
    }
  }

  // Execution de la commande

  cmd.run(client, commande, message, args);
};
