module.exports = {
	name: 'ping',
  description: 'Ping!',
  aliases: ['flush'],
	cooldown: 60,
	guildOnly: true,
	execute(message) {
    const author = message.author.id
    message.channel.send('Pong.');
    message.channel.send(`Teste <@${author}>`)
	},
};