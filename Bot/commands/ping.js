module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 60,
	execute(message) {
		message.channel.send('Pong.');
	},
};