const Discord = require('discord.js')
const fs = require('fs').promises
const { rp, server } = require('../docs/assets/roles.json')

let truth = true

let counter = 0
let whatis = ''
let role = ''

const docs = new Map()
let name = ''
let appearance = []
let gender = ''
let course = ''
let race = ''
let clas = ''
let raceSheet = ''

const check = '✔️'
const cross = '❌'


const reactionsCourse = [
	rp.course.marine.marine.emoji, rp.course.pirate.emoji, rp.course.punisher.emoji]

const reactionsRace = [
	rp.race.giant.emoji, rp.race.human.emoji, rp.race.longLimb.emoji, rp.race.mink.emoji,
	rp.race.mermaid.emoji, rp.race.skypeans.emoji, rp.race.eyes.emoji, rp.race.tonttata.emoji,
	rp.race.arm.emoji, rp.race.leg.emoji, rp.race.snake.emoji, rp.race.fishMan.emoji, rp.race.wotan.emoji]

const reactionsClas = [
	rp.clas.capitan.emoji, rp.clas.navigator.emoji, rp.clas.arch.emoji,
	rp.clas.chef.emoji, rp.clas.engineer.emoji, rp.clas.doctor.emoji, rp.clas.musician.emoji]

const rolesF = [
	rp.course.marine.marine.id, rp.course.marine.apprentice.id, rp.course.pirate.id, rp.course.punisher.id,
	rp.race.giant.id, rp.race.human.id, rp.race.longLimb.id, rp.race.mink.id,
	rp.race.mermaid.id, rp.race.skypeans.id, rp.race.eyes.id, rp.race.tonttata.id,
	rp.race.arm.id, rp.race.leg.id, rp.race.snake.id, rp.race.fishMan.id,
	rp.race.wotan.id, rp.clas.capitan.id, rp.clas.navigator.id, rp.clas.arch.id,
	rp.clas.chef.id, rp.clas.engineer.id, rp.clas.doctor.id, rp.clas.musician.id]

// eslint-disable-next-line no-unused-vars
async function nope(message, author) {
	const embed2 = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Ocorreu um erro')
		.setDescription('Por algum motivo não conseguimos receber as informações\nOu você recusous sua ficha e quer refazer\nReutilize o comando e tente novamente')

	message.author.send(embed2)

	for (const roles of rolesF) {
		message.member.roles.remove(roles)
	}
	truth = false
}

async function start(message) {
	if(!truth) return
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Será que é hoje que conheceremos o proximo rei dos piratas?')
		.setDescription('Precisamos conhecer nosso novo nakama nesse servidor\nE nesse mundo que criaremos juntos\nSe prepare para se apresentar, e começar sua aventura\nCada parte vai ter 60s para você escolher\nEscolheu? Espera até aparecer a próxima parte\nErrou? Não seleciona mais nada e espera\nSiga todos os passos corretamente e terá sua ficha :3')

	await message.author.send(embed)

}

async function nameF(message, author) {
	if(!truth) return
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Primeiro precisamos saber quem você é')
		.setDescription('Então você nos contará quem é você começando pelo nome:')

	const mNameF = await message.author.send(embed)

	try {
		const mName = await mNameF.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
		if(mName.first().content != undefined) {
			name = mName.first().content
		} else {
			nope(message, author)
			return
		}
		if(name == '') {
			nope(message, author)
			return
		}
	} catch (err) {
		console.log(err)
		nope(message, author)
	}
}

async function genderF(message, author) {
	if(!truth) return
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Agora seu gênero')
		.setDescription('Masculino ou Feminino?\nNão binario?\nVocê pode ser o que quiser')

	const mGenderF = await message.author.send(embed)

	try {
		const mGender = await mGenderF.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
		if(mGender.first().content != undefined) {
			gender = mGender.first().content
		} else {
			nope(message, author)
			return
		}
		if(gender == '') {
			nope(message, author)
			return
		}
	} catch (err) {
		console.log(err)
		nope(message, author)
	}
}

async function appearanceF(message, author) {
	if(!truth) return
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Agora como você se parece')
		.setDescription('Mande o link de uma imagem com a sua aparência')

	const mAppearanceF = await message.author.send(embed)

	try {
		const mAppearance = await mAppearanceF.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 60000 })
		if(mAppearance.first().content != undefined) {
			appearance = mAppearance.first().content
		} else {
			nope(message, author)
			return
		}
		if(appearance == '') {
			nope(message, author)
			return
		}
	} catch (err) {
		console.log(err)
		nope(message, author)
	}
}

async function rumo(message, author) {
	if(!truth) return
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Escolha seu rumo')
		.setDescription(`${rp.course.marine.marine.emoji}: marinha\n${rp.course.pirate.emoji}: pirata\n${rp.course.punisher.emoji}: justiceiro`)

	const mRumo = await message.author.send(embed)
	await mRumo.react(rp.course.marine.marine.emoji)
	await mRumo.react(rp.course.pirate.emoji)
	await mRumo.react(rp.course.punisher.emoji)

	try{
		const reactions = await mRumo.awaitReactions(reaction =>
			reaction.emoji.name === rp.course.marine.marine.emoji
      || reaction.emoji.name === rp.course.pirate.emoji
      || reaction.emoji.name === rp.course.punisher.emoji, { max: 2, time: 60000 })
		for (const reacts of reactionsCourse) {
			if (reactions.get(reacts) != undefined) {
				if(reactions.get(reacts).count == 2) {
					console.log(reacts, ': ', reactions.get(reacts).count)
					counter += 1
					whatis = reacts
				}
			} else {
				console.log(reacts, ': com valor de 0')
			}
		}
	} catch(err) {
		console.log(err)
		nope(message, author)
	}

	if (counter === 1) {
		switch(whatis) {
		case rp.course.marine.marine.emoji:
			role = rp.course.marine.marine.id // marinheiro
			await message.member.roles.add(role)
			role = rp.course.marine.apprentice // marinheiro aprendiz
			await message.member.roles.add(role)
			course = 'marinha'
			break;
		case rp.course.pirate.emoji:
			role = rp.course.pirate.id // pirata
			await message.member.roles.add(role)
			course = 'pirata'
			break;
		case rp.course.punisher.emoji:
			role = rp.course.punisher.id // justiceiro
			await message.member.roles.add(role)
			course = 'justiceiro'
			break;
		default:
			nope(message, author)
			throw 'something got wrong at courseF'
		}
	} else {
		nope(message, author)
		throw 'something got wrong at courseF'
	}
	counter = 0
}

async function raca(message, author) {
	if(!truth) return
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Escolha seu raça')
		.setDescription(`${rp.race.giant.emoji}: gigante\n${rp.race.human.emoji}: humano\n${rp.race.longLimb.emoji}: Longlimb Human\n
		${rp.race.mink.emoji}: mink\n${rp.race.mermaid.emoji}: sereia\n${rp.race.skypeans.emoji}: skypeans\n${rp.race.eyes.emoji}: three-eye\n${rp.race.tonttata.emoji}: tonttata\n
		${rp.race.arm.emoji}: long arm\n${rp.race.leg.emoji}: long leg\n
		${rp.race.snake.emoji}: snake neck\n${rp.race.fishMan.emoji}: tritão\n${rp.race.wotan.emoji}: wotan`)

	const mRaca = await message.author.send(embed)
	await mRaca.react(rp.race.giant.emoji)
	await mRaca.react(rp.race.human.emoji)
	await mRaca.react(rp.race.longLimb.emoji)
	await mRaca.react(rp.race.mink.emoji)
	await mRaca.react(rp.race.mermaid.emoji)
	await mRaca.react(rp.race.skypeans.emoji)
	await mRaca.react(rp.race.eyes.emoji)
	await mRaca.react(rp.race.tonttata.emoji)
	await mRaca.react(rp.race.arm.emoji)
	await mRaca.react(rp.race.leg.emoji)
	await mRaca.react(rp.race.snake.emoji)
	await mRaca.react(rp.race.fishMan.emoji)
	await mRaca.react(rp.race.wotan.emoji)

	try{
		const reactions = await mRaca.awaitReactions(reaction =>
			reaction.emoji.name === rp.race.giant.emoji
      || reaction.emoji.name === rp.race.human.emoji
      || reaction.emoji.name === rp.race.longLimb.emoji
      || reaction.emoji.name === rp.race.mink.emoji
      || reaction.emoji.name === rp.race.mermaid.emoji
      || reaction.emoji.name === rp.race.skypeans.emoji
      || reaction.emoji.name === rp.race.eyes.emoji
      || reaction.emoji.name === rp.race.tonttata.emoji
      || reaction.emoji.name === rp.race.arm.emoji
      || reaction.emoji.name === rp.race.leg.emoji
      || reaction.emoji.name === rp.race.snake.emoji
      || reaction.emoji.name === rp.race.fishMan.emoji
      || reaction.emoji.name === rp.race.wotan.emoji, { max: 2, time: 60000 })
		for (const reacts of reactionsRace) {
			if (reactions.get(reacts) != undefined) {
				if(reactions.get(reacts).count == 2) {
					console.log(reacts, ': ', reactions.get(reacts).count)
					counter += 1
					whatis = reacts
				}
			} else {
				console.log(reacts, ': com valor de 0')
			}
		}
	} catch(err) {
		console.log(err)
		nope(message, author)
	}

	if (counter === 1) {
		switch(whatis) {
		case rp.race.giant.emoji:
			role = rp.race.giant.id // gigante
			await message.member.roles.add(role)
			race = 'gigante'
			raceSheet = 'giant'
			break;
		case rp.race.human.emoji:
			role = rp.race.human.id // humano
			await message.member.roles.add(role)
			message.author.send('done')
			race = 'humano'
			raceSheet = 'human'
			break;
		case rp.race.longLimb.emoji:
			role = rp.race.longLimb.id // longlimb human
			await message.member.roles.add(role)
			message.author.send('done')
			race = 'longlimb human'
			raceSheet = 'longLimb'
			break;
		case rp.race.mink.emoji:
			role = rp.race.mink.id // mink
			await message.member.roles.add(role)
			race = 'mink'
			raceSheet = 'mink'
			break;
		case rp.race.mermaid.emoji:
			role = rp.race.mermaid.id // sereia
			await message.member.roles.add(role)
			race = 'sereia'
			raceSheet = 'mermaid'
			break;
		case rp.race.skypeans.emoji:
			role = rp.race.sypeans.id // skypeans
			await message.member.roles.add(role)
			race = 'skypean'
			raceSheet = 'skypeans'
			break;
		case rp.race.eyes.emoji:
			role = rp.race.eyes.id // three-eye
			await message.member.roles.add(role)
			race = 'three-eye'
			raceSheet = 'eyes'
			break;
		case rp.race.tonttata.emoji:
			role = rp.race.tonttata // tonttata
			await message.member.roles.add(role)
			race = 'tonttata'
			raceSheet = 'tonttata'
			break;
		case rp.race.arm.emoji:
			role = rp.race.arm.id // long arm
			await message.member.roles.add(role)
			race = 'long arm'
			raceSheet = 'arm'
			break;
		case rp.race.leg.emoji:
			role = rp.race.leg.id // long leg
			await message.member.roles.add(role)
			race = 'long leg'
			raceSheet = 'leg'
			break;
		case rp.race.snake.emoji:
			role = rp.race.snake.id // snake neck
			await message.member.roles.add(role)
			race = 'snake neck'
			raceSheet = 'snake'
			break;
		case rp.race.fishMan.emoji:
			role = rp.race.fishMan.id // tritão
			await message.member.roles.add(role)
			race = 'tritão'
			raceSheet = 'fishMan'
			break;
		case rp.race.wotan.emoji:
			role = rp.race.wotan.id // wotan
			await message.member.roles.add(role)
			race = 'wotan'
			raceSheet = 'wotan'
			break;
		default:
			nope(message, author)
			throw 'something got wrong at raceF'
		}
	} else {
		nope(message, author)
		throw 'something got wrong at raceF'
	}
	counter = 0
}

async function oficio(message, author) {
	if(!truth) return
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('Escolha seu oficio')
		.setDescription(`${rp.clas.capitan.emoji}: capitão\n${rp.clas.navigator.emoji}: navegador\n${rp.clas.arch.emoji}: arqueólogo\n${rp.clas.chef.emoji}: cozinheiro\n${rp.clas.engineer.emoji}: engenheiro\n${rp.clas.doctor.emoji}: médico\n${rp.clas.musician.emoji}: músico`)

	const mOficio = await message.author.send(embed)
	await mOficio.react(rp.clas.capitan)
	await mOficio.react(rp.clas.navigator.emoji)
	await mOficio.react(rp.clas.arch.emoji)
	await mOficio.react(rp.clas.chef.emoji)
	await mOficio.react(rp.clas.engineer.emoji)
	await mOficio.react(rp.clas.doctor.emoji)
	await mOficio.react(rp.clas.musician.emoji)

	try{
		const reactions = await mOficio.awaitReactions(reaction =>
			reaction.emoji.name === rp.clas.capitan
      || reaction.emoji.name === rp.clas.navigator.emoji
      || reaction.emoji.name === rp.clas.arch.emoji
      || reaction.emoji.name === rp.clas.chef.emoji
      || reaction.emoji.name === rp.clas.engineer.emoji
      || reaction.emoji.name === rp.clas.doctor.emoji
      || reaction.emoji.name === rp.clas.musician.emoji, { max: 2, time: 60000 })
		for (const reacts of reactionsClas) {
			if (reactions.get(reacts) != undefined) {
				if(reactions.get(reacts).count == 2) {
					console.log(reacts, ': ', reactions.get(reacts).count)
					counter += 1
					whatis = reacts
				}
			} else {
				console.log(reacts, ': com valor de 0')
			}
		}
	} catch(err) {
		console.log(err)
		nope(message, author)
	}

	if (counter === 1) {
		switch(whatis) {
		case rp.clas.capitan:
			role = rp.clas.capitan.id // capitão
			await message.member.roles.add(role)
			clas = 'capitão'
			break;
		case rp.clas.navigator.emoji:
			role = rp.clas.navigator.id // navegador
			await message.member.roles.add(role)
			message.author.send('done')
			clas = 'navegador'
			break;
		case rp.clas.arch.emoji:
			role = rp.clas.arch.id // arqueólogo
			await message.member.roles.add(role)
			message.author.send('done')
			clas = 'arquólogo'
			break;
		case rp.clas.chef.emoji:
			role = rp.clas.chef.id // cozinheiro
			await message.member.roles.add(role)
			clas = 'cozinheiro'
			break;
		case rp.clas.engineer.emoji:
			role = rp.clas.engineer.id // engenheiro
			await message.member.roles.add(role)
			clas = 'engenheiro'
			break;
		case rp.clas.doctor.emoji:
			role = rp.clas.doctor.id // médico
			await message.member.roles.add(role)
			clas = 'médico'
			break;
		case rp.clas.musician.emoji:
			role = rp.clas.musician.id // musico
			await message.member.roles.add(role)
			clas = 'musico'
			break;
		default:
			nope(message, author)
			throw 'something got wrong at classF'
		}
	} else {
		nope(message, author)
		throw 'something got wrong at classF'
	}
	counter = 0
}

// eslint-disable-next-line no-unused-vars
async function checks(message, author) {
	if(!truth) return
	const embed3 = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setTitle('PRECISO SABER O QUE VOCÊ ACHA DA SUA FICHA')
		.setDescription(`reaja com ✅ se sim ou ${cross} se não, na próxima mensagem`)

	await message.author.send(embed3)
}

async function recordCreation(message, author) {
	if(!truth) return
	const docsFiles = await fs.readdir('src/docs/sheets')
	for (const file of docsFiles) {
		const document = require(`../docs/sheets/${file}`);
		docs.set(document.server.id, document);
	}

	let document

	if(docs.get(author)) {
		document = docs.get(author)
	} else {
		document = docs.get('template')
		document.server.id = author
	}
	document.rp.name = name
	document.rp.gender = gender
	document.rp.appearance = appearance
	document.rp.course = course
	document.rp.race = race
	document.rp.clas = clas

	const embed4 = new Discord.MessageEmbed()
		.setColor('#00ff00')
		.setTitle(`Ficha de: ${document.rp.name}`)
		.setDescription(`do gênero: ${document.rp.gender}`)
		.addFields(
			{ name: 'Rumo: ', value: `${document.rp.course}`, inline: true },
			{ name: 'Raça: ', value: `${document.rp.race}`, inline: true },
			{ name: 'Ofício: ', value: `${document.rp.clas}`, inline: true },
		)
		.setImage(`${document.rp.appearance}`)
		.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')
		.setTimestamp()

	const mRecord = await message.author.send(embed4)
	await mRecord.react(check)
	await mRecord.react(cross)

	try{
		const reactions = await mRecord.awaitReactions(reaction =>
			reaction.emoji.name === check
      || reaction.emoji.name === cross, { max: 2, time: 60000 })
		if(reactions.get(check) != undefined) {
			if(reactions.get(check).count == 2) {
				await message.guild.channels.cache.get('630296008018100224') // fichas aprovadas
					.send(embed4)

				await message.member.roles.remove(server.noSheet)

				const baseData = require(`../docs/templates/${raceSheet}.json`)

				document.rp.stats.forca = baseData.rp.stats.forca
				document.rp.stats.destreza = baseData.rp.stats.destreza
				document.rp.stats.resistencia = baseData.rp.stats.resistencia
				document.rp.stats.velocidade = baseData.rp.stats.velocidade
				document.rp.stats.total = baseData.rp.stats.total
				document.rp.stats.race = baseData.rp.stats.race

				const data = JSON.stringify(document)
				await fs.writeFile(`src/docs/sheets/${author}.json`, data)
					.then(console.log(`Created record to ${message.author.username}`))
					.catch(err => console.log(err))

				console.log(`Create a new sheet to ${message.author.username} as ${document.rp.name}`)
			}
		} else if(reactions.get(cross) != undefined) {
			if(reactions.get(cross).count == 2) {
				nope(message, author)
			}
		} else {
			nope(message, author)
		}
	} catch(err) {
		console.log(err)
		nope(message, author)
	}
}

function wait(ms) {
	const time = new Date().getTime();
	let end = time;
	while(end < time + ms) {
		end = new Date().getTime();
	}
}

async function creation(message, author) {
	try {
		await start(message, author)
		await wait(20000)
		console.log(`start for ${message.author.username}`)
		await nameF(message, author)
		console.log(`nameF for ${message.author.username}`)
		await genderF(message, author)
		console.log(`genderF for ${message.author.username}`)
		await appearanceF(message, author)
		console.log(`appearanceF for ${message.author.username}`)
		await rumo(message, author)
		console.log(`rumo for ${message.author.username}`)
		await raca(message, author)
		console.log(`raca for ${message.author.username}`)
		await oficio(message, author)
		console.log(`oficio for ${message.author.username}`)
		await checks(message, author)
		await wait(1000)
		console.log(`checks for ${message.author.username}`)
		await recordCreation(message, author)
		console.log(`recordCreation for ${message.author.username}`)
	} catch(err) {
		console.log(err)
	}
}

module.exports = {
	name: 'ficha',
	description: 'criação de ficha',
	guildOnly: true,
	usage: '',
	aliases: ['criar'],
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		if(!message.member.roles.cache.has(server.noSheet)) {
			console.log('has a role')
			message.channel.send('Você ja tem ficha feita')
			return
		}
		const author = message.author.id
		creation(message, author)
	},
}