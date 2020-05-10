module.exports = {
	name: 'message',
	description: 'All things that message has to get ',
	// eslint-disable-next-line no-unused-vars
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		const channels = require('../docs/assets/channels.json')
		const roles = require('../docs/assets/628028186709458945/roles.json')
		const guildConfig = require('../docs/assets/guildConfig.json')
		const cooldowns = new Discord.Collection()

		client.on('message', message => {
			if (message.author.bot) return
			if (message.channel.type !== 'text') return message.reply('Sem tempo irmão')
		
			let pass = true
			const guildId = message.guild.id
			const memberId = message.author.id
			let guildLinkId = guildId
			const commandNamePass = `${process.env.PREFIX}config`
			let guildIdPass = ''
		
			if(message.content != commandNamePass) {
				if(!guildConfig[guildId]) {
					return message.channel.send('Primeiro o config mano')
				} else if(guildConfig[guildId].parentGuild.situation) {
					guildLinkId = guildConfig[guildId].parentGuild.id
				}
			} else {
				pass = false
			}

			if(pass) {
				require('../events/mExperience').execute(message)
				
				guildIdPass = guildLinkId
			}

			if (!message.content.startsWith(process.env.PREFIX)) return;
		
			const args = message.content.toLowerCase().slice(process.env.PREFIX.length).split(/ +/);
			
			const commandName = args.shift()
		
			const command = clientCommands.get(commandName)
				|| clientCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		
			if (!command) return;

			if(pass) {
				if(!guildConfig[guildId].commands[command.name]) {
					return message.channel.send('Comando não habilitado, chame seus adms')
				}
				if(guildConfig[guildId].pass) {
					guildIdPass = guildId
				}
			}
		
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
			
			if(command.role) {
				if (command.role.includes('adm')) {
					if(!admPass) {
						return message.channel.send('Sem permissão irmão')
					}
				}
		
				if (command.role.includes('manager')) {
					if(!managerPass) {
						return message.channel.send('<:Popcorn:633624350490361857>')
					}
				}
			}
		
			let channelName = ''
			const channelOriginalName = message.channel.name.match(/[A-Za-z0-9çáàãâéêíóõôú-]/g)
			let newChar = ''	
			for(const char of channelOriginalName) {
		
				if(char == '-') {
					newChar = ''
				} else if(char == 'á' || char == 'à' || char == 'â' || char == 'ã') {
					newChar = 'a'
				} else if(char == 'ê' || char == 'é') {
					newChar = 'e'
				} else if(char == 'í') {
					newChar = 'i'
				} else if(char == 'ó' || char == 'õ' || char == 'ô') {
					newChar = 'o'
				} else if(char == 'ú') {
					newChar = 'u'
				} else if(char == 'ç') {
					newChar = 'c'
				} else {
					newChar = char
				}
				channelName += newChar.toLocaleLowerCase()
			}
		
			if(command.onRP) {
				if(command.onRP == 'on') {
					if(channels[guildId]) {
						if(channels[guildId][message.channel.parentID]) {
							if(channels[guildId][message.channel.parentID][channelName]) {
								if(!channels[guildId][message.channel.parentID][channelName].onRP) {
									return message.channel.send('Nesse canal não, amigão')
								}
							} else if (command.onRP == 'off') {
								if(channels[guildId][message.channel.parentID][channelName].onRP) {
									return message.channel.send('Nesse canal não, amigão')
								}
							}
						}
					}
				}
			}
		
			if (command.args && !args.length) {
				let reply = `E o que eu faço só com isso? ${message.author}`
		
				if (command.usage) {
					reply += `\nTem que ser assim ó: ${process.env.PREFIX}${command.name} ${command.usage}`;
				}
		
				return message.channel.send(reply);
			}
		
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Discord.Collection());
			}
		
			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;
		
			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		
				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.reply(`Espera ai mais uns ${timeLeft.toFixed(1)} segundos pra isso`);
				}
			}
		
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

			try {
				console.log('[ EXECUTION OF:', command.name.toUpperCase(), ' TO ' + message.author.username + ' ]')
				command.execute(message, args, cooldowns, timestamps, client, admPass, managerPass)
			} catch (error) {
				console.error(error);
				message.reply('IIIIIIHHHH deu erro ai em aqui coisa :T')
			}
		});
	},
};