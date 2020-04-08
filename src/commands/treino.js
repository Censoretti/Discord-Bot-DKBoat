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
  cooldown: 1,
  guildOnly: true,
  args: true,
	execute: async (message, args) => {
    if(message.member.roles.cache.has(role.server.noSheet)) return
    const sheet = require(`../docs/sheets/${message.author.id}.json`)
    let truth = true
    console.log(args)
    if(sheet.rp.training.daily < 3) {
      if(args[0] == 'forca'
      || args[0] == 'força'
      || args[0] == 'for'
      || args[0] == 'strength'
      || args[0] == 'str'
      || args[0] == 'f') {
        sheet.rp.stats.forca += 10
        sheet.rp.stats.total += 10
        await message.member.roles.add(role.rp.train)
        wait(10000)
        await message.member.roles.remove(role.rp.train)
      } else if(args[0] == 'destreza'
      || args[0] == 'dex'
      || args[0] == 'dexterity'
      || args[0] == 'des'
      || args[0] == 'd') {
        sheet.rp.stats.destreza += 10
        sheet.rp.stats.total += 10
        await message.member.roles.add(role.rp.train)
        wait(10000)
        await message.member.roles.remove(role.rp.train)
      } else if(args[0] == 'resistencia'
      || args[0] == 'res'
      || args[0] == 'resistence'
      || args[0] == 'resistência'
      || args[0] == 'r') {
        sheet.rp.stats.resistencia += 10
        sheet.rp.stats.total += 10
        await message.member.roles.add(role.rp.train)
        wait(10000)
        await message.member.roles.remove(role.rp.train)
      } else if(args[0] == 'velocidade'
      || args[0] == 'vel'
      || args[0] == 'speed'
      || args[0] == 'spd'
      || args[0] == 'v'
      || args[0] == 's') {
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

      if(truth) {
        sheet.rp.training.daily += 1
        const data = JSON.stringify(sheet)

        await fs.writeFile(`src/docs/sheets/${message.author.id}.json`, data)
          .then(console.log(`train ${args[0]} ${message.author.username}`))
          .catch(err => console.log(err))
      }
    } else {
      message.channel.send('Você ja treinou o suficiente hoje, não acha?')
    }
	},
};