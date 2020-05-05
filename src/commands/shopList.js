const Discord = require('discord.js')

module.exports = {
	name: 'shop',
	description: 'list the shop itens',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		const guildConfig = require('../docs/assets/guildConfig.json')
		const guildIdBase = message.guild.id
		let guildId = guildIdBase
		if(guildConfig[guildIdBase].parentGuild.situation) {
			guildId = guildConfig[guildIdBase].parentGuild.id
		}
		const shop = require(`../docs/economy/${guildId}/shop.json`)
		let listShop = '`comprar <item> <quantidade>` para comprar item\n'

		for (const key in shop) {
			// eslint-disable-next-line no-prototype-builtins
			if (shop.hasOwnProperty(key)) {
				listShop += `${key}: <:Belly:633626593138442240>${shop[key]}\n`
			}
		}

		const embed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setDescription(listShop)
			.setThumbnail('https://res.cloudinary.com/teepublic/image/private/s--ntz_1CtK--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1500888679/production/designs/1761187_1.jpg')
			.setTitle('SHOP')
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		message.channel.send(embed)
	},
}