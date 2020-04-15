const fs = require('fs').promises

module.exports = {
	name: 'addi',
  description: 'Ping!',
  aliases: ['flush'],
	cooldown: 1,
  // guildOnly: true,
  // usage: '',
  role: 'manager',
	execute: async (message, args) => {
    const channels = require('../docs/assets/channels.json')
    console.log(message.channel.parentID)
    channels[args[0]].id = message.channel.parentID
    const data = JSON.stringify(channels)
    await fs.writeFile('src/docs/assets/channels.json', data)
      .then(console.log(`add ${args[0]} id with ${message.channel.id}`))
      .then(message.channel.send('adicionado'))
      .catch(err => console.log(err))
	},
};