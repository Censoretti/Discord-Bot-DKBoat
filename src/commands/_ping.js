module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['flush'],
	cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	// role: 'adm',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		// const author = message.author.id
		message.channel.send('Pong.');
		// message.channel.send(`Teste <@${author}>`)
	},
};