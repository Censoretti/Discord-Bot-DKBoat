const fs = require('fs').promises
const role = require('../docs/assets/roles.json')

function wait(ms) {
  const time = new Date().getTime();
  let end = time;
  while(end < time + ms) {
    end = new Date().getTime();
 }
}

module.exports = {
	name: 'treino',
  description: 'Ping!',
  aliases: ['train'],
  cooldown: 60,
  guildOnly: true,
  args: true,
  usage: 'força',
	execute: async (message, args) => {
    if(message.member.roles.cache.has(role.server.noSheet)) return
    let whatis = ''
    const argh = args[0].toLowerCase()
    const sheet = require(`../docs/sheets/${message.author.id}.json`)
    let truth = true
    console.log(args)
    if(sheet.rp.training.daily < 3) {
      if(argh == 'forca'
      || argh == 'força'
      || argh == 'for'
      || argh == 'strength'
      || argh == 'str'
      || argh == 'f') {
        whatis = 'força'
        sheet.rp.stats.forca += 10
        sheet.rp.stats.total += 10
        await message.member.roles.add(role.rp.train)
        wait(10000)
        await message.member.roles.remove(role.rp.train)
      } else if(argh == 'destreza'
      || argh == 'dex'
      || argh == 'dexterity'
      || argh == 'des'
      || argh == 'd') {
        whatis = 'destreza'
        sheet.rp.stats.destreza += 10
        sheet.rp.stats.total += 10
        await message.member.roles.add(role.rp.train)
        wait(10000)
        await message.member.roles.remove(role.rp.train)
      } else if(argh == 'resistencia'
      || argh == 'res'
      || argh == 'resistence'
      || argh == 'resistência'
      || argh == 'r') {
        whatis = 'resistencia'
        sheet.rp.stats.resistencia += 10
        sheet.rp.stats.total += 10
        await message.member.roles.add(role.rp.train)
        wait(10000)
        await message.member.roles.remove(role.rp.train)
      } else if(argh == 'velocidade'
      || argh == 'vel'
      || argh == 'speed'
      || argh == 'spd'
      || argh == 'v'
      || argh == 's') {
        whatis = 'velocidade'
        sheet.rp.stats.velocidade += 10
        sheet.rp.stats.total += 10
        await message.member.roles.add(role.rp.train)
        wait(10000)
        await message.member.roles.remove(role.rp.train)
      } else {
        message.channel.send('Argumento inválido')
        truth = false
        return
      }

      const total = sheet.rp.stats.total
      const base = sheet.rp.stats.race
      const test = total - base

      if((test % 30) == 0) {
        sheet.rp.level++
        console.log(`${sheet.rp.name} upou para o lv ${sheet.rp.level}`)
      }

      if(truth) {
        sheet.rp.training.daily += 1
        const data = JSON.stringify(sheet)

        await fs.writeFile(`src/docs/sheets/${message.author.id}.json`, data)
          .then(console.log(`train ${argh} ${message.author.username}`))
          .then(message.channel.send(`treinamento de ${whatis}`))
          .catch(err => console.log(err))
      }
    } else {
      message.channel.send('Você ja treinou o suficiente hoje, não acha?')
    }
	},
};