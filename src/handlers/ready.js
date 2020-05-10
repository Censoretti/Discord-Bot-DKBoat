module.exports = {
	name: 'ready',
	description: 'When the bot is ready executes this file',
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		client.on('ready', () => {
			console.log('< ONLIIIIIIIINEEEEEEEEEEEEEEEEEEEEEEEEEEE >')
			console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
			client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
			console.log(`${client.user.tag} has logged in.`);
			console.log('=================================================')
			client.guilds.cache.forEach(guild => {
				guild.fetchInvites()
					.then(invites => guildInvites.set(guild.id, invites))
					.catch(err => console.log(err));
			});
		
		});
	},
}