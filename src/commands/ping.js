module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['flush'],
	cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	role: 'manager',
	onRP: 'off',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		// const author = message.author.id
		message.channel.send('Pong.');
		// message.channel.send(`Teste <@${author}>`)
	},
};