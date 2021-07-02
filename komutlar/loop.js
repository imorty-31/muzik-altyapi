const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (bot, message, args) => {
  const { channel } = message.member.voice;
  if (!channel) {
    return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    return message.channel.send("Döngüye alabileceğim bir şarkı bulamadım.");
  }

  serverQueue.loop = !serverQueue.loop;

  message.channel.send(
    `Döngü Başarıyla ${serverQueue.loop ? "Açıldı!" : "Kapatıldı!"}`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["döngü"],
  permLevel: 0
};
exports.help = {
  name: "loop",
  description: "",
  usage: ""
};
