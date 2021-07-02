const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const Discord = require("discord.js");
module.exports = async message => {
  let client = message.client;
  let prefix = ayarlar.prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
        if (db.has(`bakım_${client.user.id}`)) {
      if (message.author.id !== "852863581262970881")
      if (message.author.id !== "418051748645568512")
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle(`Şuanda geçici süreliğine bakımdayım.`)
            .setDescription(
              "• **Verdiğimiz geçici rahatsızlıktan dolayı özür dileriz. En kısa sürede yeniden hizmetinize gireceğim :)**"
            )
            .setThumbnail(
              client.user.displayAvatarURL({ dynamic: true, format: "png" })
            )
        );
    }
  
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
