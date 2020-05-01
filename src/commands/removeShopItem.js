const shop = require('../docs/economy/shop.json')
const fs = require('fs').promises
let exist = false

module.exports = {
	name: 'remove',
	aliases: ['remover'],
	args: true,
	role: 'adm',
	description: 'remove a item to shop',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		for (const key in shop) {
			// eslint-disable-next-line no-prototype-builtins
			if (shop.hasOwnProperty(key)) {
				if(key == args[0]) {
					delete shop[args[0]]
					message.channel.send('Item deletado')
					exist = true
				}
			}
		}

		if (exist == false) {
			return message.channel.send('Item não existe')
		}
    
		const data = JSON.stringify(shop)
		await fs.writeFile('src/docs/economy/shop.json', data)
			.then(console.log(`removed ${args[0]}`))
			.then(message.channel.send('removido'))
			.catch(err => console.log(err))
	},
}