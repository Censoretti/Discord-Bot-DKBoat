module.exports = {
	name: 'akuma',
	description: 'template',
	// aliases: ['flush'],
	// cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	role: 'manager',
	// onRP: 'off',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const akuma = require('../docs/assets/628028186709458945/akumas.json')
		const fs = require('fs').promises
		const Discord = require('discord.js')

		if(admPass) {
			if(args[0]) {
				if(args[0] == 'add'
				|| args[0] == 'adicionar') {
					try {
						const verifyMessage = await message.channel.send('Qual akuma tu quer adicionar?')
						const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
						if(akuma.details[response]) {
							return message.channel.send('Akuma ja existe cabeção')
						}
						const verifyMessage2 = await message.channel.send('Qual rank da akuma?')
						const responseMessage2 = await verifyMessage2.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						const response2 = responseMessage2.first().content.toLowerCase()
						let rankType = ''
						if(response2 == 'rankb'
						|| response2 == 'b'
						|| response2 == 'rank b') {
							akuma.rankB.push(response)
							rankType = 'b'
						} else if(response2 == 'ranka'
						|| response2 == 'a'
						|| response2 == 'rank a') {
							akuma.rankA.push(response)
							rankType = 'a'
						} else if(response2 == 'ranks'
						|| response2 == 's'
						|| response2 == 'rank s') {
							akuma.rankS.push(response)
							rankType = 's'
						} else if(response2 == 'rankss'
						|| response2 == 'ss'
						|| response2 == 'rank ss') {
							akuma.rankSS.push(response)
							rankType = 'ss'
						} else {
							return message.channel.send('Q?')
						}

						akuma.details[response] = {
							'name': response,
							'rank': rankType,
							'description': 'none',
							'photo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Icon_None.svg/768px-Icon_None.svg.png',
							'owner': 'none',
						}

						const data = JSON.stringify(akuma)
						await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', data)
							.then(console.log('akuma add'))
							.catch(err => console.log(err))
						
						return message.channel.send('akuma adicionada')
					} catch(err) {
						console.log(err)
						return message.channel.send('TEMPO ESGOTADO')
					}
				}
			}
		}
		if(managerPass) {
			if(args[0]) {
				if(args[0] == 'remove'
				|| args[0] == 'remover'
				|| args[0] == 'splice') {
					try {
						const verifyMessage = await message.channel.send('Qual akuma tu quer deletar?')
						const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
						if(akuma.details[response]) {
							let rankType = ''
							if(akuma.details[response].rank == 'b') {
								akuma.rankB.push(response)
								rankType = 'rankB'
							} else if(akuma.details[response].rank == 'a') {
								akuma.rankA.push(response)
								rankType = 'rankA'
							} else if(akuma.details[response].rank == 's') {
								akuma.rankS.push(response)
								rankType = 'rankS'
							} else if(akuma.details[response].rank == 'ss') {
								akuma.rankSS.push(response)
								rankType = 'rankSS'
							}

							akuma[rankType].splice(akuma[rankType].indexOf(response), 1)
							delete akuma.details[response]
							const data = JSON.stringify(akuma)
							await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', data)
								.then(console.log('akuma removed'))
								.catch(err => console.log(err))
							
							return message.channel.send('akuma adicionada')
						} else {
							return message.channel.send('Akuma não existe cabeção')	
						}
					} catch(err) {
						console.log(err)
						return message.channel.send('TEMPO ESGOTADO')
					}
				} else if(args[0] == 'edit'
				|| args[0] == 'editar') {
					try {
						const verifyMessage = await message.channel.send('Qual akuma tu quer editar?')
						const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
						if(!akuma.details[response]) return message.channel.send('Não existe, cabeça')

						const akumaFile = akuma.details[response]
						const embed = new Discord.MessageEmbed()
							.setColor('#00ff00')
							.setTitle(`${akumaFile.name} rank ${akumaFile.rank}`)
							.setDescription(`${akumaFile.description}\nPossuidor: ${akumaFile.owner}`)
							.setThumbnail(akumaFile.photo)
							.setTimestamp()
							.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

						await message.channel.send(embed)

						const verifyMessage2 = await message.channel.send('O que você quer editar?')
						const responseMessage2 = await verifyMessage2.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						let response2 = responseMessage2.first().content.toLowerCase()
						if(response2 == 'nome') {
							response2 = 'name'
						} else if(response2 == 'descrição'
						|| response2 == 'descricao') {
							response2 = 'description'
						} else if(response2 == 'foto') {
							response2 = 'photo'
						} else if(response2 == 'possesor'
						|| response2 == 'dono') {
							response2 = 'owner'
						} 
						if(!akuma.details[response][response2]) return message.channel.send('Assim não da, existe isso não, corrige ai')

						const verifyMessage3 = await message.channel.send('Como vc quer que fique?')
						const responseMessage3 = await verifyMessage3.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						const response3 = responseMessage3.first().content
						akuma.details[response][response2] = response3

						const data = JSON.stringify(akuma)
						await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', data)
							.then(console.log('akuma edited'))
							.catch(err => console.log(err))

						const akumaFile2 = akuma.details[response]
						const embed2 = new Discord.MessageEmbed()
							.setColor('#00ff00')
							.setTitle(`${akumaFile2.name} rank ${akumaFile2.rank}`)
							.setDescription(`${akumaFile2.description}\nPossuidor: ${akumaFile2.owner}`)
							.setThumbnail(akumaFile2.photo)
							.setTimestamp()
							.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

						message.channel.send('Ficou assim:')
						return message.channel.send(embed2)
					} catch(err) {
						console.log(err)
						return message.channel.send('TEMPO ESGOTADO')
					}

				}
			}
		}
		if(args[0]) {
			if(args[0] == 'view'
			|| args[0] == 'ver'
			|| args[0] == 'visualizar') {
				try {
					const verifyMessage = await message.channel.send('Qual akuma ou rank você quer verificar sobre?')
					const responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
					const response = responseMessage.first().content.charAt(0).toUpperCase() + responseMessage.first().content.toLowerCase().slice(1)
					if(akuma.details[response]) {
						const akumaFile = akuma.details[response]
						const embed = new Discord.MessageEmbed()
							.setColor('#00ff00')
							.setTitle(`${akumaFile.name} rank ${akumaFile.rank}`)
							.setDescription(`${akumaFile.description}\nPossuidor: ${akumaFile.owner}`)
							.setThumbnail(akumaFile.photo)
							.setTimestamp()
							.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

						return message.channel.send(embed)
					} else { 
						let akumas = ''
						let title = ''
						if(response == 'b'
						|| response == 'rankb'
						|| response == 'rank b') {
							title = 'rank B'
							const rankFile = akuma.rankB
							for(const akumaName of rankFile) {
								if(akuma.details[akumaName].owner == 'none') {
									akumas += `${akumaName}\n`
								} else {
									akumas += `${akumaName} (${akuma.details[akumaName].owner})\n`
								}
							}
						} else if(response == 'a'
						|| response == 'ranka'
						|| response == 'rank a') {
							title = 'rank A'
							const rankFile = akuma.rankA
							for(const akumaName of rankFile) {
								if(akuma.details[akumaName].owner == 'none') {
									akumas += `${akumaName}\n`
								} else {
									akumas += `${akumaName} (${akuma.details[akumaName].owner})\n`
								}
							}
							
						} else if(response == 's'
						|| response == 'ranks'
						|| response == 'rank s') {
							title = 'rank S'
							const rankFile = akuma.rankS
							for(const akumaName of rankFile) {
								if(akuma.details[akumaName].owner == 'none') {
									akumas += `${akumaName}\n`
								} else {
									akumas += `${akumaName} (${akuma.details[akumaName].owner})\n`
								}
							}
							
						} else if(response == 'ss'
						|| response == 'rankss'
						|| response == 'rank ss') {
							title = 'rank SS'
							const rankFile = akuma.rankSS
							for(const akumaName of rankFile) {
								if(akuma.details[akumaName].owner == 'none') {
									akumas += `${akumaName}\n`
								} else {
									akumas += `${akumaName} (${akuma.details[akumaName].owner})\n`
								}
							}
							
						} else {
							return message.channel.send('Nenhuma akuma ou rank com esse nome')
						}
						const embed = new Discord.MessageEmbed()
							.setColor('#00ff00')
							.setTitle(`Akumas ${title}`)
							.setDescription(akumas)
							.setThumbnail()
							.setTimestamp()
							.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

						return message.channel.send(embed)
					} 
				} catch(err) {
					console.log(err)
					return message.channel.send('TEMPO ESGOTADO')
				}
			} else if(args[0] == 'random'
			|| args[0] == 'abrir'
			|| args[0] == 'open'
			|| args[0] == 'get') {
				const sheet = require(`../docs/sheets/${message.author.id}.json`)
				if(sheet.rp.inventory.akumaRoll) {
					// eslint-disable-next-line no-inner-declarations
					function getRandomInt() {
						return Math.floor(Math.random() * Math.floor(akuma[sheet.rp.inventory.akumaRoll].length + 1));
					}
					const akumaR = akuma[sheet.rp.inventory.akumaRoll][getRandomInt()]

					delete sheet.rp.inventory.akumaRoll
					const data = JSON.stringify(sheet)
					await fs.writeFile(`src/docs/sheets/${message.author.id}.json`, data)
						.then(`akumaroll delete, sheet of ${sheet.server.username} update`)
						.catch(err => console.log(err))
					return message.channel.send(akumaR)
				} else {
					return message.channel.send('Tu não tem roll de akuma não')
				}
			}
		}
	},
};