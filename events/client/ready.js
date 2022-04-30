require("dotenv").config();
module.exports.run = async (client) => {
  console.log(`[BOT] ${client.user.username} est en ligne`.green);
};
