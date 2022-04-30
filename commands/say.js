const { MESSAGES } = require("../utils/constants");

module.exports.run = async (client, commande, message, args) => {
  if (!args.length)
    return message.channel.send(
      `> Usage : ${process.env.PRF + this.help.name} #salon [message]`
    );

  const channel = message.mentions.channels.first();
  if (!channel) return message.channel.send("Veuillez indiquer un salon");

  let messageToBot = args.slice(1).join(" ");
  if (!messageToBot[0])
    return message.channel.send("Veuillez indiquer un message");

  let file = message.attachments.first()?.url;
  if (file) {
    channel.send({
      content: messageToBot,
      files: [
        {
          attachment: file,
          name: "file.png",
          description: "",
        },
      ],
    });
  } else {
    channel.send(messageToBot);
  }
};

module.exports.help = MESSAGES.COMMANDS.SAY;
