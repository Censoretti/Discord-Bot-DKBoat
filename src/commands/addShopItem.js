const fs = require('fs').promises

module.exports = {
	name: 'add',
	aliases: ['adicionar'],
	args: true,
	role: 'manager',
	description: 'add a item to shop',
	// onRP: on,
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		const guildConfig = require('../docs/assets/guildConfig.json')
		const guildIdBase = message.guild.id
		let guildId = guildIdBase
		if(guildConfig[guildIdBase].parentGuild.situation) {
			guildId = guildConfig[guildIdBase].parentGuild.id
		}
		const shop = require(`../docs/economy/${guildId}/shop.json`)
		for (const key in shop) {
			// eslint-disable-next-line no-prototype-builtins
			if (shop.hasOwnProperty(key)) {
				if(key == args[0]) {
					return message.channel.send(`Ja tem esse item com o valor: <:Belly:633626593138442240>${shop[key]}`)
				}
			}
		}
		if(args[1]) {
			if(args[2]) {
				shop[args[0]] = args[args.length - 1]
			} else {
				return message.channel.send('Vai ser de graça meu bom? Bota um valor ai mermão')
			}
		}
		const data = JSON.stringify(shop)
		await fs.writeFile(`src/docs/economy/${guildId}/shop.json`, data)
			.then(console.log(`add ${args[0]} with ${args[1]}`))
			.then(message.channel.send('adicionado'))
			.catch(err => console.log(err))
	},
}