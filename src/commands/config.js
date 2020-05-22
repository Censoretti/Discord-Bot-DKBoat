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
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const Discord = require('discord.js')
		const fs = require('fs').promises
		const config = require('../docs/assets/guildConfig.json')
		let guildId = message.guild.id

		if(config[guildId]) {
			return message.channel.send('Comando de editar a configuração em construção')
			// eslint-disable-next-line no-unreachable
			let verifyMessage = await message.channel.send('Configuração ja foi feita, quer editar algo?\n(s/n/sim/não)')
			let responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
			let response = responseMessage.first().content.toLowerCase()
			if(response == 'sim'
			|| response == 's'
			|| response == 'y'
			|| response == 'yes') {
				verifyMessage = await message.channel.send('O que você quer editar?')
				responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				response = responseMessage.first().content.toLowerCase()
			} else if(response == 'não'
			|| response == 'nao'
			|| response == 'n'
			|| response == 'no') {
				message.channel.send('Sua guilda ta assim: ')
			} else if(response == 'sair'
			|| response == 'exit') {
				return message.channel.send('Talvez depois então \'u\'')
			}
		} else {
			message.channel.send('Seguinte, só uma pessoa mandando mensagem aqui, caso um bot ou outra pessoa mande mensagem, por gentileza, digite \'sair\' e começe novamente para não dar erro')
			config[guildId] = {
				'description': 'none',
				'parentGuild': {
					'situation': false,
					'id': 0,
				},
				'welcomeChat': {
					'situation': false,
					'id': 0,
				},
				'exitChat': {
					'situation': false,
					'id': 0,
				},
				'levelUpChat': {
					'situation': false,
					'id': 0,
				},
				'commands': {},
				'events': {},
				'pass': false,
			}

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

			message.channel.send('Iremos configurar o server agora\n Se você quiser parar, ou recomeçar, é só escrever sair pra qualquer pergunta')
			let verifyMessage = await message.channel.send('É uma server secundario?\n Uma extensão de outro servidor?\n(s/n/sim/não)')
			let responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
			let response = responseMessage.first().content.toLowerCase()
			if(response == 'sim'
			|| response == 's'
			|| response == 'y'
			|| response == 'yes') {
				verifyMessage = await message.channel.send('Preciso do id do server principal')
				responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				response = responseMessage.first().content.toLowerCase()
				let testConfig1 = true
				while(testConfig1) {
					if(response == 'sair'
					|| response == 'exit') {
						return message.channel.send('Configuraremos depois então :3')
					}
					if(config[response]) {
						config[guildId].parentGuild = {
							'situation': true,
							'id': response,
						}
						testConfig1 = false
					} else {
						verifyMessage = await message.channel.send('Id errado, tente novamente')
						responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						response = responseMessage.first().content.toLowerCase()
					}
				}
			} else if(response == 'não'
			|| response == 'nao'
			|| response == 'n'
			|| response == 'no') {
				message.channel.send('Seguindo então')
			} else if(response == 'sair'
			|| response == 'exit') {
				return message.channel.send('Configuraremos depois então :3')
			}
			verifyMessage = await message.channel.send('Quer colocar descrição no servidor?\n(s/n/sim/não)')
			responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
			response = responseMessage.first().content.toLowerCase()
			if(response == 'sim'
			|| response == 's'
			|| response == 'y'
			|| response == 'yes') {
				verifyMessage = await message.channel.send('Qual vai ser a descrição?')
				responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				response = responseMessage.first().content.toLowerCase()
				if(response == 'sair'
				|| response == 'exit') {
					return message.channel.send('Configuraremos depois então :3')
				}
				config[guildId].description = response
			} else if(response == 'não'
			|| response == 'nao'
			|| response == 'n'
			|| response == 'no') {
				message.channel.send('Seguindo então')
			} else if(response == 'sair'
			|| response == 'exit') {
				return message.channel.send('Configuraremos depois então :3')
			}
			verifyMessage = await message.channel.send('Quer um canal pra mensagem de entrada?\n(s/n/sim/não)')
			responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
			response = responseMessage.first().content.toLowerCase()
			if(response == 'sim'
			|| response == 's'
			|| response == 'y'
			|| response == 'yes') {
				verifyMessage = await message.channel.send('Qual canal da entrada?')
				responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				response = responseMessage.first().content.toLowerCase()
				config[guildId].welcomeChat = {
					'situation': true,
					'id': response,
				}
			} else if(response == 'não'
			|| response == 'nao'
			|| response == 'n'
			|| response == 'no') {
				message.channel.send('Seguindo então')
			} else if(response == 'sair'
			|| response == 'exit') {
				return message.channel.send('Configuraremos depois então :3')
			}
			verifyMessage = await message.channel.send('Quer canal pra mensagem de saida?\n(s/n/sim/não)')
			responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
			response = responseMessage.first().content.toLowerCase()
			if(response == 'sim'
			|| response == 's'
			|| response == 'y'
			|| response == 'yes') {
				verifyMessage = await message.channel.send('Qual canal de saida?')
				responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				response = responseMessage.first().content.toLowerCase()
				config[guildId].exitChat = {
					'situation': true,
					'id': response,
				}
			} else if(response == 'não'
			|| response == 'nao'
			|| response == 'n'
			|| response == 'no') {
				message.channel.send('Seguindo então')
			} else if(response == 'sair'
			|| response == 'exit') {
				return message.channel.send('Configuraremos depois então :3')
			}
			verifyMessage = await message.channel.send('As roles que comandam o bot vão ser definidas pelo server princial?\nCaso não, terá que criar as roles de comando pra esse servidor depois\n(s/n/sim/não)')
			responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
			response = responseMessage.first().content.toLowerCase()
			if(response == 'sim'
			|| response == 's'
			|| response == 'y'
			|| response == 'yes') {
				config[guildId].pass = true
			} else if(response == 'não'
			|| response == 'nao'
			|| response == 'n'
			|| response == 'no') {
				message.channel.send('Sua guilda ta assim: ')
			} else if(response == 'sair'
			|| response == 'exit') {
				return message.channel.send('Configuraremos depois então :3')
			}
		}	


		if(config[guildId].parentGuild.situation) {
			guildId = config[guildId].parentGuild.id
		}
		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle(message.guild.name)
			.setDescription(config[message.guild.id].description)
			.setThumbnail(client.guilds.cache.get(guildId).iconURL({ dynamic: true }))
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		message.channel.send(embed)
		const data = JSON.stringify(config)
		await fs.writeFile('src/docs/assets/guildConfig.json', data)
			.then(console.log(`config done to ${message.guild.name}`))
			.catch(err => console.log(err))
	},
};