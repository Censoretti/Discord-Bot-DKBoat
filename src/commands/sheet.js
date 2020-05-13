const Discord = require('discord.js')
const fs = require('fs').promises
const guildConfig = require('../docs/assets/guildConfig.json')

module.exports = {
	name: 'ficha',
	description: 'criação de ficha',
	guildOnly: true,
	usage: '',
	aliases: ['sheet'],
	args: true,
	// onRP: off,
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const guildId = message.guild.id

		if(guildConfig[guildId].parentGuild.situation) {
			return message.channel.send('Não é aqui que vc tem q criar sua ficha, é no servidor principal')
		}

		if(args[0] == 'show'
		|| args[0] == 'snipe'
		|| args[0] == 'show'
		|| args[0] == 'analisar') {
			let userId
			let sheet
	
			if (!message.mentions.users.size) {
				userId = message.author.id
			} else {
				message.mentions.users.map(user => { userId = user.id });
			}
	
			try {
				sheet = require(`../docs/sheets/${userId}.json`)
			} catch(err) {
				console.log(err)
				return message.channel.send('não tem ficha desse cara ai não parceiro')
			}

			let ar = 'o'
			if(sheet.rp.gender == 'feminino') {
				ar = 'a'
			} else if(sheet.rp.gender == 'outros') {
				ar = 'e'
			}

			let stats = ''

			switch(sheet.rp.race) {
			case('giant'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade}`
				break
			case('human'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade}`
				break
			case('longLimb'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade + 20} com bônus)`
				break
			case('mink'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade}`
				break
			case('mermaid'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade} (em água: ${sheet.rp.stats.velocidade * 2}, em terra: ${sheet.rp.stats.velocidade / 2})`
				break
			case('skypeans'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade}`
				break
			case('eyes'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza} (${sheet.rp.stats.destreza + 20} com bônus)  
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade}`
				break
			case('tonttata'):
				stats = `Força: ${sheet.rp.stats.forca} (${sheet.rp.stats.forca / 2} válidos)
						Destreza: ${sheet.rp.stats.destreza} (${sheet.rp.stats.destreza + 15} com bônus)  
						Resistencia: ${sheet.rp.stats.resistencia} (${sheet.rp.stats.resistencia / 2} válidos)
						Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade / 2} válidos)`
				break
			case('arm'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade}`
				break
			case('leg'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade + 20} com bônus)`
				break
			case('snake'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade}`
				break
			case('fishMan'):
				stats = `Força: ${sheet.rp.stats.forca}
						Destreza: ${sheet.rp.stats.destreza}
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade} (em água: ${sheet.rp.stats.velocidade * 2})`
				break
			case('wotan'):
				stats = `Força: ${sheet.rp.stats.forca} (${sheet.rp.stats.forca * 1.5} válidos)
						Destreza: ${sheet.rp.stats.destreza} (${sheet.rp.stats.destreza / 2} válidos)
						Resistencia: ${sheet.rp.stats.resistencia}
						Velocidade: ${sheet.rp.stats.velocidade} (${sheet.rp.stats.velocidade + 15} com bônus)`
				break
			}
	
			const embed = new Discord.MessageEmbed()
				.setColor('#00ff00')
				.setTitle(`Ficha d${ar}: ${sheet.rp.name}`)
				.setDescription(stats)
				.addFields(
					{ name: 'Rumo: ', value: `${sheet.rp.course}`, inline: true },
					{ name: 'Raça: ', value: `${sheet.rp.race}`, inline: true },
					{ name: 'Ofício: ', value: `${sheet.rp.clas.name}`, inline: true },
				)
				.setImage(`${sheet.rp.appearance}`)
				.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')
				.setTimestamp()
	
			return message.channel.send(embed)

		} else if(args[0] == 'create'
		|| args[0] == 'criar') {
			try {
				const { stripIndents } = require('common-tags');
				const document = require('../docs/sheets/_template.json')
				const roles = require('../docs/assets/628028186709458945/roles.json')
				let tittle = 'Será que é hoje que conheceremos o proximo rei dos piratas?'
				let description = 
			stripIndents`Precisamos conhecer nosso novo nakama nesse servidor
			E nesse mundo que criaremos juntos
			Se prepare para se apresentar, e começar sua aventura
			POR GENTILEZA espere eu colocar todas os emojis
			Assim que aparecer o ❌ você pode escolher
			Cada parte vai ter 60s para você escolher
			Escolheu? Espera até aparecer a próxima parte
			Errou? Responde com sair ou reaja com ❌
			Siga todos os passos corretamente e terá sua ficha :3
			~~se quiser sair, só digitar sair ou reaja com ❌~~`
				const embed = new Discord.MessageEmbed()
					.setColor('#00ff00')
					.setThumbnail('https://cdn.discordapp.com/icons/628028186709458945/7bcc6c7a4f7bf746e400be79092b934b.webp')
					.setTitle(tittle)
					.setDescription(description)
					.setTimestamp()
					.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')
	
				
				await message.author.send(embed)
				wait(20000)
	
				tittle = 'Então vamos nos conhecer'
				description = 'Eu sou DKboat, qual seu nome?'
				embed.setTitle(tittle)
					.setDescription(description)
				let verifyMessage = await message.author.send(embed)
				let responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				let response = responseMessage.first().content
				if(response == 'sair'
			|| response == 'exit') {
					return message.author.send('Criaremos sua ficha depois então :3')
				}
				document.rp.name = response
	
				tittle = `Prazer em te conhecer ${response}`
				description = stripIndents`Eu sou um robo, mas você deve ter um gênero, certo?
																Qual seu gênero?
																(masculino/feminino/outro/f/m/o)`
				embed.setTitle(tittle)
					.setDescription(description)
				verifyMessage = await message.author.send(embed)
				responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				response = responseMessage.first().content.toLowerCase()
				let testResponse = true
				let pronome = 'o'
				while(testResponse) {
					if(response == 'masculino'
					|| response == 'm') {
						response = 'masculino'
						pronome = 'o'
						testResponse = false
					} else if(response == 'feminino'
					|| response == 'f') {
						response = 'feminino'
						pronome = 'a'
						testResponse = false
					} else if(response == 'outros'
					|| response == 'o') {
						response = 'outros'
						pronome = 'o'
						testResponse = false
					}else if(response == 'sair'
				|| response == 'exit') {
						return message.author.send('Criaremos sua ficha depois então :3')
					} else {
						tittle = 'Algo deu errado :('
						description = stripIndents`Vamos de novo, preciso saber seu gênero
																		As opções são: masculino, feminino
																		ou outros para não binario, para utilizarmos o pronome correto
																		para sua felicidade 'u'`
						embed.setTitle(tittle)
							.setDescription(description)
						verifyMessage = await message.author.send(embed)
						responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
						response = responseMessage.first().content.toLowerCase()
					}
				}
				document.rp.gender = response
	
	
				tittle = 'Perfeito'
				description = stripIndents`Você consegue me ver aqui >>
																Então agora eu quero saber como você se parece
																~~imagem da internet que o discord possa mostrar~~`
				embed.setTitle(tittle)
					.setDescription(description)
				verifyMessage = await message.author.send(embed)
				responseMessage = await verifyMessage.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
				response = responseMessage.first().content
				if(response == 'sair'
			|| response == 'exit') {
					return message.author.send('Criaremos sua ficha depois então :3')
				}
				document.rp.appearance = response
	
	
				if(document.rp.gender == 'feminino') {
					tittle = 'LIIIINDA DE MAIS'
				} else {
					tittle = 'LIIINDO DE MAIS'
				}
				description = 'Agora vem a parte divertida, o que você quer ser?\n'
				for(const course in roles.rp.course) {
					description += `${roles.rp.course[course].name.charAt(0).toUpperCase() + roles.rp.course[course].name.toLowerCase().slice(1)}? ${roles.rp.course[course].emoji}\n`
				}
	
			
				embed.setTitle(tittle)
					.setDescription(description)
					.setThumbnail(document.rp.appearance)
				verifyMessage = await message.author.send(embed)
				for(const course in roles.rp.course) {
					await verifyMessage.react(roles.rp.course[course].emoji)
				}
				await verifyMessage.react('❌')
				responseMessage = await verifyMessage.awaitReactions(reaction => reaction.emoji.name, { max: 2, time: 60000 })
				if(responseMessage.get('❌')) {
					removeRoles(message)
					if(responseMessage.get('❌').count > 1) return message.author.send('Criaremos sua ficha depois então :3')
				}
	
				for(const role in roles.rp.course) {
					if(responseMessage.get(roles.rp.course[role].emoji)) {
						response = roles.rp.course[role].name
						message.member.roles.add(roles.rp.course[role].id)
						break
					}
				}
				document.rp.course = response
	
				tittle = `Decicid${pronome} em`
				description = 'Agora vamos de oficio, cada um tem um buff diferente e uma mecanica também\n'
				for(const clas in roles.rp.clas) {
					description += `${roles.rp.clas[clas].name.charAt(0).toUpperCase() + roles.rp.clas[clas].name.toLowerCase().slice(1)}? ${roles.rp.clas[clas].emoji}\n`
				}
			
				embed.setTitle(tittle)
					.setDescription(description)
				verifyMessage = await message.author.send(embed)
				for(const clas in roles.rp.clas) {
					await verifyMessage.react(roles.rp.clas[clas].emoji)
				}
				await verifyMessage.react('❌')
				responseMessage = await verifyMessage.awaitReactions(reaction => reaction.emoji.name, { max: 2, time: 60000 })
				if(responseMessage.get('❌')) {
					removeRoles(message)
					if(responseMessage.get('❌').count > 1) return message.author.send('Criaremos sua ficha depois então :3')
				}
	
				for(const role in roles.rp.clas) {
					if(responseMessage.get(roles.rp.clas[role].emoji)) {
						response = roles.rp.clas[role].name
						message.member.roles.add(roles.rp.clas[role].id)
						break
					}
				}
				document.rp.clas.name = response
	
				tittle = `ÓTIMO você é rapid${pronome} 'u'`
				description = 'Agora você vai escolher sua raça, o que vai definir todos os seus stats, escolha sabiamente\n'
				for(const race in roles.rp.race) {
					description += `${roles.rp.race[race].name.charAt(0).toUpperCase() + roles.rp.race[race].name.toLowerCase().slice(1)}? ${roles.rp.race[race].emoji}\n`
				}
			
				embed.setTitle(tittle)
					.setDescription(description)
				verifyMessage = await message.author.send(embed)
				for(const race in roles.rp.race) {
					await verifyMessage.react(roles.rp.race[race].emoji)
				}
				await verifyMessage.react('❌')
				responseMessage = await verifyMessage.awaitReactions(reaction => reaction.emoji.name, { max: 2, time: 60000 })
				if(responseMessage.get('❌')) {
					removeRoles(message)
					if(responseMessage.get('❌').count > 1) return message.author.send('Criaremos sua ficha depois então :3')
				}
	
				for(const role in roles.rp.race) {
					if(responseMessage.get(roles.rp.race[role].emoji)) {
						response = roles.rp.race[role].name
						const raceTemplate = require(`../docs/templates/${role}.json`)
						document.rp.stats.forca = raceTemplate.rp.stats.forca
						document.rp.stats.resistencia = raceTemplate.rp.stats.resistencia
						document.rp.stats.velocidade = raceTemplate.rp.stats.velocidade
						document.rp.stats.destreza = raceTemplate.rp.stats.destreza
						message.member.roles.add(roles.rp.race[role].id)
						break
					}
				}
				document.rp.race = response
	
				tittle = 'ESTA PRONTA AHAHAHAHAHAHAHHA'
				description = 'Reaja com ✅ se sim ou ❌ se não, na próxima mensagem'
				embed.setTitle(tittle)
					.setDescription(description)
				message.author.send(embed)
	
				if(document.rp.gender == 'outros') pronome = 'e'
				tittle = `Ficha d${pronome}: ${document.rp.name}`
				description = stripIndents`Stats:
																Força: ${document.rp.stats.forca}
																Destreza: ${document.rp.stats.destreza}
																Resistência: ${document.rp.stats.resistencia}
																Velocidade: ${document.rp.stats.velocidade}`
				embed.setTitle(tittle)
					.setDescription(description)
					.addFields(
						{ name: 'Rumo: ', value: `${document.rp.course}`, inline: true },
						{ name: 'Raça: ', value: `${document.rp.race}`, inline: true },
						{ name: 'Ofício: ', value: `${document.rp.clas.name}`, inline: true },
					)
			
				verifyMessage = await message.author.send(embed)
				await verifyMessage.react('✔️')
				await verifyMessage.react('❌')
				responseMessage = await verifyMessage.awaitReactions(reaction => reaction.emoji.name, { max: 2, time: 60000 })
				if(responseMessage.get('✔️')) {
					const data = JSON.stringify(document)
					await fs.writeFile(`src/docs/sheets/${message.author.id}.json`, data)
						.then('Created sheet to some other random guy')
						.catch(err => console.log(err))
	
					require('../events/getRank').execute(message.author.id, document, message.guild.id)
					return await message.guild.channels.cache.get('630296008018100224').send(embed)
				} else {
					removeRoles(message)
					return message.author.send('Que pena, estava ansioso pra ver esse personagem crescer :(')
				}
			} catch(err) {
				await message.author.send('Infelizmente deu algum tipo de erro\nRecomndo fortemente a tentar novamente\n~~Caso de erro MAIS de 2x, por gentileza, chame um adm~~')
				removeRoles(message)
				return console.log(err);
			}
		}


	},
}

function wait(ms) {
	const time = new Date().getTime();
	let end = time;
	while(end < time + ms) {
		end = new Date().getTime();
	}
}

async function removeRoles(message) {
	const roles = require('../docs/assets/628028186709458945/roles.json')
	for(const role in roles.rp.course) {
		if(message.member.roles.cache.has(roles.rp.course[role].id)) {
			message.member.roles.remove(roles.rp.course[role].id)
		}
	}
	for(const role in roles.rp.race) {
		if(message.member.roles.cache.has(roles.rp.race[role].id)) {
			message.member.roles.remove(roles.rp.race[role].id)
		}
	}
	for(const role in roles.rp.clas) {
		if(message.member.roles.cache.has(roles.rp.clas[role].id)) {
			message.member.roles.remove(roles.rp.clas[role].id)
		}
	}
	if(message.member.roles.cache.has(roles.rp.marineRank.apprentice)) {
		message.member.roles.remove(roles.rp.marineRank.apprentice)
	}
}