const Discord = require('discord.js')
const fs = require('fs').promises

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

const check = '✔️'
const cross = '❌'

const rolesF = [
  '646821665379975201', '674402631304609793', '646821646270988288', '646821696199720970',
  '695671528217509989', '695671531522621470', '695671534764818483', '695671537591910490',
  '695671540825456700', '695671543891624002', '695671546630635651', '695671549058875413',
  '695671552087294013', '695671554876506232', '695671557451939850', '695671559662338079',
  '695675031019061378', '646821874352783380', '646821906678284299', '646821921136050176',
  '646821940866318349', '646821959740424192', '646821977511952384', '646822000798597140']

/* roles:
rumo
  marinha: 646821665379975201, 674402631304609793
  pirata 646821646270988288
  justiceiro 646821696199720970

raça
  Gigante 695671528217509989
  Humano 695671531522621470
  Longlimb Human 695671534764818483
  Mink 695671537591910490
  Sereia 695671540825456700
  Skypeans 695671543891624002
  Three-Eye 695671546630635651
  Tonttata 695671549058875413
  Long Arm 695671552087294013
  Long Leg 695671554876506232
  Snake Neck 695671557451939850
  Tritão 695671559662338079
  Wotan 695675031019061378

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
  truth = false
}

async function start(message) {
  if(!truth) return
  const embed = new Discord.MessageEmbed()
  .setColor('00ff00')
  .setTitle('Será que é hoje que conheceremos o proximo rei dos piratas?')
  .setDescription('Precisamos conhecer nosso novo nakama nesse servidor\nE nesse mundo que criaremos juntos\nSe prepare para se apresentar, e começar sua aventura\nCada parte vai ter 10s para você escolher\nEscolheu? Espera até aparecer a próxima parte\nErrou? Não seleciona mais nada e espera\nSiga todos os passos corretamente e terá sua ficha :3')

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
    const mName = await mNameF.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 10000 })
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
    const mGender = await mGenderF.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 10000 })
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
    const mAppearance = await mAppearanceF.channel.awaitMessages(msg => msg.content, { max: 1, min: 1, time: 10000 })
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
      || reaction.emoji.name === three, { max: 2, time: 10000 })
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
        role = '646821665379975201' // marinheiro
        await message.member.roles.add(role)
        role = '674402631304609793' // marinheiro aprendiz
        await message.member.roles.add(role)
        course = 'marinha'
        break;
      case two:
        role = '646821646270988288' // pirata
        await message.member.roles.add(role)
        course = 'pirata'
        break;
      case three:
        role = '646821696199720970' // justiceiro
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
      || reaction.emoji.name === wolf, { max: 2, time: 10000 })
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
        role = '695671528217509989' // gigante
        await message.member.roles.add(role)
        race = 'gigante'
        break;
      case two:
        role = '695671531522621470' // humano
        await message.member.roles.add(role)
        message.author.send('done')
        race = 'humano'
        break;
      case three:
        role = '695671534764818483' // longlimb human
        await message.member.roles.add(role)
        message.author.send('done')
        race = 'longlimb human'
        break;
      case four:
        role = '695671537591910490' // mink
        await message.member.roles.add(role)
        race = 'mink'
        break;
      case five:
        role = '695671540825456700' // sereia
        await message.member.roles.add(role)
        race = 'sereia'
        break;
      case six:
        role = '695671543891624002' // skypeans
        await message.member.roles.add(role)
        race = 'skypean'
        break;
      case seven:
        role = '695671546630635651' // three-eye
        await message.member.roles.add(role)
        race = 'three-eye'
        break;
      case eight:
        role = '695671549058875413' // tonttata
        await message.member.roles.add(role)
        race = 'tonttata'
        break;
      case nine:
        role = '695671552087294013' // long arm
        await message.member.roles.add(role)
        race = 'long arm'
        break;
      case ten:
        role = '695671554876506232' // long leg
        await message.member.roles.add(role)
        race = 'long leg'
        break;
      case poop:
        role = '695671557451939850' // snake neck
        await message.member.roles.add(role)
        race = 'snake neck'
        break;
      case snake:
        role = '695671559662338079' // tritão
        await message.member.roles.add(role)
        race = 'tritão'
        break;
      case wolf:
        role = '695675031019061378' // wotan
        await message.member.roles.add(role)
        race = 'wotan'
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
      || reaction.emoji.name === seven, { max: 2, time: 10000 })
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
        role = '646821874352783380' // capitão
        await message.member.roles.add(role)
        clas = 'capitão'
        break;
      case two:
        role = '646821906678284299' // navegador
        await message.member.roles.add(role)
        message.author.send('done')
        clas = 'navegador'
        break;
      case three:
        role = '646821921136050176' // arqueólogo
        await message.member.roles.add(role)
        message.author.send('done')
        clas = 'arquólogo'
        break;
      case four:
        role = '646821940866318349' // cozinheiro
        await message.member.roles.add(role)
        clas = 'cozinheiro'
        break;
      case five:
        role = '646821959740424192' // engenheiro
        await message.member.roles.add(role)
        clas = 'engenheiro'
        break;
      case six:
        role = '646821977511952384' // médico
        await message.member.roles.add(role)
        clas = 'médico'
        break;
      case seven:
        role = '646822000798597140' // musico
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
  const docsFiles = await fs.readdir('bot/docs/messages')
  for (const file of docsFiles) {
      const document = require(`../docs/messages/${file}`);
      docs.set(document.id, document);
  }

  const document = docs.get('template')
  document.id = author
  document.name = name
  document.gender = gender
  document.appearance = appearance
  document.course = course
  document.race = race
  document.clas = clas

  const embed4 = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`Ficha de: ${document.name}`)
    .setDescription(`do gênero: ${document.gender}`)
    .addFields(
      { name: 'Rumo: ', value: `${document.course}`, inline: true },
      { name: 'Raça: ', value: `${document.race}`, inline: true },
      { name: 'Ofício: ', value: `${document.clas}`, inline: true },
    )
    .setImage(`${document.appearance}`)
    .setFooter('[Bot feito por Censoretti]', 'https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()

  const mRecord = await message.author.send(embed4)
  await mRecord.react(check)
  await mRecord.react(cross)

  try{
    const reactions = await mRecord.awaitReactions(reaction =>
      reaction.emoji.name === check
      || reaction.emoji.name === cross, { max: 3, time: 10000 })
      if(reactions.get(check) != undefined) {
        if(reactions.get(check).count == 2) {
          console.log('foi check')
          await message.guild.channels.cache.get('630296008018100224') // fichas aprovadas
            .send(embed4)

          const data = JSON.stringify(document)
          await fs.writeFile(`Bot/docs/messages/${author}.json`, data)
            .then(console.log(`Created record to ${message.author.username}`))
            .catch(err => console.log(err))
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
    await nameF(message, author)
    await genderF(message, author)
    await appearanceF(message, author)
    await rumo(message, author)
    await raca(message, author)
    await oficio(message, author)
    await checks(message, author)
    await wait(1000)
    await recordCreation(message, author)
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
    if(!message.member.roles.cache.has('646821612292931585')) {
      console.log('has a role')
      message.channel.send('Você não tem a permissão para utilizar o comando')
      return
    }
    const author = message.author.id
    creation(message, author)
    console.log('ficha')
	},
}