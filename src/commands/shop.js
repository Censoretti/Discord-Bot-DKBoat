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

					const verifyMessage = await message.channel.send('Qual item tu quer adicionar?')
					const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
					const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
					if(shop[response]) {
						return message.channel.send(`Item ja ta em venda com o valor de: <:Belly:633626593138442240>${shop[response]}`)
					}

					const verifyMessage2 = await message.channel.send(`Qual vai ser o valor do ${response}?\nSem o <:Belly:633626593138442240> por favor só o valor`)
					const responseMessage2 = await verifyMessage2.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
					const response2 = responseMessage2.first().content
					shop[response] = response2
					const data = JSON.stringify(shop)
					await fs.writeFile(`src/docs/economy/${guildId}/shop.json`, data)
						.then(console.log(`add ${response} to shop with ${response2} bellys`))
						.catch(err => console.log(err))

					return message.channel.send(`Adicionado ${response} no valor de: ${response2} bellys`)
				} 
			} 
			if(managerPass) {
				if(args[0] == 'remove'
				|| args[0] == 'remover') {
					const verifyMessage = await message.channel.send('Qual item tu quer remover?')
					const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
					const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
					if(!shop[response]) {
						return message.channel.send('Esse item não existe não')
					}

					delete shop[response]

					const data = JSON.stringify(shop)
					await fs.writeFile(`src/docs/economy/${guildId}/shop.json`, data)
						.then(console.log(`${response} deleted from shop`))
						.catch(err => console.log(err))
						
				} else if(args[0] == 'edit'
				|| args[0] == 'editar') {
					const verifyMessage = await message.channel.send('Qual item tu quer editar?')
					const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
					const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
					if(!shop[response]) {
						return message.channel.send('Esse item não existe não')
					}

					message.channel.send(`O ${response} tem o valor de ${shop[response]}`)
					const verifyMessage2 = await message.channel.send('O que tu quer editar?')
					const responseMessage2 = await verifyMessage2.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
					const response2 = responseMessage2.first().content
					if(response2 == 'name'
					|| response2 == 'nome') {
						const verifyMessage3 = await message.channel.send('Qual o novo nome?')
						const responseMessage3 = await verifyMessage3.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						const response3 = responseMessage3.first().content.charAt(0).toUpperCase() + responseMessage3.first().content.toLowerCase().slice(1)
						if(shop[response3]) {
							return message.channel.send('Ja existe')
						}
						shop[response3] = shop[response]
						delete shop[response]
						message.channel.send(`Agora temos o ${response3} com o valor de ${shop[response3]}`)
					} else if(response2 == 'valor'
					|| response2 == 'belly'
					|| response2 == 'bellys') {
						const verifyMessage3 = await message.channel.send('Qual o novo valor?\nSem o <:Belly:633626593138442240> por favor só o valor')
						const responseMessage3 = await verifyMessage3.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						const response3 = responseMessage3.first().content
						shop[response] = response3
						message.channel.send(`Agora temos o ${response} com o valor de ${shop[response]}`)
					}

					const data = JSON.stringify(shop)
					await fs.writeFile(`src/docs/economy/${guildId}/shop.json`, data)
						.then(console.log(`${response} deleted from shop`))
						.catch(err => console.log(err))
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