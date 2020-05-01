const shop = require('../docs/economy/shop.json')
const Discord = require('discord.js')

module.exports = {
	name: 'shop',
	description: 'list the shop itens',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {

		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setDescription('`comprar <item> <quantidade>` para comprar item')
			.setTitle('SHOP')
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')

		for (const key in shop) {
			// eslint-disable-next-line no-prototype-builtins
			if (shop.hasOwnProperty(key)) {
				embed.addField(`${key}: <:Belly:633626593138442240>${shop[key]}`, '\u200B')
			}
		}
		message.channel.send(embed)
	},
}