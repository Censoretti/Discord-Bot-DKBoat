const Discord = require('discord.js')


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
const poop = '💩'
const snake = '🐍'
const wolf = '🐺'
const reactionName = [one, two, three, four, five, six, seven, eight, nine, ten, poop, snake, wolf]
let counter = 0
let whatis = ''
let role = ''
let nome = ''
let apearence = ''

const rolesF = [
  '646821665379975201', '674402631304609793', '646821646270988288', '646821696199720970',
  '646821874352783380', '646821906678284299', '646821921136050176', '646821940866318349',
  '646821959740424192', '646821977511952384', '646822000798597140']
/*
rumo
  marinha: 646821665379975201, 674402631304609793
  pirata 646821646270988288
  justiceiro 646821696199720970

raça
  Gigante
  Humano
  Longlimb Human
  Mink
  Sereia
  Skypeans
  Three-Eye
  Tonttata
  Long Arm
  Long Leg
  Snake Neck
  Tritão
  Wotan

oficio
  capitão 646821874352783380
  navegador 646821906678284299
  arqueólogo 646821921136050176
  cozinheiro 646821940866318349
  engenheiro 646821959740424192
  médico 646821977511952384
  músico 646822000798597140

*/

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

}

async function rumo(message, author) {
	const embed = new Discord.MessageEmbed()
    .setColor('00ff00')
    .setTitle('Escolha seu rumo')
		.setDescription(`${one}: marinha\n${two}: pirata\n${three}: justiceiro`)

  const mRumo = await message.author.send(embed)
  await mRumo.react(one)
  await mRumo.react(two)
  await mRumo.react(three)

  try{
    const reactions = await mRumo.awaitReactions(reaction => reaction.emoji.name === one
      || reaction.emoji.name === two
      || reaction.emoji.name === three, { max: 3, time: 5000 })
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
  }

  if (counter === 1) {
    switch(whatis) {
      case one:
        role = '646821665379975201' // marinheiro
        await message.member.roles.add(role)
        role = '674402631304609793' // marinheiro aprendiz
        await message.member.roles.add(role)
        break;
      case two:
        role = '646821646270988288' // pirata
        await message.member.roles.add(role)
        break;
      case three:
        role = '646821696199720970' // justiceiro
        await message.member.roles.add(role)
        break;
      default:
        nope(message, author)
        return;
    }
  } else {
    nope(message, author)
  }
  counter = 0
}

async function raca(message, author) {
	const embed = new Discord.MessageEmbed()
    .setColor('00ff00')
    .setTitle('Escolha seu raça')
		.setDescription(`${one}: marinha\n${two}: pirata\n${three}: justiceiro`)

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
      || reaction.emoji.name === wolf, { max: 3, time: 5000 })
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
  }

  if (counter === 1) {
    switch(whatis) {
      case one:
        role = '654413751650353153' // gigante
        await message.member.roles.add(role)
        break;
      case two:
        role = '654413751650353153' // humano
        await message.member.roles.add(role)
        message.author.send('done')
        break;
      case three:
        role = '654413751650353153' // longlimb human
        await message.member.roles.add(role)
        message.author.send('done')
        break;
      case four:
        role = '654413751650353153' // mink
        await message.member.roles.add(role)
        break;
      case five:
        role = '654413751650353153' // sereia
        await message.member.roles.add(role)
        break;
      case six:
        role = '654413751650353153' // skypeans
        await message.member.roles.add(role)
        break;
      case seven:
        role = '654413751650353153' // three-eye
        await message.member.roles.add(role)
        break;
      case eight:
        role = '654413751650353153' // tonttata
        await message.member.roles.add(role)
        break;
      case nine:
        role = '654413751650353153' // long arm
        await message.member.roles.add(role)
        break;
      case ten:
        role = '654413751650353153' // long leg
        await message.member.roles.add(role)
        break;
      case poop:
        role = '654413751650353153' // snake neck
        await message.member.roles.add(role)
        break;
      case snake:
        role = '654413751650353153' // tritão
        await message.member.roles.add(role)
        break;
      case wolf:
        role = '654413751650353153' // wotan
        await message.member.roles.add(role)
        break;
      default:
        nope(message, author)
        return;
    }
  } else {
    nope(message, author)
  }
  counter = 0
}

async function creation(message, author) {
  try {
    await rumo(message, author)
    await raca(message, author)
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
	name: 'ficha',
	description: 'criação de ficha',
	guildOnly: true,
	usage: '',
	aliases: '',
	// args: true,
	execute(message) {
    const author = message.author.id
    creation(message, author)
    console.log('ficha')
	},
}