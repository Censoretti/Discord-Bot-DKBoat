const fs = require('fs').promises

const { rp } = require('../docs/assets/roles.json')
const rolesF = [
	rp.course.marine.marine.id, rp.course.marine.apprentice.id, rp.course.pirate.id, rp.course.punisher.id,
	rp.race.giant.id, rp.race.human.id, rp.race.longLimb.id, rp.race.mink.id,
	rp.race.mermaid.id, rp.race.skypeans.id, rp.race.eyes.id, rp.race.tonttata.id,
	rp.race.arm.id, rp.race.leg.id, rp.race.snake.id, rp.race.fishMan.id,
	rp.race.wotan.id, rp.clas.capitan.id, rp.clas.navigator.id, rp.clas.arch.id,
	rp.clas.chef.id, rp.clas.engineer.id, rp.clas.doctor.id, rp.clas.musician.id]

module.exports = {
	name: 'delete',
	aliases: ['deletar'],
	description: 'remove sheet from someone',
	// usage: '',
	role: 'adm',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		const sheet = require(`../docs/sheets/${args[0]}.json`)

		sheet.rp.name = 'none'
		sheet.rp.gender = 'none'
		sheet.rp.appearance = 'none'
		sheet.rp.course = 'none'
		sheet.rp.race = 'none'
		sheet.rp.clas.name = 'none'
		sheet.rp.clas.level = 0
		sheet.rp.weapon.has = false
		sheet.rp.weapon.name = 'none'
		sheet.rp.akuma.has = false
		sheet.rp.akuma.name = 'none'
		sheet.rp.crew.has = false
		sheet.rp.crew.name = 'none'
		sheet.rp.money = 3000
		sheet.rp.wanted.situation = false
		sheet.rp.wanted.position = 0
		sheet.rp.wanted.reward = 0
		sheet.rp.haki.observation.has = false
		sheet.rp.haki.observation.level = 0
		sheet.rp.haki.armament.has = false
		sheet.rp.haki.armament.level = 0
		sheet.rp.haki.conqueror.has = false
		sheet.rp.haki.conqueror.level = 0
		sheet.rp.roukushik.soru.has = false
		sheet.rp.roukushik.soru.level = 0
		sheet.rp.roukushik.kamie.has = false
		sheet.rp.roukushik.kamie.level = 0
		sheet.rp.roukushik.shigan.has = false
		sheet.rp.roukushik.shigan.level = 0
		sheet.rp.roukushik.tekkai.has = false
		sheet.rp.roukushik.tekkai.level = 0
		sheet.rp.roukushik.rankyaku.has = false
		sheet.rp.roukushik.rankyaku.level = 0
		sheet.rp.roukushik.geppo.has = false
		sheet.rp.roukushik.geppo.level = 0
		sheet.rp.roukushik.rokuogan.has = false
		sheet.rp.roukushik.rokuogan.level = 0
		sheet.rp.level = 0
		sheet.rp.stats.forca = 0
		sheet.rp.stats.destreza = 0
		sheet.rp.stats.resistencia = 0
		sheet.rp.stats.velocidade = 0
		sheet.rp.stats.total = 0
		sheet.rp.stats.race = 0
		sheet.rp.skills.one.has = false
		sheet.rp.skills.one.name = 'none'
		sheet.rp.skills.one.usage = 'none'
		sheet.rp.skills.two.has = false
		sheet.rp.skills.two.name = 'none'
		sheet.rp.skills.two.usage = 'none'
		sheet.rp.skills.three.has = false
		sheet.rp.skills.three.name = 'none'
		sheet.rp.skills.three.usage = 'none'
		sheet.rp.skills.four.has = false
		sheet.rp.skills.four.name = 'none'
		sheet.rp.skills.four.usage = 'none'
		sheet.rp.skills.five.has = false
		sheet.rp.skills.five.name = 'none'
		sheet.rp.skills.five.usage = 'none'
		sheet.rp.training.daily = 0
		sheet.rp.training.frota = 0
		sheet.rp.inventory = {}

		for (const roles of rolesF) {
			await message.guild.members.cache.get(args[0]).roles.remove(roles)
		}

		const data = JSON.stringify(sheet)
		await fs.writeFile(`src/docs/sheets/${args[0]}.json`, data)
			.then(console.log(`reset sheet of ${message.author.username}`))
			.then(message.channel.send('done'))
			.catch(err => console.log(err))
	},
};