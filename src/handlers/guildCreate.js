module.exports = {
	name: 'guildCreate',
	description: 'When guild add the bot executes this file',
	// eslint-disable-next-line no-unused-vars
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		client.on('guildCreate', guild => {
			console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
			client.user.setActivity(`Serving ${client.guilds.size} servers`);
		});
	},
}