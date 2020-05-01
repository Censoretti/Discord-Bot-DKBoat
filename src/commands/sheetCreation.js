const Discord = require('discord.js')
const fs = require('fs').promises
const { rp, server } = require('../docs/assets/roles.json')

let truth = true

const one = '1️⃣'
const two = '2️⃣'
const three = '3️⃣'
const four = '4️⃣'
const five = '5️⃣'
const six = '6️⃣'
const seven = '7️⃣'
const eight = '8️⃣'
const nine = '9️⃣'
const ten = '🔟'
const poop = '🔱'
const snake = '🌊'
const wolf = '🐍'
const reactionName = [one, two, three, four, five, six, seven, eight, nine, ten, poop, snake, wolf]
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
		.setDescription('Por algum motivo não conseguimos receber as informações\nReutilize o comando e tente novamente')

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
		.setDescription(`${one}: marinha\n${two}: pirata\n${three}: justiceiro`)

	const mRumo = await message.author.send(embed)
	await mRumo.react(one)
	await mRumo.react(two)
	await mRumo.react(three)

	try{
		const reactions = await mRumo.awaitReactions(reaction =>
			reaction.emoji.name === one
      || reaction.emoji.name === two
      || reaction.emoji.name === three, { max: 2, time: 60000 })
		for (const reacts of reactionName) {
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
		case one:
			role = rp.course.marine.marine // marinheiro
			await message.member.roles.add(role)
			role = rp.course.marine.apprentice // marinheiro aprendiz
			await message.member.roles.add(role)
			course = 'marinha'
			break;
		case two:
			role = rp.course.pirate // pirata
			await message.member.roles.add(role)
			course = 'pirata'
			break;
		case three:
			role = rp.course.punisher // justiceiro
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
		.setDescription(`${one}: gigante\n${two}: humano\n${three}: Longlimb Human\n${four}: mink\n${five}: sereia\n${six}: skypeans\n${seven}: three-eye\n${eight}: tonttata\n${nine}: long arm\n${ten}: long leg\n${poop}: snake neck\n${snake}: tritão\n${wolf}: wotan`)

	const mRaca = await message.author.send(embed)
	await mRaca.react(one)
	await mRaca.react(two)
	await mRaca.react(three)
	await mRaca.react(four)
	await mRaca.react(five)
	await mRaca.react(six)
	await mRaca.react(seven)
	await mRaca.react(eight)
	await mRaca.react(nine)
	await mRaca.react(ten)
	await mRaca.react(poop)
	await mRaca.react(snake)
	await mRaca.react(wolf)

	try{
		const reactions = await mRaca.awaitReactions(reaction =>
			reaction.emoji.name === one
      || reaction.emoji.name === two
      || reaction.emoji.name === three
      || reaction.emoji.name === four
      || reaction.emoji.name === five
      || reaction.emoji.name === six
      || reaction.emoji.name === seven
      || reaction.emoji.name === eight
      || reaction.emoji.name === nine
      || reaction.emoji.name === ten
      || reaction.emoji.name === poop
      || reaction.emoji.name === snake
      || reaction.emoji.name === wolf, { max: 2, time: 60000 })
		for (const reacts of reactionName) {
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
		case one:
			role = rp.race.giant // gigante
			await message.member.roles.add(role)
			race = 'gigante'
			raceSheet = 'giant'
			break;
		case two:
			role = rp.race.human // humano
			await message.member.roles.add(role)
			message.author.send('done')
			race = 'humano'
			raceSheet = 'human'
			break;
		case three:
			role = rp.race.longLimb // longlimb human
			await message.member.roles.add(role)
			message.author.send('done')
			race = 'longlimb human'
			raceSheet = 'longLimb'
			break;
		case four:
			role = rp.race.mink // mink
			await message.member.roles.add(role)
			race = 'mink'
			raceSheet = 'mink'
			break;
		case five:
			role = rp.race.mermaid // sereia
			await message.member.roles.add(role)
			race = 'sereia'
			raceSheet = 'mermaid'
			break;
		case six:
			role = rp.race.sypeans // skypeans
			await message.member.roles.add(role)
			race = 'skypean'
			raceSheet = 'skypeans'
			break;
		case seven:
			role = rp.race.eyes // three-eye
			await message.member.roles.add(role)
			race = 'three-eye'
			raceSheet = 'eyes'
			break;
		case eight:
			role = rp.race.tonttata // tonttata
			await message.member.roles.add(role)
			race = 'tonttata'
			raceSheet = 'tonttata'
			break;
		case nine:
			role = rp.race.arm // long arm
			await message.member.roles.add(role)
			race = 'long arm'
			raceSheet = 'arm'
			break;
		case ten:
			role = rp.race.leg // long leg
			await message.member.roles.add(role)
			race = 'long leg'
			raceSheet = 'leg'
			break;
		case poop:
			role = rp.race.snake // snake neck
			await message.member.roles.add(role)
			race = 'snake neck'
			raceSheet = 'snake'
			break;
		case snake:
			role = rp.race.fishMan // tritão
			await message.member.roles.add(role)
			race = 'tritão'
			raceSheet = 'fishMan'
			break;
		case wolf:
			role = rp.race.wotan // wotan
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
		.setDescription(`${one}: capitão\n${two}: navegador\n${three}: arqueólogo\n${four}: cozinheiro\n${five}: engenheiro\n${six}: médico\n${seven}: músico`)

	const mOficio = await message.author.send(embed)
	await mOficio.react(one)
	await mOficio.react(two)
	await mOficio.react(three)
	await mOficio.react(four)
	await mOficio.react(five)
	await mOficio.react(six)
	await mOficio.react(seven)

	try{
		const reactions = await mOficio.awaitReactions(reaction =>
			reaction.emoji.name === one
      || reaction.emoji.name === two
      || reaction.emoji.name === three
      || reaction.emoji.name === four
      || reaction.emoji.name === five
      || reaction.emoji.name === six
      || reaction.emoji.name === seven, { max: 2, time: 60000 })
		for (const reacts of reactionName) {
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
		case one:
			role = rp.clas.capitan // capitão
			await message.member.roles.add(role)
			clas = 'capitão'
			break;
		case two:
			role = rp.clas.navigator // navegador
			await message.member.roles.add(role)
			message.author.send('done')
			clas = 'navegador'
			break;
		case three:
			role = rp.clas.arch // arqueólogo
			await message.member.roles.add(role)
			message.author.send('done')
			clas = 'arquólogo'
			break;
		case four:
			role = rp.clas.chef // cozinheiro
			await message.member.roles.add(role)
			clas = 'cozinheiro'
			break;
		case five:
			role = rp.clas.engineer // engenheiro
			await message.member.roles.add(role)
			clas = 'engenheiro'
			break;
		case six:
			role = rp.clas.doctor // médico
			await message.member.roles.add(role)
			clas = 'médico'
			break;
		case seven:
			role = rp.clas.musician // musico
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