console.clear()
console.log('=============== INDEX FILE IGNITE ===============')

const fs = require('fs').promises
const Discord = require('discord.js')
const client = new Discord.Client()
const clientCommands = new Discord.Collection()
const clientEvents = new Discord.Collection()
const guildInvites = new Map();
require('dotenv').config()

async function requires() {
	try{
		const commandFiles = await fs.readdir('src/commands')
			.catch(err => console.log('[#commandFiles]', err))
		const eventFiles = await fs.readdir('src/events')
			.catch(err => console.log('[#eventFiles]', err))
		const handlersFiles = await fs.readdir('src/handlers')
			.catch(err => console.log('[#handlerFiles', err))

		commandFiles.pop()
		eventFiles.pop()
		handlersFiles.pop()

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`)
			clientCommands.set(command.name, command);
			console.log(`Loading comand: ${command.name}`)
		}

		console.log('=================================================')

		for (const file of eventFiles) {
			const event = require(`./events/${file}`)
			console.log(`Loading event: ${file.split('.')[0]}`)
			clientEvents.set(event.name, event);
		}

		console.log('=================================================')

		for(const file of handlersFiles) {
			require(`./handlers/${file}`).execute(client, Discord, clientCommands, clientEvents, guildInvites)
			console.log(`Loading handler: ${file.split('.')[0]}`)
		}

		console.log('=================================================')
	} catch(err) {
		console.log(err)
	}
}
requires()

client.login(process.env.AUTH_TOKEN);