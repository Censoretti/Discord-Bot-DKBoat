module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['flush'],
	cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	role: 'manager',
	onRP: 'off',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const { stripIndents } = require('common-tags');
		const msg = await message.channel.send('Pinging...');
		const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);
		if (ping <= 0) {
			return msg.edit('Please try again...');
		}
		return msg.edit(
			stripIndents`
      🏓 P${'o'.repeat(Math.ceil(ping / 100))}ng: \`${ping}ms\`
			`)
	},
};