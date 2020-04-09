module.exports = {
	name: 'reset',
  description: 'reset the cd of a command',
  roles: 'manager',
	guildOnly: true,
	execute(message, args, cooldowns, timestamps) {
    const helped = args[0]
    const commandName = args[1]
    if (!cooldowns.has(commandName)) {
      cooldowns.set(commandName, new Map());
    }
    timestamps = cooldowns.get(commandName)
    if (timestamps.has(helped)) {
      timestamps.delete(helped)
    }
    message.channel.send('done')
	},
};