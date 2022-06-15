const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../utils/constants");

module.exports.run = async (client, commande, message, args) => {
  if (!args.length)
    return message.channel.send(
      `> Usage : ${
        process.env.PRF + this.help.name
      } #salon [titre] | [description] (+ une image en pièce jointe)`
    );

  const channel = message.mentions.channels.first();
  if (!channel) return message.channel.send("Veuillez indiquer un salon");

  let messageToBot = args.slice(1).join(" ").split(" | ");
  if (!messageToBot[0])
    return message.channel.send("Veuillez indiquer un message");
  let file = message.attachments.first()?.url;

  if (messageToBot.length > 2)
    return message.channel.send(
      "Tu as entré des informations en trop, vérifie ton message !"
    );
  if (messageToBot[0].length > 256)
    return message.channel.send("Le titre est trop long !");

  const Sembed = new MessageEmbed()
    .setTitle(messageToBot[0])
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL())
    .setFooter({
      text: "By Streamciné",
      iconURL: client.user.displayAvatarURL(),
    })
    .setTimestamp();
  if (messageToBot.length >= 2) {
    Sembed.setDescription(messageToBot[1]);
  }
  if (file) {
    Sembed.setImage(file);
  }
  await channel.send({ embeds: [Sembed] });
  message.channel.send("Message envoyé !").then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, 5000);
  });
};

module.exports.help = MESSAGES.COMMANDS.EMBED;
