const fs = require('fs').promises

module.exports = {
	name: 'comprar',
	aliases: ['buy'],
	args: true,
	description: 'buy a item from shop',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		const guildConfig = require('../docs/assets/guildConfig.json')
		const guildIdBase = message.guild.id
		let guildId = guildIdBase
		if(guildConfig[guildIdBase].parentGuild.situation) {
			guildId = guildConfig[guildIdBase].parentGuild.id
		}
		const shop = require(`../docs/economy/${guildId}/shop.json`)
		const document = require(`../docs/sheets/${message.author.id}.json`)

		let money = document.rp.money
		let quantity
		if(args[1]) {
			quantity = args[1]
		} else {
			quantity = 1
		}

		if(shop[args[0]]) {
			if(money >= shop[args[0]]) {
				money -= (shop[args[0]] * quantity)
			} else {
				return message.channel.send('Você ta pobre, da pra comprar isso não')
			}
		} else {
			return message.channel.send('Esse item não existe, ve ai de novo maninho')
		}

		document.rp.money = money
		document.rp.inventory[args[0]] += quantity

		const data = JSON.stringify(document)
		await fs.writeFile(`src/docs/sheets/${message.author.id}.json`, data)
			.then(console.log(`buyed ${quantity} of ${args[0]} to ${message.author.username}`))
			.then(message.channel.send('adicionado'))
			.catch(err => console.log(err))
	},
}