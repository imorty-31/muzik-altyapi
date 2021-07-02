const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (bot, message, args) => {
  const { channel } = message.member.voice;
  if (!channel) {
    return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  if (!serverQueue) {
    return message.channel.send("Kuyrukta şarkı bulamadım.");
  }

  message.channel.send(
    `${serverQueue.songs
      .map((song, index) => index + 1 + ". " + song.title)
      .join("\n\n")}`,
    { split: true }
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kuyruk", "sıra"],
  permLevel: 0
};
exports.help = {
  name: "queue",
  description: "",
  usage: ""
};
