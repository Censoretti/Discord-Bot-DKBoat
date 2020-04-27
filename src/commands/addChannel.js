const fs = require('fs').promises

module.exports = {
	name: 'addc',
	description: 'Ping!',
	aliases: ['flush'],
	cooldown: 1,
	// guildOnly: true,
	// usage: '',
	role: 'manager',
	execute: async (message, args) => {
		const channels = require('../docs/assets/channels.json')
		if(!channels[args[0]]) {
			channels[args[0]] = {}
		}
		if(!channels[args[0]][message.channel.name]) {
			channels[args[0]][message.channel.name] = {}
		}
		channels[args[0]][message.channel.name] = message.channel.id
		const data = JSON.stringify(channels)
		await fs.writeFile('src/docs/assets/channels.json', data)
			.then(console.log(`add ${message.channel.name} to ${args[0]} the value with ${message.channel.id}`))
			.then(message.channel.send('adicionado'))
			.catch(err => console.log(err))
	},
};