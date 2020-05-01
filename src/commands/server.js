module.exports = {
	name: 'server',
	description: 'See some info about the server you are.',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated at: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
	},
};