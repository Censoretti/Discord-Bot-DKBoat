console.clear()
console.log('--------------- INDEX FILE IGNITE ---------------')

const fs = require('fs').promises
const Discord = require('discord.js')
const cron = require('node-cron')
const channels = require('./docs/assets/channels.json')
const roles = require('./docs/assets/628028186709458945/roles.json')
const guildConfig = require('./docs/assets/guildConfig.json')
const client = new Discord.Client()
client.commands = new Discord.Collection()
client.events = new Discord.Collection()
const cooldowns = new Discord.Collection()
const guildInvites = new Map();
require('dotenv').config()

async function requires() {
	try{
		const commandFiles = await fs.readdir('src/commands')
			.catch(err => console.log('[#commandFiles]', err))
		const eventFiles = await fs.readdir('src/events')
			.catch(err => console.log('[#eventFiles]', err))

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`)
			client.commands.set(command.name, command);
			console.log(`Loading comand from: ${file} as ${command.name}`)
		}

		for (const file of eventFiles) {
			const event = require(`./events/${file}`)
			console.log(`Loading event ${file} file as ${event.name}`)
			client.events.set(event.name, event);
		}
	} catch(err) {
		console.log(err)
	}
}
requires()


const marineMoney = cron.schedule('0 0 * * *', async () => {
	try {
		const docsFiles = await fs.readdir('src/docs/sheets')
		for (const file of docsFiles) {
			const document = require(`./docs/sheets/${file}`);
			document.rp.training.daily = 0
			if(document.rp.course == 'marinha') {
				switch(document.rp.course) {
				case('apprentice'):
					document.rp.money += 10
					break
				case('chief'):
					document.rp.money += 1000
					break
				case('lieutenant'):
					document.rp.money += 2000
					break
				case('lieutenantBoss'):
					document.rp.money += 3000
					break
				case('comander'):
					document.rp.money += 5000
					break
				case('capitain'):
					document.rp.money += 8000
					break
				case('comodore'):
					document.rp.money += 16000
					break
				case('notAdmiral'):
					document.rp.money += 38000
					break
				case('almostAdmiral'):
					document.rp.money += 50000
					break
				case('admiral'):
					document.rp.money += 83000
					break
				case('fullAdmiral'):
					document.rp.money += 166000
					break
				default:
					return
				}
			}
			const data = JSON.stringify(document)

			await fs.writeFile(`src/docs/sheets/${file}`, data)
				.then(console.log(`reseted daily training to: ${document.server.username}`))
				.catch(err => console.log(err))
		}
	} catch(err) {
		return console.log(err)
	}
	client.guilds.cache.get('628028186709458945').channels.cache.get('630283915558518805').send(`<@&${roles.rp.course.marine.marine}> pagamento feito`)
});
marineMoney.start()


// const cronTest = cron.schedule('* * * * *', async () => {
// 	try {
// 		// start cronTest UNDER this line

	
// 		// client.guilds.cache.get('628028186709458945').channels.cache.get('630288097740980224').send('<@&632306094005288990>')
// 		// require('./events/rankRP').execute()	
	
// 		// end cronTest ABOVE this line
// 		console.log('cronTest work')
// 	} catch(err) {
// 		console.log('cronTest did\'nt work')
// 		return console.log(err)
// 	}
// })
// cronTest.start()


client.on('message', message => {
	if (message.author.bot) return

	const guildId = message.guild.id
	const memberId = message.author.id
	let guildLinkId = guildId

	if(guildConfig[guildId].parentGuild.situation) {
		guildLinkId = guildConfig[guildId].parentID.id
	}

	if(guildConfig[guildId]) {
		try {
			const event = client.events.get('mExperience')
			event.execute(message)
		} catch (error) {
			console.log(error)
			message.reply('supposed to say hi')
		}
	}

	if (!message.content.startsWith(process.env.PREFIX)) return;

	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);

	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

	if (!command) return;

	if(!guildConfig[guildId].commands[command.name]) {
		return message.channel.send('Comando não habilitado, chame seus adms')
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('Sem tempo irmão')
	}

	let guildIdPass = guildLinkId
	if(guildConfig[guildId].pass) {
		guildIdPass = guildId
	}

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

	const channelOriginalName = message.channel.name.match(/[A-Za-z0-9çáàãâéêíóõôú-]/g)
	let newChar = ''	
	let channelName = ''
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
			if(!channels[guildId][message.channel.parentID][channelName].onRP) {
				return message.channel.send('Nesse canal não, amigão')
			}
		} else if (command.onRP == 'off') {
			if(channels[guildId][message.channel.parentID][channelName].onRP) {
				return message.channel.send('Nesse canal não, amigão')
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
		console.log('[EXECUTANDO O COMANDO:', command.name.toUpperCase(), ' PARA ' + message.author.username + ' ]')
		command.execute(message, args, cooldowns, timestamps, client)
	} catch (error) {
		console.error(error);
		message.reply('IIIIIIHHHH deu erro ai em aqui coisa :T')
	}
});


client.on('guildCreate', guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('guildDelete', guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on('ready', () => {
	console.log('< ONLIIIIIIIINEEEEEEEEEEEEEEEEEEEEEEEEEEE >')
	console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
	client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
	console.log(`${client.user.tag} has logged in.`);
	client.guilds.cache.forEach(guild => {
		guild.fetchInvites()
			.then(invites => guildInvites.set(guild.id, invites))
			.catch(err => console.log(err));
	});

});


client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));

client.on('guildMemberAdd', async member => {
	const cachedInvites = guildInvites.get(member.guild.id);
	const newInvites = await member.guild.fetchInvites();
	guildInvites.set(member.guild.id, newInvites);
	try {
		const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
		const invitedOf = require(`./docs/sheets/${usedInvite.inviter.id}.json`)
		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setTitle(`👋Bem-vindo(a)! ${member.user.username}`)
			.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
			.setDescription(`Temos um novo tripulante, SKOL!\nFoi chamado pelo ${usedInvite.inviter.username}`)
			.setImage('https://i.imgur.com/FrjGrQN.gif')
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')

		invitedOf.server.invites.uses++
		invitedOf.server.invites.total++
		const data = JSON.stringify(invitedOf)
		await fs.writeFile(`src/docs/sheets/${usedInvite.inviter.id}.json`, data)
			.then(console.log(`Used invite to ${usedInvite.inviter.username}`))
			.catch(err => console.log(err))

		const newSheet = require('./docs/sheets/_template.json')
		newSheet.server.invites.invited = usedInvite.inviter.id
		newSheet.server.id = member.user.id
		newSheet.server.username = member.user.username
		newSheet.server.discriminator = member.user.discriminator
		const data2 = JSON.stringify(newSheet)
		await fs.writeFile(`src/docs/sheets/${member.user.id}.json`, data2)
			.then(console.log(`New sheet created to ${member.user.username}`))
			.catch(err => console.log(err))
		
		require('./events/getRank').execute(member.user.id, newSheet, member.guild.id)

		const guildId = member.guild.id
		
		const welcomeChannel = member.guild.channels.cache.get(guildConfig[guildId].welcomeChat.id);
		if(guildConfig[guildId].welcomeChat.situation) {
			welcomeChannel.send(embed).catch(err => console.log(err));
		}
	}
	catch(err) {
		console.log(err);
	}
	require('./events/rankUpdate').execute(member.guild.id)
});

client.on('guildMemberRemove', async member => {
	const embed = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`⚰️ ${member.user.username}...`)
		.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
		.setDescription('E mais um não aguentou a força do nosso haki')
		.setImage('https://i.imgur.com/BLYVOw4.gif')
		.setTimestamp()
		.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')

	const removedMember = require(`./docs/sheets/${member.user.id}.json`)
	const inviterMember = require(`./docs/sheets/${removedMember.server.invites.invited}.json`)

	inviterMember.server.invites.uses--
	const data = JSON.stringify(inviterMember)
	await fs.writeFile(`src/docs/sheets/${inviterMember.server.id}.json`, data)
		.then(console.log(`Less one invite uses for: ${inviterMember.server.username}`))
		.catch(err => console.log(err))

	const guildId = member.guild.id

	const exitChat = member.guild.channels.cache.get(guildConfig[guildId].exitChat.id);
	if(guildConfig[guildId].exitChat.situation) {
		exitChat.send(embed).catch(err => console.log(err));
	}
	require('./events/rankUpdate').execute(member.guild.id)
});

client.login(process.env.AUTH_TOKEN);