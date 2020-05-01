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
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		// console.log()
		// return
		// eslint-disable-next-line no-unreachable
		if(message.member.roles.cache.has(role.server.noSheet)) return
		let whatis = ''
		const argh = args[0].toLowerCase()
		const sheet = require(`../docs/sheets/${message.author.id}.json`)
		let truth = true
		let limit = false
		if(sheet.rp.race == 'giant') limit = true
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
				if(limit && (sheet.rp.stats.destreza < (sheet.rp.stats.resistencia / 2))) {
					sheet.rp.stats.destreza += 10
					sheet.rp.stats.total += 10
					await message.member.roles.add(role.rp.train)
					wait(10000)
					await message.member.roles.remove(role.rp.train)
				} else {
					timestamps = cooldowns.get('treino')
					if (timestamps.has(sheet.server.id)) {
						timestamps.delete(sheet.server.id)
					}
					return message.channel.send(`Você como gigante é INCAPAZ de melhorar a ${whatis} agora`)
				}
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
				if(limit && (sheet.rp.stats.destreza < (sheet.rp.stats.resistencia / 2))) {
					sheet.rp.stats.velocidade += 10
					sheet.rp.stats.total += 10
					await message.member.roles.add(role.rp.train)
					wait(10000)
					await message.member.roles.remove(role.rp.train)
					timestamps = cooldowns.get('treino')
					if (timestamps.has(sheet.server.id)) {
						timestamps.delete(sheet.server.id)
					}
				} else {
					return message.channel.send(`Você como gigante é INCAPAZ de melhorar a ${whatis} agora`)
				}
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

		require('./events/rankRP').execute()
		require('./events/rankDex').execute()
		require('./events/rankStr').execute()
		require('./events/rankSpd').execute()
		require('./events/rankRes').execute()
	},
};