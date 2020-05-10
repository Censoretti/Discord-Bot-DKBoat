module.exports = {
	name: 'reload',
	role: 'manager',
	description: 'Reload command with changes',
	args: true,
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const command = message.client.commands.get(args[0])
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${args[0]}\`, ${message.author}!`);
		}
	
		delete require.cache[require.resolve(`./${args[0]}.js`)];

		try {
			const newCommand = require(`./${args[0]}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		} catch (error) {
			console.log(error);
			return message.channel.send(`There was an error while reloading a command \`${args[0]}\`:\n\`${error.message}\``);
		}

		message.channel.send(`Command \`${args[0]}\` was reloaded!`);
	},
};