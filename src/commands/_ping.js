module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['flush'],
	cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	// role: 'adm',
	execute: async (message) => {
		// const author = message.author.id
		message.channel.send('Pong.');
		// message.channel.send(`Teste <@${author}>`)
	},
};