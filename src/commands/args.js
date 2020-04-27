module.exports = {
	name: 'args',
	description: 'See information about argumments in commands, just for curiosity',
	args: true,
	role: 'manager',
	usage: '<text>',
	guildOnly: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};