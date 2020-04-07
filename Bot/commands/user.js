module.exports = {
	name: 'user',
	description: 'See some user info.',
	execute(message) {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};