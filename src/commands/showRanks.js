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
	execute: async (message, args, cooldowns, timestamps, client) => {
		const guildIdBase = message.guild.id
		let guildId = guildIdBase
		let argh
		
		if(guildConfig[guildIdBase].parentGuild.situation) {
			guildId = guildConfig[guildIdBase].parentGuild.id
		}

		let rankOf = 'me'

		let test = true

		if(args[0]) {
			argh = args[0].toLowerCase()

			if(argh == 'invite' 
			|| argh == 'invites') {
				rankOf = 'invites'
				test = false
			} else if(argh == 'forca' 
			|| argh == 'força') {
				rankOf = 'str'
				test = false
			} else if(argh == 'resistencia' 
			|| argh == 'resistência') {
				rankOf = 'res'
				test = false
			} else if(argh == 'velocidade' 
			|| argh == 'vel') {
				rankOf = 'spd'
				test = false
			} else if(argh == 'destreza' 
			|| argh == 'dex') {
				rankOf = 'dex'
				test = false
			} else if(argh == 'level' 
			|| argh == 'rp') {
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
			return message.channel.send(`Nenhum rank configurado para ${argh}`)
		}
		
		const data = require(`../docs/ranks/${guildId}/rank${rankOf}.json`)

		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle(`Rank de ${data.config.nameDesciption}`)
			.setDescription(`Rank 1 : ${data.rank['1st'].name} ${data.config.description} ${data.rank['1st'].value}
											Rank 2 : ${data.rank['2nd'].name} ${data.config.description} ${data.rank['2nd'].value}
											Rank 3 : ${data.rank['3rd'].name} ${data.config.description} ${data.rank['3rd'].value}
											Rank 4 : ${data.rank['4th'].name} ${data.config.description} ${data.rank['4th'].value}
											Rank 5 : ${data.rank['5th'].name} ${data.config.description} ${data.rank['5th'].value}
											Rank 6 : ${data.rank['6th'].name} ${data.config.description} ${data.rank['6th'].value}
											Rank 7 : ${data.rank['7th'].name} ${data.config.description} ${data.rank['7th'].value}
											Rank 8 : ${data.rank['8th'].name} ${data.config.description} ${data.rank['8th'].value}
											Rank 9 : ${data.rank['9th'].name} ${data.config.description} ${data.rank['9th'].value}
											Rank 10 : ${data.rank['10th'].name} ${data.config.description} ${data.rank['10th'].value}`)
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		message.channel.send(embed)
	},
};