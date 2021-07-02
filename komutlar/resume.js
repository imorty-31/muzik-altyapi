const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (bot, message, args) => {
      const { channel } = message.member.voice;
    if (!channel) {
   
      return message.channel.send("Herhangi bir ses kanalında bulunmalısınız.");
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('Oynatılan bir şarkı Bulunmuyor.')
    if(serverQueue.playing) return message.channel.send(`Duraklatılmış bir şarkı yok.`)
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume(true)
  
  return message.channel.send("Şarkı devam ediyor.") 
 }
    
    message.channel.send("Duraklatılan bir şarkı yok.")
    
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["devam"],
  permLevel: 0
};
exports.help = {
  name: 'resume',
  description: '',
  usage: ''
};
   