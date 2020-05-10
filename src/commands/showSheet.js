const Discord = require('discord.js')

module.exports = {
	name: 'mostrar',
	description: 'Show the sheet of someone',
	aliases: ['snipe', 'analisar', 'show'],
	// onRP: off,
	// cooldown: 60,
	// guildOnly: true,
	// usage: '',
	// role: 'adm',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
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
			.setTitle(`Ficha de: ${sheet.rp.name}`)
			.setDescription(`Do gênero: ${sheet.rp.gender}`)
			.addFields(
				{ name: 'Rumo: ', value: `${sheet.rp.course}`, inline: true },
				{ name: 'Raça: ', value: `${sheet.rp.race}`, inline: true },
				{ name: 'Ofício: ', value: `${sheet.rp.clas}`, inline: true },
			)
			.setImage(`${sheet.rp.appearance}`)
			.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')
			.setTimestamp()

		message.channel.send(embed)
	},
};