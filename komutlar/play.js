const { Util } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../ayarlar.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const Discord = require("discord.js");
const { play } = require("../events/music.js");
const db = require("quick.db");

exports.run = async (client, message, args, config) => {
      const { channel } = message.member.voice;
    if (!channel) return message.reply("Lütfen bir ses kanalına katıl!");
  if (!args.length) {
    return message.channel.send("Şarkı ismi veya Youtube Linki Vermen Gerek");
  }




  const targetsong = args.join(" ");
  const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
  const urlcheck = videoPattern.test(args[0]);

  if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
  }

  const serverQueue = message.client.queue.get(message.guild.id);

  const queueConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: false,
    volume: 150,
    playing: true
  };

  let songData = null;
  let song = null;

  if (urlcheck) {
    try {
      const result = await youtube.searchVideos(args[0], 1);
      if (!result[0])
        return message.channel.send("Bu linkte bir şarkı bulamadım");
      songData = await ytdl.getInfo(result[0].url, {});

      song = {
        title: songData.videoDetails.title,
        url: songData.videoDetails.video_url,
        duration: songData.videoDetails.lengthSeconds,
        thumbnail: songData.videoDetails.thumbnails[0].url,
        author: songData.videoDetails.author.name,
        wiews: songData.videoDetails.viewCount
      };
    } catch (error) {
      if (message.include === "copyright") {
        return message
          .reply("Bu video telif hakları nedeni ile oynatılamıyor.")
      } else {
      }
    }
  } else {
    try {
      const result = await youtube.searchVideos(targetsong, 1);
      if (!result[0]) return message.channel.send("Arama Sonucu Bulunamadı.");
      songData = await ytdl.getInfo(result[0].url);
      song = {
        title: songData.videoDetails.title,
        url: songData.videoDetails.video_url,
        duration: songData.videoDetails.lengthSeconds,
        thumbnail: songData.videoDetails.thumbnails[0].url,
        author: songData.videoDetails.author.name,
        wiews: songData.videoDetails.viewCount
      };
    } catch (error) {
    }
  }

  if (serverQueue) {
    serverQueue.songs.push(song);
    return serverQueue.textChannel
      .send(`**Oynatma Listesine Başarıyla Eklendi! - \`${song.title}\`**`)

  } else {
    queueConstruct.songs.push(song);
  }

  if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

  if (!serverQueue) {
    try {
      queueConstruct.connection = await channel.join();
      channel.guild.voice.setSelfDeaf(true)
      play(song, message);
    } catch (error) {
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel
        .send({
          embed: {
            description: `Kanala giriş yapamıyorum.: ${error}`,
            color: "#ff2050"
          }
        })
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["play","p"],
  permLevel: 0
};
exports.help = {
  name: "oynat",
  description: "",
  usage: ""
};
