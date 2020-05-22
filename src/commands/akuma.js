/* eslint-disable no-unused-vars */
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
		let returnTest = false

		if(admPass) {
			if(args[0]) {
				if(args[0] == 'add'
				|| args[0] == 'adicionar') {
					try {
						let newAkumaName = ''
						message.reply('Qual akuma tu quer adicionar?\nEscreva \'sair\' para sair')
						await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
							.then(collected => {
								const response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
								if(response === 'Exit' || response === 'Sair') return returnTest = true
								if(akuma.details[response]) {
									returnTest = true
									return message.channel.send('Ja existe essa ai, cabeça')
								} else {
									newAkumaName = response
								}
							})
							.catch(err => {
								returnTest = true
								message.channel.send('Huummm.... Lerdo d+....')
							})
						if(returnTest) return

						let newAkumaRank = 'rank'
						let newAkumaRankDetail
						message.channel.send(`Qual o rank da ${newAkumaName}?(b/a/s/ss)\n Escreva 'sair' para sair`)
						await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
							.then(collected => {
								const response = collected.first().content.toLowerCase()
								if(response === 'exit' || response === 'sair') return returnTest = true
								if(response == 'b' || response == 'a' || response == 's' || response == 'ss') {
									newAkumaRankDetail = response
									return newAkumaRank += response.toUpperCase()
								} else {
									returnTest = true
									return message.channel.send('Esse rank não existe...')
								}
							})
							.catch(err => {
								returnTest = true
								message.channel.send('Huummm.... Lerdo d+....')
							})
						if(returnTest) return

						let description = ''
						message.channel.send(`Qual a descrição da ${newAkumaName}?`)
						await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
							.then(collected => {
								const response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
								if(response == 'Sair' || response == 'Exit') return returnTest = true
								description = response
							})
							.catch(err => {
								returnTest = true
								message.channel.send('Hummmm..... Lerdo d+....')
							})
						if(returnTest) return

						let photo
						message.channel.send(`Como é a ${newAkumaName}? (foto, link da imagem)`)
						await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
							.then(collected => {
								const response = collected.first().content
								if(response == 'sair' || response == 'exit') return returnTest = true
								photo = response
							})
							.catch(err => {
								returnTest = true
								message.channel.send('Hummmm..... Lerdo d+....')
							})

						akuma[newAkumaRank].push(newAkumaName)
						akuma.details[newAkumaName] = {
							'name': newAkumaName,
							'rank': newAkumaRankDetail,
							'description': description,
							'photo': photo,
							'owner': 'none',
						}
						await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', JSON.stringify(akuma))
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
					message.reply('Qual akuma tu quer deletar?')
					await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
						.then(async collected => {
							const response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
							if(akuma.details[response]) {
								const rankToDelete = 'rank' + akuma.details[response].rank.toUpperCase()
								akuma[rankToDelete].splice(akuma[rankToDelete].indexOf(response), 1)
								delete akuma.details[response]
								await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', JSON.stringify(akuma))
									.then(console.log(`Akuma ${response} removed`))
									.catch(err => console.log(err))
								returnTest = true
								return message.channel.send(`Akuma ${response} deletada com sucesso`)
							} else {
								returnTest = true
								return message.channel.send('Akuma não existe no nosso data base :)')
							}
						})
						.catch(err => {
							returnTest = true
							return message.channel.send('Tempo esgotado.....')
						})
					if(returnTest) return
				} else if(args[0] == 'edit'
				|| args[0] == 'editar') {
					message.reply('Qual akuma tu quer editar?')
					await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
						.then(async collected => {
							let response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
							if(!akuma.details[response]) {
								returnTest = true
								return message.channel.send('Existe essa dai não :v')
							} else {
								const akumaFile = akuma.details[response]
								const embed = new Discord.MessageEmbed()
									.setColor('#00ff00')
									.setTitle(`${akumaFile.name} rank ${akumaFile.rank}`)
									.setDescription(`${akumaFile.description}\nPortador: ${akumaFile.owner}`)
									.setThumbnail(akumaFile.photo)
									.setTimestamp()
									.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

								message.channel.send('O que tu quer editar?')
								await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
									.then(async collected2 => {
										let what = ''
										response = collected2.first().content.toLowerCase
										if(response == 'nome'
										|| response == 'name') {
											what = 'name'
										} else if(response == 'descrição'
										|| response == 'descricao'
										|| response == 'description') {
											what = 'description'
										} else if(response == 'foto'
										|| response == 'photo') {
											what = 'photo'
										} else if(response == 'portador'
										|| response == 'dono'
										|| response == 'owner') {
											what = 'owner'
										} else {
											returnTest = true
											return message.channel.send('Vê direito o que tu quer ai, isso não existe')
										}

										message.channel.send('E como você quer que fique?')
										await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 })
											.then(async collected3 => {
												response = collected3.first().content
												akumaFile[what] = response
												await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', JSON.stringify(akuma))
													.then(console.log(`Akuma ${akumaFile.name} edited`))
													.catch(err => console.log(err))
												return message.channel.send(`Akuma ${akumaFile} editada com sucesso`)
											})
									})
									.catch(err => {
										return
									})
							}
						})
						.catch(err => {
							returnTest = true
							return message.channel.send('Lerdeza em pessoa, cansei de esperar....')
						})
					if(returnTest) return
				}
			}
		}
		if(args[0]) {
			if(args[0] == 'view'
			|| args[0] == 'ver'
			|| args[0] == 'visualizar') {
				message.reply('Qual akuma ou rank tu quer ver?(b/a/s/ss)\n\'Sair\' para sair')
				await message.channel.awaitMessages(msg => msg.author.id == message.author.id, { max: 1, time: 10000 })
					.then(collected => {
						const response = collected.first().content.charAt(0).toUpperCase() + collected.first().content.toLowerCase().slice(1)
						if(response == 'Exit' || response == 'Sair') return returnTest = true
						if(akuma.details[response]) {
							const akumaFile = akuma.details[response]
							const embed = new Discord.MessageEmbed()	
								.setColor('#00ff00')
								.setTitle(`${akumaFile.name} rank ${akumaFile.rank}`)
								.setDescription(`${akumaFile.description}\nPortador: ${akumaFile.owner}`)
								.setThumbnail(akumaFile.photo)
								.setTimestamp()
								.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')
							return message.channel.send(embed)
						} else if(response == 'B' || response == 'A' || response == 'S' || response == 'Ss') {
							let akumas = ''
							const rankFile = akuma['rank' + response]
							for(const akumaName of rankFile) {
								if(akuma.details[akumaName].owner == 'none') {
									akumas += `${akumaName}\n`
								} else {
									akumas += `${akumaName} (${akuma.details[akumaName].owner})\n`
								}
							}
							const embed = new Discord.MessageEmbed()
								.setColor('#00ff00')
								.setTitle(`Akumas do rank${response}`)
								.setDescription(akumas)
								.setThumbnail()
								.setTimestamp()
								.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

							return message.channel.send(embed)
						} else {
							returnTest = true
							return message.channel.send('Rank ou akuma inexistente.')
						}
					})
					.catch(err => {
						returnTest = true
						return message.channel.send('Eeeee... Acabou o tempo....')
					})
				if(returnTest) return
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