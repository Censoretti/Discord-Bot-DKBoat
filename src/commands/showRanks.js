const Discord = require('discord.js')
const guildConfig = require('../docs/assets/guildConfig.json')
const fs = require('fs').promises

module.exports = {
	name: 'rank',
	description: 'Show ranks',
	aliases: ['ranks'],
	// onRP: off,
	// cooldown: 60,
	// guildOnly: true,
	// usage: '',
	// role: 'adm',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const guildIdBase = message.guild.id
		let guildId = guildIdBase
		
		if(guildConfig[guildIdBase].parentGuild.situation) {
			guildId = guildConfig[guildIdBase].parentGuild.id
		}

		let rankOf = 'me'

		let test = true

		if(args[0]) {
			if(args[0] == 'invite' 
			|| args[0] == 'invites') {
				rankOf = 'invites'
				test = false
			} else if(args[0] == 'forca' 
			|| args[0] == 'força') {
				rankOf = 'str'
				test = false
			} else if(args[0] == 'resistencia' 
			|| args[0] == 'resistência') {
				rankOf = 'res'
				test = false
			} else if(args[0] == 'velocidade' 
			|| args[0] == 'vel') {
				rankOf = 'spd'
				test = false
			} else if(args[0] == 'destreza' 
			|| args[0] == 'dex') {
				rankOf = 'dex'
				test = false
			} else if(args[0] == 'level' 
			|| args[0] == 'rp') {
				rankOf = 'lv'
				test = false
			} else if(message.mentions.users.size) {
				rankOf = 'mention'
			} else {
				test = true
			}
		}
		
		if(rankOf == 'me') {
			const me = message.author.id
			const appearance = require(`../docs/sheets/${me}`).rp.appearance
			if(appearance == 'none') {
				return message.channel.send('Você não tem ficha não maluco')
			}
			const sheetName = require(`../docs/sheets/${me}`).rp.name

			let descriptionReply = ''

			const rankFiles = await fs.readdir(`src/docs/ranks/${guildId}`)
				.catch(err => console.log('[#RANKFILES/RANKUPDATE]', err))

			for(const files of rankFiles) {
				const rankFile = require(`../docs/ranks/${guildId}/${files}`)
				descriptionReply += `Rank de ${rankFile.config.nameDesciption}: ${rankFile.users[me].rank}º ${rankFile.config.description}${rankFile.users[me].value}\n`
			}

			const embedMe = new Discord.MessageEmbed()
				.setColor('#00ff00')
				.setThumbnail(appearance)
				.setTitle(`Rank de ${sheetName}`)
				.setDescription(descriptionReply)
				.setTimestamp()
				.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

			return message.channel.send(embedMe)
		}


		if(message.mentions.users.size) {
			let mention = ''
			message.mentions.users.map(user => { mention = user.id})
			const appearanceM = require(`../docs/sheets/${mention}`).rp.appearance
			if(appearanceM == 'none') {
				return message.channel.send('Esse cara ai não tem ficha não mano')
			}
			
			let descriptionReply = ''

			const rankFiles = await fs.readdir(`src/docs/ranks/${guildId}`)
				.catch(err => console.log('[#RANKFILES/RANKUPDATE]', err))

			for(const files of rankFiles) {
				const rankFile = require(`../docs/ranks/${guildId}/${files}`)
				descriptionReply += `Rank de ${rankFile.config.nameDesciption}: ${rankFile.users[mention].rank}º ${rankFile.config.description}${rankFile.users[mention].value}\n`
			}

			const sheetName = require(`../docs/sheets/${mention}`).rp.name

			const embedMention = new Discord.MessageEmbed()
				.setColor('#00ff00')
				.setThumbnail(appearanceM)
				.setTitle(`Rank de ${sheetName}`)
				.setDescription(descriptionReply)
				.setTimestamp()
				.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

			return message.channel.send(embedMention)
		}

		if(test) {
			return message.channel.send(`Nenhum rank configurado para ${args[0]}`)
		}
		
		const data = require(`../docs/ranks/${guildId}/rank${rankOf}.json`)

		let description = ''
		for(const ranks in data.rank) {
			description += `Rank ${ranks}: ${data.rank[ranks].name} ${data.config.description}${data.rank[ranks].value}\n` 
		}
		
		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle(`Rank de ${data.config.nameDesciption}`)
			.setDescription(description)
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		message.channel.send(embed)
	},
};