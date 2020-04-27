const shop = require('../docs/economy/shop.json')
const fs = require('fs').promises

module.exports = {
	name: 'add',
	aliases: ['adicionar'],
	args: true,
	role: 'adm',
	description: 'add a item to shop',
	execute: async (message, args) => {
		for (const key in shop) {
			// eslint-disable-next-line no-prototype-builtins
			if (shop.hasOwnProperty(key)) {
				if(key == args[0]) {
					return message.channel.send(`Ja tem esse item com o valor: <:Belly:633626593138442240>${shop[key]}`)
				}
			}
		}
		if(args[1]) {
			shop[args[0]] = args[1]
		} else {
			return message.channel.send('Vai ser de graça? Bota um valor ai mermão')
		}
		const data = JSON.stringify(shop)
		await fs.writeFile('src/docs/economy/shop.json', data)
			.then(console.log(`add ${args[0]} with ${args[1]}`))
			.then(message.channel.send('adicionado'))
			.catch(err => console.log(err))
	},
}