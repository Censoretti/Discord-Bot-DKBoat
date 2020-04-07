module.exports = {
	name: 'ping',
  description: 'Ping!',
  aliases: ['flush'],
	cooldown: 1,
	guildOnly: true,
	execute(message) {
    message.channel.send('Pong.');
	},
};