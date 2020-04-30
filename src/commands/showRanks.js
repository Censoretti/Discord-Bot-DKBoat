const Discord = require('discord.js')

module.exports = {
	name: 'rank',
	description: 'Show ranks',
	aliases: ['ranks'],
	// cooldown: 60,
	// guildOnly: true,
	// usage: '',
	// role: 'adm',
	execute: async (message, args) => {
		let rankOf = 'me'
		let rankTittle = 'Level'
		let description = 'Level'
		let test = false
		if(args) {
			if(args[0] == 'invite' 
			|| args[0] == 'invites') {
				rankOf = 'invites'
				rankTittle = 'Invites'
				description = 'Invites feitos'
				test = false
			}
			if(args[0] == 'level' 
			|| args[0] == 'rp') {
				rankOf = 'invites'
				rankTittle = 'Invites'
				description = 'Invites feitos'
				test = false
			}
			if(message.mentions.users.size) {
				let mention = ''
				let avatar
				message.mentions.users.map(user => { mention = user.id 
				avatar = user.displayAvatarURL({ dynamic: true })})
				
				const rankRP = require('../docs/ranks/rankRP.json')
				const rankInvites = require('../docs/ranks/rankInvites.json')
				const embedMention = new Discord.MessageEmbed()
				.setColor('#00ff00')
				.setThumbnail(avatar)
				.setTitle(`Rank de ${rankRP.users[mention].name}`)
				.setDescription(`Rank de level: ${rankRP.users[mention].rank}º com o level; ${rankRP.users[mention].level}
												Rank de invites: ${rankInvites.users[mention].rank}º quantidade de usos: ${rankInvites.users[mention].level}`)
				.setTimestamp()
				.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

				return message.channel.send(embedMention)
			}
			if(rankOf == 'me') {
				const me = message.author.id
				
				const rankRP = require('../docs/ranks/rankRP.json')
				const rankInvites = require('../docs/ranks/rankInvites.json')
				const embedMe = new Discord.MessageEmbed()
				.setColor('#00ff00')
				.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
				.setTitle(`Rank de ${rankRP.users[me].name}`)
				.setDescription(`Rank de level ${rankRP.users[me].rank}º com o level: ${rankRP.users[me].level}
												Rank de invites ${rankInvites.users[me].rank}º quatidade de usos: ${rankInvites.users[me].level}`)
				.setTimestamp()
				.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

				return message.channel.send(embedMe)
			}
			if(test) {
				return message.channel.send(`Nenhum rank configurado para ${args[0]}`)
			}
		}
		const data = require(`../docs/ranks/rank${rankOf}.json`)

		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle(`Rank de ${rankTittle}`)
			.setDescription(`Rank 1 : ${data.rank['1st'].name} com o ${description} de ${data.rank['1st'].level}
											Rank 2 : ${data.rank['2nd'].name} com o ${description} de ${data.rank['2nd'].level}
											Rank 3 : ${data.rank['3rd'].name} com o ${description} de ${data.rank['3rd'].level}
											Rank 4 : ${data.rank['4th'].name} com o ${description} de ${data.rank['4th'].level}
											Rank 5 : ${data.rank['5th'].name} com o ${description} de ${data.rank['5th'].level}
											Rank 6 : ${data.rank['6th'].name} com o ${description} de ${data.rank['6th'].level}
											Rank 7 : ${data.rank['7th'].name} com o ${description} de ${data.rank['7th'].level}
											Rank 8 : ${data.rank['8th'].name} com o ${description} de ${data.rank['8th'].level}
											Rank 9 : ${data.rank['9th'].name} com o ${description} de ${data.rank['9th'].level}
											Rank 10 : ${data.rank['10th'].name} com o ${description} de ${data.rank['10th'].level}`)
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		message.channel.send(embed)
	},
};