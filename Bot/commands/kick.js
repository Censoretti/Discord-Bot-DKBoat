module.exports = {
	name: 'kick',
	description: 'Test for a kick',
	execute(message) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!')
        }
        const taggedUser = message.mentions.users.first()
        message.channel.send(`You wanted to kick: ${taggedUser.username}`)
        console.log('kick')
	},
};