/* eslint-disable no-unused-vars */
const Discord = require('discord.js')
const fs = require('fs').promises

module.exports = {
	name: 'shop',
	description: 'list the shop itens',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const guildConfig = require('../docs/assets/guildConfig.json')
		const guildIdBase = message.guild.id
		let guildId = guildIdBase
		if(guildConfig[guildIdBase].parentGuild.situation) {
			guildId = guildConfig[guildIdBase].parentGuild.id
		}
		const shop = require(`../docs/economy/${guildId}/shop.json`)
		const document = require(`../docs/sheets/${message.author.id}.json`)
		if(args[0]) {
			if(admPass) {
				if(args[0] == 'add'
				|| args[0] == 'adicionar') {

					message.reply('Qual item tu quer adicionar?')
					await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
						.then(async collected => {
							if(collected.first().content.toLowerCase() === 'exit') return
							let response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
							if(shop[response]) return message.channel.send(`Ja temos ${response} no nosso shop`)
							const newItemName = response
							message.channel.send(`Qual o valor do ${response}?`)
							await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
								.then(async collected2 => {
									response = parseFloat(collected2.first().content)
									shop[newItemName] = response
									await fs.writeFile(`src/docs/economy/${guildId}/shop.json`, JSON.stringify(shop))
										.then(console.log(`Add ${newItemName} costing ${response} to shop`))
										.catch(err => console.log(err))

									return message.channel.send(`Adicionado ${newItemName} no valor de: ${response} bellys`)
								})
								.catch(err => {
									return message.channel.send('Tempo esgotado...')
								})
						})
						.catch(err => {
							return message.channel.send('Lerdeza em pessoa...')
						})
				} 
			} 
			if(managerPass) {
				if(args[0] == 'remove'
				|| args[0] == 'remover') {
					message.reply('Qual item tu quer remover?')
					await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
						.then(async collected => {
							const response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
							if(!shop[response]) return message.channel.send('Existe esse item não')
							delete shop[response]
							await fs.writeFile(`src/docs/economy/${guildId}/shop.json`, JSON.stringify(shop))
								.then(console.log(`${response} deleted from shop`))
								.catch(err => console.log(err))
							return message.channel.send(`${response} deletado com sucesso`)
						})
						.catch(err => { return message.channel.send('Esgotou o seu tempo :(') })
				
				} else if(args[0] == 'edit'
				|| args[0] == 'editar') {
					message.reply('Qual item tu quer editar?')
					await message.channel.awaitMessages(msg => msg.author.id === message.author.send, { max: 1, time: 10000 })
						.then(async collected => {
							let response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
							if(response == 'Exit' || response == 'Sair') return
							const itemName = response
							if(!shop[response]) return message.channel.send('Editar item que não existe como?')
							message.channel.send(`O ${response} tem o valor de ${shop[response]}\n Qual o valor novo?`)
							await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
								.then(async collected2 => {
									response = parseFloat(collected2.first().content)
									shop[itemName] = response
									await fs.writeFile(`src/docs/economy/${guildId}/shop.json`, JSON.stringify(shop))
										.then(console.log(`${response} deleted from shop`))
										.catch(err => console.log(err))
									return message.channel.send(`Alterado o valor de ${itemName} com sucesso`)
								})
								.catch(err => { return message.channel.send('Sem tempo pra você irmão') })
						})
						.catch(err => { return message.channel.send('E acabou o seu tempo...') })
				}
			} else if(args[0] == 'buy'
				|| args[0] == 'comprar') {
				let money = document.rp.money
				let quantity
				if(args[2]) {
					quantity = args[2]
				} else {
					quantity = 1
				}

				if(shop[args[1]]) {
					if(money >= shop[args[1]]) {
						money -= (shop[args[1]] * quantity)
					} else {
						return message.channel.send('Você ta pobre, da pra comprar isso não')
					}
				} else {
					return message.channel.send('Esse item não existe, ve ai de novo maninho')
				}

				document.rp.money = money
				document.rp.inventory[args[1]] += quantity

				const data = JSON.stringify(document)
				await fs.writeFile(`src/docs/sheets/${message.author.id}.json`, data)
					.then(console.log(`buyed ${quantity} of ${args[1]} to ${message.author.username}`))
					.catch(err => console.log(err))
					
				return message.channel.send('adicionado')
			}
		} else {
			let listShop = `\`${process.env.PREFIX}shop comprar <item> <quantidade>\` para comprar item\n`
			for (const key in shop) {
				// eslint-disable-next-line no-prototype-builtins
				if (shop.hasOwnProperty(key)) {
					listShop += `${key}: <:Belly:633626593138442240>${shop[key]}\n`
				}
			}
			listShop += `\nVocê tem <:Belly:633626593138442240>${document.rp.money}`
			const embed = new Discord.MessageEmbed()
				.setColor('#00ff00')
				.setDescription(listShop)
				.setThumbnail('https://res.cloudinary.com/teepublic/image/private/s--ntz_1CtK--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1500888679/production/designs/1761187_1.jpg')
				.setTitle('SHOP')
				.setTimestamp()
				.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

			return message.channel.send(embed)
		}
	},
}