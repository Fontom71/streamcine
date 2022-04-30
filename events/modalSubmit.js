const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, modal) => {
  if (modal.customId === "addFilmForm") {
    const title = modal.getTextInputValue("addFilmTitle");
    const description = modal.getTextInputValue("addFilmDescription");
    const image = modal.getTextInputValue("addFilmImage");
    const salon = modal.getTextInputValue("addFilmSalon");

    if (!image?.includes("http")) {
      await modal.deferReply({ ephemeral: true });
      modal.followUp({ content: "L'image doit être une URL", ephemeral: true });
      return;
    }
    const channel = modal.message.guild.channels.cache.get(salon);
    if (!channel) {
      await modal.deferReply({ ephemeral: true });
      modal.followUp({
        content: "Le salon n'existe pas, veuillez indiquer le bon ID",
        ephemeral: true,
      });
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`${title}`)
      .setColor("RANDOM")
      .setDescription(`${description}`)
      .setImage(`${image}`)
      .setThumbnail(modal.message.guild.iconURL())
      .setFooter({
        text: "By Streamciné",
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    channel.send({ embeds: [embed] });
    await modal.deferReply({ ephemeral: true });
    modal.followUp({ content: `${title} a été ajouté !`, ephemeral: true });
  }
};
