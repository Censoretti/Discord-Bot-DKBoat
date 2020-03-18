module.exports = {
	name: 'avatar',
    description: 'See the avatar photo of you or other person or people',
    aliases: ['icon', 'pfp'],
	execute(message) {
            if (!message.mentions.users.size) {
                // eslint-disable-next-line quotes
                return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
            }
            const avatarList = message.mentions.users.map(user => {
                // eslint-disable-next-line quotes
                return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`
            })
            message.channel.send(avatarList)
	},
};