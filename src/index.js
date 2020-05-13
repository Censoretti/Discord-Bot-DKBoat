console.clear()
console.log('=============================== INDEX FILE IGNITE ===============================')
console.log('Loading:  |     type     |  Load  |     Original Name     |        Name');

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

		console.log('=================================================================================')

		for (const file of commandFiles) {
			let space = ''
			let arrCount = (20 - file.length) / 2
			while(arrCount > 0) {
				space += ' '
				arrCount--
			}
			let space2 = ''
			if((file.length % 2) == 0) space2 = ' '
			try {
				const command = require(`./commands/${file}`)
				clientCommands.set(command.name, command);
				let spaceName = ''
				let arrCount2 = (18 - command.name.length) / 2
				while(arrCount2 > 0) {
					spaceName += ' '
					arrCount2--
				}
				console.log(`Loading:  |   command:   |   on   | ${space}${file}${space}${space2} | ${spaceName}${command.name}`)
			} catch(err) {
				console.log(`Loading:  |   command:   |   off  | ${space}${file}${space}${space2} | ${err}`)
			}
		}

		console.log('=================================================================================')

		for (const file of eventFiles) {
			let space = ''
			let arrCount = (20 - file.length) / 2
			while(arrCount > 0) {
				space += ' '
				arrCount--
			}
			let space2 = ''
			if((file.length % 2) == 0) space2 = ' '
			try {
				const event = require(`./events/${file}`)
				clientEvents.set(event.name, event);
				let spaceName = ''
				let arrCount2 = (18 - event.name.length) / 2
				while(arrCount2 > 0) {
					spaceName += ' '
					arrCount2--
				}
				console.log(`Loading:  |    event:    |   on   | ${space}${file}${space}${space2} | ${spaceName}${event.name.split('.')[0]}`)
			} catch(err) {
				console.log(`Loading:  |    event:    |   off  | ${space}${file}${space}${space2} | ${err}`)
			}
		}

		console.log('=================================================================================')

		for(const file of handlersFiles) {
			let space = ''
			let arrCount = (20 - file.length) / 2
			while(arrCount > 0) {
				space += ' '
				arrCount--
			}
			let space2 = ''
			if((file.length % 2) == 0) space2 = ' '
			try {
				require(`./handlers/${file}`).execute(client, Discord, clientCommands, clientEvents, guildInvites)
				let spaceName = ''
				let arrCount2 = (18 - (file.length - 3)) / 2
				while(arrCount2 > 0) {
					spaceName += ' '
					arrCount2--
				}
				console.log(`Loading:  |   handler:   |   on   | ${space}${file}${space}${space2} | ${spaceName}${file.split('.')[0]}`)
			} catch(err) {
				console.log(`Loading:  |   handler:   |   off  | ${space}${file}${space}${space2} | ${err}`)
			}
		}

		console.log('=================================================================================')
	} catch(err) {
		console.log(err)
	}
}
requires()
client.login(process.env.AUTH_TOKEN);