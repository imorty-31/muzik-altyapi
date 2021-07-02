const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**Bu komutu kullanmak için \`Mesajları Yönet\` yetkisine sahip olmalısın!**`);


  var sil = args.slice(0).join(" ");

  const temizlemesajembed1 = new Discord.MessageEmbed()
  .setTitle("Lütfen Silincek Mesaj Miktarını Yazın!  ")
  const temizlemesajembed2 = new Discord.MessageEmbed()
    .setTitle("Lütfen doğru yazdığından emin ol!")


  const temizlemesajembed3 = new Discord.MessageEmbed()
    .setTitle("`14` günden önceki mesajları silemem!")
  if (args[0] > 100)
    return message.reply("**100** adetten fazla mesaj silemem!");
  const temizlemesajembed4 = new Discord.MessageEmbed()
    .setTitle(`${args[0]} adet mesaj başarıyla silindi!`)

  if (!sil) return message.channel.send(temizlemesajembed1);
  if (isNaN(sil)) return message.channel.send(temizlemesajembed2);
  let fetched = await message.channel.messages.fetch({ limit: args[0] });

  message.channel
    .bulkDelete(fetched)
    .catch(error => message.channel.send(temizlemesajembed3));

  message.channel
    .send(temizlemesajembed4)
    .then(msg => msg.delete({ timeout: 8000, reason: "mesaj silme" }));

  message.delete();
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil"],
  permLevel: 0
};
exports.help = {
  name: "temizle"
};
