const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (bot, message, args) => {
  const { channel } = message.member.voice;
  if (!channel) {
    return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    return message.channel.send("Herhangi bir şarkı oynatmıyorum.");
  }

  message.channel.send(`
    **Oynatılan Şarkı - \`${serverQueue.songs[0].title}\`
  **`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çalan"],
  permLevel: 0
};
exports.help = {
  name: "np",
  description: "",
  usage: ""
};
