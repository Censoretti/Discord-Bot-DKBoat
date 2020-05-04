const fs = require('fs').promises

const { rp } = require('../docs/assets/628028186709458945/roles.json')
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
		const template = require('../docs/sheets/_template.json')

		sheet.rp = template.rp

		for (const role of rolesF) {
			if(message.guild.members.cache.get(args[0]).roles.cache.has(role)) {
				await message.guild.members.cache.get(args[0]).roles.remove(role)
			}
		}

		const data = JSON.stringify(sheet)
		await fs.writeFile(`src/docs/sheets/${args[0]}.json`, data)
			.then(console.log(`reset sheet of ${message.author.username}`))
			.then(message.channel.send('done'))
			.catch(err => console.log(err))
	},
};