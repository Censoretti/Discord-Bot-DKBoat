const fs = require('fs').promises
const Discord = require('discord.js')
const commandsMap = new Discord.Collection()

module.exports = {
	name: 'ajuda',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands', 'help'],
	usage: '[command name]',
	cooldown: 5,
	guildOnly: true,
	onRP: 'off',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		const roles = require('../docs/assets/628028186709458945/roles.json')
		const guildConfig = require('../docs/assets/guildConfig.json')

		const memberId = message.author.id
		const guildId = message.guild.id
		let guildLinkId = guildId
		if(guildConfig[guildId].parentGuild.situation) {
			guildLinkId = guildConfig[guildId].parentID.id
		}

		let guildIdPass = guildLinkId
		if(guildConfig[guildId].pass) {
			guildIdPass = guildId
		}

		const commandFiles = await fs.readdir('src/commands')
			.catch(err => console.log('[#commandFiles]', err))
		
		for(const files of commandFiles) {
			const commands = require(`./${files}`)
			commandsMap.set(commands.name, commands);
		}
		
		let title = 'Todos os comandos:\nUse: `_ajuda <comando>` para maiores informações'
		let description = ''
		for(const commandsFor of commandsMap) {
			const theCommand = commandsFor[0]
			const command = commandsMap.get(theCommand) || commandsMap.find(cmd => cmd.aliases && cmd.aliases.includes(theCommand))
		
			if(!args[0]) {
				if(command.role) {
					let admPass = false
					let managerPass = false
					if(client.guilds.cache.get(guildIdPass).members.cache.get(memberId).roles.cache.has(roles.server.recruit)
					|| client.guilds.cache.get(guildIdPass).members.cache.get(memberId).roles.cache.has(roles.server.moderator)
					|| client.guilds.cache.get(guildIdPass).members.cache.get(memberId).roles.cache.has(roles.server.administrator)
					|| client.guilds.cache.get(guildIdPass).members.cache.get(memberId).roles.cache.has(roles.server.owner)
					|| client.guilds.cache.get(guildIdPass).members.cache.get(memberId).roles.cache.has(roles.server.manager)) {
						admPass = true
					}
			
					if (client.guilds.cache.get(guildIdPass).members.cache.get(memberId).roles.cache.has(roles.server.owner)
					|| client.guilds.cache.get(guildIdPass).members.cache.get(memberId).roles.cache.has(roles.server.manager)) {
						managerPass = true
					}
			
					if (command.role.includes('adm')) {
						if(admPass) {
							description += `${command.name}\n`
						}
					}
			
					if (command.role.includes('manager')) {
						if(managerPass) {
							description += `${command.name}\n`
						}
					}
				} else {
					description += `${command.name}\n`
				}
			} else {
				const argh = args[0].toLowerCase()
				if(argh == command.name) {
					title = `Informações sobre: ${argh}`
					description = `${command.name}\n`
					if(command.alises) description += `${command.aliases}\n`
					if(command.description) description += `${command.description}\n`
					if(command.usage) description += `${command.usage}\n`
					description += `${command.cooldown || 3}`
					break
				} else {
					title = 'EROOOU'
					description = `Nenhum comando chamado ${argh} mané`
				}
			}
		}

		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle(title)
			.setDescription(description)
			.setThumbnail('https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		message.channel.send(embed)
	},
};