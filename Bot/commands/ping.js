module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 1,
	guildOnly: true,
	execute(message) {
    message.channel.send('Pong.');
    console.log('ping')
	},
};