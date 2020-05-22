module.exports = {
	name: 'reset',
	description: 'reset the cd of a command',
	role: 'manager',
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		let helped = ''
		let username = ''

		if(message.mentions.users.size) {
			message.mentions.users.map(user => { 
				helped = user.id
			});
		} else if(args[0]) {
			helped = args[0]
		}

		try {
			require(`../docs/sheets/${helped}.json`)
		} catch(err) {
			return message.channel.send('Não existe esse cara ai')
		}
		username = require(`../docs/sheets/${helped}.json`).server.username

		const verifyMessage = await message.channel.send(`Qual comando vc quer resetar do ${username}`)
		const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, min: 1, time: 60000 })
		const commandName = responseMessage.first().content.toLowerCase()
		if (!cooldowns.has(commandName)) {
			cooldowns.set(commandName, new Map());
		}
		timestamps = cooldowns.get(commandName)
		if (timestamps.has(helped)) {
			timestamps.delete(helped)
		}
		message.channel.send('resetado')
	},
};