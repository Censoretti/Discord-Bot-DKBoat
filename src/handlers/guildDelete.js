module.exports = {
	name: 'guildDelete',
	description: 'When guild delete the bot, this executes',
	// eslint-disable-next-line no-unused-vars
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		client.on('guildDelete', guild => {
			console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
			client.user.setActivity(`Serving ${client.guilds.size} servers`);
		});
	},
}