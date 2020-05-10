const fs = require('fs').promises
const role = require('../docs/assets/628028186709458945/roles.json')

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
	onRP: 'on',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		// console.log()
		// return
		// eslint-disable-next-line no-unreachable
		if(message.member.roles.cache.has(role.server.noSheet)) return
		let whatis = ''
		const sheet = require(`../docs/sheets/${message.author.id}.json`)
		let truth = true
		let limit = false
		if(sheet.rp.race == 'giant') limit = true
		if(sheet.rp.training.daily < 3) {
			if(args[0] == 'forca'
      || args[0] == 'força'
      || args[0] == 'for'
      || args[0] == 'strength'
      || args[0] == 'str'
      || args[0] == 'f') {
				whatis = 'força'
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
			} else if(args[0] == 'resistencia'
      || args[0] == 'res'
      || args[0] == 'resistence'
      || args[0] == 'resistência'
      || args[0] == 'r') {
				whatis = 'resistencia'
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
					.then(console.log(`train ${args[0]} ${message.author.username}`))
					.then(message.channel.send(`treinamento de ${whatis}`))
					.catch(err => console.log(err))
			}
		} else {
			message.channel.send('Você ja treinou o suficiente hoje, não acha?')
		}

		require('../events/rankUpdate').execute(message.guild.id)
	},
};