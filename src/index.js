console.clear()
console.log('--------------- INDEX FILE IGNITE ---------------')

const fs = require('fs').promises;
const Discord = require('discord.js');
const roles = require('./docs/assets/roles.json')
const cron = require('node-cron');
require('dotenv').config()

const task = cron.schedule('* * * * *', async () => {
  try {
    const docsFiles = await fs.readdir('src/docs/sheets')
    for (const file of docsFiles) {
        const document = require(`./docs/sheets/${file}`);
        document.rp.training.daily = 0
        const data = JSON.stringify(document)

        await fs.writeFile(`src/docs/sheets/${file}`, data)
          .then(console.log(`reseted daily training to: ${document.rp.name}`))
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
    console.log(commandFiles)
		const eventFiles = await fs.readdir('src/events')
			.catch(err => console.log('[#eventFiles]', err))

		for (const file of commandFiles) {
      const command = require(`./commands/${file}`)
      client.commands.set(command.name, command);
      console.log(`Loading comand from: ${file} as ${command.name}`)
		}

		for (const file of eventFiles) {
      const event = require(`./events/${file}`)
      console.log(`Loading event from: ${file} file`)
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
    !message.member.roles.cache.has(roles.server.recruit)
    || !message.member.roles.cache.has(roles.server.moderator)
    || !message.member.roles.cache.has(roles.server.administrator)
    || !message.member.roles.cache.has(roles.server.owners)
    || !message.member.roles.cache.has(roles.server.bot_manager))) {
      return message.channel.send('Sem permissão irmão')
    }

    if (command.role.includes('manager') &&
    !message.member.roles.cache.has(roles.server.bot_manager)) {
      return message.channel.send('Sem permissão irmão')
    }
  }

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}`

		if (command.usage) {
			reply += `\nThe proper usage would be: ${process.env.PREFIX}${command.name} ${command.usage}`;
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
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
    command.execute(message, args)
    console.log('[TENTANDO EXECUTAR O COMANDO:', command.name.toUpperCase(), ']')
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!')
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