const Discord = require('discord.js')

module.exports = {
	name: 'stats',
  description: 'show the stats of the sheet',
  // aliases: ['show'],
	// cooldown: 60,
  guildOnly: true,
  // usage: '',
  // role: 'adm',
	execute: async (message) => {
    let userId
    let sheet

		if (!message.mentions.users.size) {
			userId = message.author.id
		} else {
      message.mentions.users.map(user => { userId = user.id });
    }

    try {
      sheet = require(`../docs/sheets/${userId}.json`)
    } catch(err) {
      console.log(err)
      return message.channel.send('não tem ficha desse cara ai não parceiro')
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#00ff00')
      .setTitle(`Stats do ${sheet.rp.name}`)
      .setThumbnail(`${sheet.rp.appearance}`)
      .setTimestamp()
      .setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')

    switch(sheet.rp.race) {
      case('giant'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade}
        `)
        break
      case('human'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade}
        `)
        break
      case('longLimb'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade + 20} com bônus)
        `)
        break
      case('mink'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade}
        `)
        break
      case('mermaid'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade} (em água: ${sheet.rp.stats.velocidade * 2}, em terra: ${sheet.rp.stats.velocidade / 2})
        `)
        break
      case('skypeans'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade}
        `)
        break
      case('eyes'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza} (${sheet.rp.stats.destreza + 20} com bônus)  
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade}
        `)
        break
      case('tonttata'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca} (${sheet.rp.stats.forca / 2} válidos)
        Destreza: ${sheet.rp.stats.destreza} (${sheet.rp.stats.destreza + 15} com bônus)  
        Resistencia: ${sheet.rp.stats.resistencia} (${sheet.rp.stats.resistencia / 2} válidos)
        Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade / 2} válidos)
        `)
        break
      case('arm'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade}
        `)
        break
      case('leg'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade + 20} com bônus)
        `)
        break
      case('snake'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade}
        `)
        break
      case('fishMan'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca}
        Destreza: ${sheet.rp.stats.destreza}
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade} (em água: ${sheet.rp.stats.velocidade * 2})
        `)
        break
      case('wotan'):
        embed.setDescription(`
        Força: ${sheet.rp.stats.forca} (${sheet.rp.stats.forca * 1.5} válidos)
        Destreza: ${sheet.rp.stats.destreza} (${sheet.rp.stats.destreza / 2} válidos)
        Resistencia: ${sheet.rp.stats.resistencia}
        Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade + 15} com bônus)
        `)
        break

    }

    message.channel.send(embed)
	},
};