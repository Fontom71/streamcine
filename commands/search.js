const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");
const { MESSAGES } = require("../utils/constants");

module.exports.run = async (client, commande, message, args) => {
  let embed = new MessageEmbed()
    .setTitle("🎥 Rechercher un film/série")
    .setDescription("Voici la liste des films/séries disponibles :")
    .addField(
      "🔎 Rechercher un film",
      "Cliquez sur le bouton ci-dessous pour trouver le film que vous souhaitez."
    )
    .addField(
      "🔎 Rechercher une série",
      "Cliquez sur le bouton ci-dessous pour trouver la série que vous souhaitez."
    )
    .setColor("#0099ff")
    .setThumbnail(message.guild.iconURL())
    .setFooter({
      text: "By Streamciné",
      iconURL: client.user.displayAvatarURL(),
    })
    .setTimestamp();

  let buttonSearchFilm = new MessageButton()
    .setLabel("🔎 Rechercher un film")
    .setStyle("PRIMARY")
    .setCustomId("searchFilm");
  let buttonSearchSerie = new MessageButton()
    .setLabel("🔎 Rechercher une série")
    .setStyle("PRIMARY")
    .setCustomId("searchSerie");

  const row = new MessageActionRow()
    .addComponents(buttonSearchFilm)
    .addComponents(buttonSearchSerie);

  message.channel.send({ embeds: [embed], components: [row] });
};

module.exports.help = MESSAGES.COMMANDS.SEARCH;
