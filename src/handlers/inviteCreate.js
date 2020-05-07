module.exports = {
	name: 'inviteCreate',
	description: 'When invite are create to some server, this catches it',
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));

	},
}