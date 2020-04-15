console.clear()
console.log('--------------- INDEX FILE IGNITE ---------------')

const fs = require('fs').promises;
const Discord = require('discord.js');
const roles = require('./docs/assets/roles.json')
require('dotenv').config()

const cron = require('node-cron');
const task = cron.schedule('0 0 * * *', async () => {
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
		console.log(err)
	}
});
task.start()

const client = new Discord.Client({ forceFetchUsers: true });
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
const cooldowns = new Discord.Collection();

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
			console.log(`Loading event ${file} file`)
			client.events.set(event.name, event);
		}
	} catch(err) {
		console.log(err)
	}
}
requires()


client.on('message', message => {
  if (message.author.bot) return

	try {
		const event = client.events.get('mExperience')
		event.execute(message)
	} catch (error) {
		console.log(error)
		message.reply('supposed to say hi')
	}

	if (!message.content.startsWith(process.env.PREFIX)) return;

	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);

	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('Sem tempo irmão')
	}

	if(command.role) {
		if (command.role.includes('adm') && (
		message.member.roles.cache.has(roles.server.recruit)
		|| message.member.roles.cache.has(roles.server.moderator)
		|| message.member.roles.cache.has(roles.server.administrator)
		|| message.member.roles.cache.has(roles.server.owners)
		|| message.member.roles.cache.has(roles.server.manager))) {
			return message.channel.send('Sem permissão irmão')
		}

		if (command.role.includes('manager') && (
      message.member.roles.cache.has(roles.server.manager)
      || message.member.roles.cache.has(roles.server.owners))) {
			return message.channel.send('<:Popcorn:633624350490361857>')
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
		command.execute(message, args, cooldowns, timestamps)
	} catch (error) {
		console.error(error);
		message.reply('IIIIIIHHHH deu erro ai em alguma coisa :T')
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
});

client.login(process.env.AUTH_TOKEN);