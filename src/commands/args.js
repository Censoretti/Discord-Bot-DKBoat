module.exports = {
	name: 'args',
	description: 'See information about argumments in commands, just for curiosity',
	args: true,
	role: 'manager',
	usage: '<text>',
	guildOnly: true,
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};