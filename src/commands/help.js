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
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
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
		
			if(args[0]) {
				if(args[0] == command.name) {
					title = `Informações sobre: ${args[0]}`
					description = `${command.name}\n`
					if(command.alises) description += `${command.aliases}\n`
					if(command.description) description += `${command.description}\n`
					if(command.usage) description += `${command.usage}\n`
					description += `${command.cooldown || 3}`
					break
				} else {
					title = 'EROOOU'
					description = `Nenhum comando chamado ${args[0]} mané`
				}
			} else if(command.role) {
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