module.exports = {
	name: 'ping',
  description: 'Ping!',
  aliases: ['flush'],
	cooldown: 60,
	guildOnly: true,
	execute(message) {
    message.channel.send('Pong.');
	},
};