const { MESSAGES } = require("../utils/constants");
const { Modal, TextInputComponent, showModal } = require("discord-modals");
const { MessageButton, MessageActionRow } = require("discord.js");

module.exports.run = async (client, commande, message, args) => {
  const button = new MessageButton()
    .setLabel("Ajouter un nouveau film/série")
    .setStyle("PRIMARY")
    .setCustomId("addFilm");

  const row = new MessageActionRow().addComponents(button);

  message.channel.send({
    content:
      "Cliquer sur le bouton pour ajouter un nouveau film/série en embed :",
    components: [row],
  });

  const modal = new Modal()
    .setCustomId("addFilmForm")
    .setTitle("Film/Série à ajouter")
    .addComponents(
      new TextInputComponent()
        .setCustomId("addFilmTitle")
        .setLabel("Titre du film/série")
        .setStyle("SHORT") //IMPORTANT: 'SHORT' or 'LONG'
        .setMaxLength(256)
        .setPlaceholder("Insérez le titre du film/série")
        .setRequired(true)
    )
    .addComponents(
      new TextInputComponent()
        .setCustomId("addFilmDescription")
        .setLabel("Description du film/série")
        .setStyle("LONG") //IMPORTANT: 'SHORT' or 'LONG'
        .setPlaceholder("Insérez la description du film/série")
        .setRequired(true)
    )
    .addComponents(
      new TextInputComponent()
        .setCustomId("addFilmImage")
        .setLabel("Lien de l'image")
        .setStyle("SHORT") //IMPORTANT: 'SHORT' or 'LONG'
        .setPlaceholder("Insérez le lien de l'image")
        .setRequired(true)
    )
    .addComponents(
      new TextInputComponent()
        .setCustomId("addFilmSalon")
        .setLabel("Salon")
        .setStyle("SHORT") //IMPORTANT: 'SHORT' or 'LONG'
        .setMaxLength(18)
        .setPlaceholder("Insérez l'ID du salon")
        .setRequired(true)
    );

  client.on("interactionCreate", (interaction) => {
    if (interaction.customId === "addFilm") {
      showModal(modal, {
        client: client,
        interaction: interaction,
      });
    }
  });
};

module.exports.help = MESSAGES.COMMANDS.FORM;
