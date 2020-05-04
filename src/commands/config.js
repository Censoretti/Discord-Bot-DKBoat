const fs = require('fs').promises

module.exports = {
	name: 'config',
	description: 'Ping!',
	// aliases: ['flush'],
	// cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	// role: 'adm',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		const config = require('../docs/assets/guildConfig.json')

		const guildId = message.guild.id

		if(config[guildId]) {
			if(args[0]) {
				if(args[0] == 'link') {
					if(args[1]) {
						config[guildId].parentGuild.id = args[1]
						config[guildId].parentGuild.situation = true
					} else {
						return message.channel.send('Preciso do id da guilda principal, mais atenção ai parceiro')
					}
				} else if(args[0] == 'descrição') {
					if(args[1]) {
						args.shift()
						let description
						for(const arr of args) {
							description += arr
						}
						config[guildId].description = description
					}
				} else if(args[0] == 'entrada') {
					if(args[1]) {
						config[guildId].welcomeChat.id = args[1]
						config[guildId].welcomeChat.situation = true
					} else {
						return message.channel.send('Preciso do id do canal de entrada, mais atenção ai parceiro')
					}
				} else if(args[0] == 'saida') {
					if(args[1]) {
						config[guildId].exitChat.id = args[1]
						config[guildId].exitChat.situation = true
					} else {
						return message.channel.send('Preciso do id do canal de saida, mais atenção ai parceiro')
					}
				} else if(args[0] == 'level') {
					if(args[1]) {
						config[guildId].levelUpChat.id = args[1]
						config[guildId].levelUpChat.situation = true
					} else {
						return message.channel.send('Preciso do id do canal de level up, mais atenção ai parceiro')
					}
				} else if(args[0] == 'id') {
					return message.channel.send(`O id desse canal é: ${message.channel.id}`)
				} else if(args[0] == 'pass')	{
					if(config[guildId].pass) {
						config[guildId].pass = false
						message.channel.send('Pegando as roles de comando da guilda linkada')
					} else {
						config[guildId].pass = true
						message.channel.send('Pegando as roles de comando dessa guilda')
					}
				} else {
					console.log(message.guild.name)
					return message.channel.send('Ja foi cadastrada')
				}
			} 
		} else {
			config[guildId] = {}
			config[guildId].parentGuild = {}
			config[guildId].parentGuild.situation = false
			config[guildId].parentGuild.id = '0'
			config[guildId].welcomeChat = {}
			config[guildId].welcomeChat.situation = false
			config[guildId].welcomeChat.id = '0'
			config[guildId].exitChat = {}
			config[guildId].exitChat.situation = false
			config[guildId].exitChat.id = '0'
			config[guildId].levelUpChat = {}
			config[guildId].levelUpChat.situation = false
			config[guildId].levelUpChat.id = '0'
			config[guildId].description = 'none' 
			config[guildId].commands = {}
			config[guildId].pass = false

			const commandFiles = await fs.readdir('src/commands')
				.catch(err => console.log('[#commandFiles]', err))

			for (const file of commandFiles) {
				const commandName = require(`./${file}`).name
				config[guildId].commands[commandName] = true
			}

			const eventFiles = await fs.readdir('src/events')
				.catch(err => console.log('[#eventFiles]', err))

			for (const file of eventFiles) {
				const eventName = require(`../events/${file}`).name
				config[guildId].events[eventName] = true
			}

			message.channel.send('Cadastrada')
		}

		const data = JSON.stringify(config)
		await fs.writeFile('src/docs/assets/guildConfig.json', data)
			.then(console.log(`config done to ${message.guild.name}`))
			.catch(err => console.log(err))

	},
};