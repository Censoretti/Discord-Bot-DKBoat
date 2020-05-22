const Discord = require('discord.js')
const guildConfig = require('../docs/assets/guildConfig.json')
const fs = require('fs').promises

module.exports = {
	name: 'rank',
	description: 'Show ranks',
	aliases: ['ranks'],
	onRP: 'off',
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
		const ranks = new Discord.Collection()
		const rankFiles = await fs.readdir(`src/docs/ranks/${guildId}`)
			.catch(err => console.log('[#commandFiles]', err))
		for (const file of rankFiles) {
			const rankName = require(`../docs/ranks/${guildId}/${file}`)
			ranks.set(rankName.config.name, rankName);
		}
		let rank
		// if(admPass) return
		// if(managerPass) return
		if(args[0]) {
			if(message.mentions.users.size) {
				let mention = ''
				message.mentions.users.map(user => { mention = user.id})
				const appearanceM = require(`../docs/sheets/${mention}`).rp.appearance
				if(appearanceM == 'none') {
					return message.channel.send('Esse cara ai não tem ficha não mano')
				}
				let descriptionReply = ''
	
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
			} else if(args[0] == 'me'
			|| args[0] == 'eu'
			|| args[0] == 'meu') {
				const me = message.author.id
				const appearance = require(`../docs/sheets/${me}`).rp.appearance
				if(appearance == 'none') {
					return message.channel.send('Você não tem ficha não maluco')
				}
				const sheetName = require(`../docs/sheets/${me}`).rp.name

				let descriptionReply = ''

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
			
			} else {
				const response = args[0].charAt(0).toUpperCase() + args[0].toLowerCase().slice(1)
				rank = ranks.get(response)
				|| ranks.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(response))
				if(!rank) {
					return message.channel.send(`${response} não é um rank configurado`)
				}
			}
		} else {
			const verifyMessage = await message.channel.send('Rank do que você quer?')
			const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, min: 1, time: 60000 })
			const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
			rank = ranks.get(response)
			|| ranks.find(cmd => cmd.config.aliases && cmd.config.aliases.includes(response))
			if(!rank) {
				return message.channel.send(`${response} não é um rank configurado`)
			}
		} 

		let description = ''
		for(const rankList in rank.rank) {
			description += `Rank ${rankList}: ${rank.rank[rankList].name} ${rank.config.description}${rank.rank[rankList].value}\n` 
		}
		
		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle(`Rank de ${rank.config.nameDesciption}`)
			.setDescription(description)
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		return message.channel.send(embed)
	},
};