const fs = require('fs').promises

module.exports = {
	name: 'rankSpd',
	description: 'get rank of str',
	usage: '',
	execute: async () => {
		const rankSpd = require('../docs/ranks/rankSpd.json')
		const docsFiles = await fs.readdir('src/docs/sheets')
		docsFiles.pop()
		let user
		let compare
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`)
			rankSpd.users[user.server.id].level = user.rp.stats.velocidade
		}
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			for (const files of docsFiles) {
				compare = require(`../docs/sheets/${files}`)
				if (user.server.id != compare.server.id) {
					if (user.rp.stats.velocidade > compare.rp.stats.velocidade) {
						if (rankSpd.users[user.server.id]['rank'] > 1) {
							rankSpd.users[user.server.id]['rank']++
							rankSpd.users[compare.server.id]['rank']--
						}
					}
				}
			}
		}

		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			if(rankSpd.users[user.server.id]['rank'] <= 10) {
				switch(rankSpd.users[user.server.id]['rank']) {
				case 1:
					rankSpd.rank['1st'].name = user.server.username
					rankSpd.rank['1st'].level = user.rp.stats.velocidade
					break
				case 2:
					rankSpd.rank['2nd'].name = user.server.username
					rankSpd.rank['2nd'].level = user.rp.stats.velocidade
					break
				case 3:
					rankSpd.rank['3rd'].name = user.server.username
					rankSpd.rank['3rd'].level = user.rp.stats.velocidade
					break
				case 4:
					rankSpd.rank['4th'].name = user.server.username
					rankSpd.rank['4th'].level = user.rp.stats.velocidade
					break
				case 5:
					rankSpd.rank['5th'].name = user.server.username
					rankSpd.rank['5th'].level = user.rp.stats.velocidade
					break
				case 6:
					rankSpd.rank['6th'].name = user.server.username
					rankSpd.rank['6th'].level = user.rp.stats.velocidade
					break
				case 7:
					rankSpd.rank['7th'].name = user.server.username
					rankSpd.rank['7th'].level = user.rp.stats.velocidade
					break
				case 8:
					rankSpd.rank['8th'].name = user.server.username
					rankSpd.rank['8th'].level = user.rp.stats.velocidade
					break
				case 9:
					rankSpd.rank['9th'].name = user.server.username
					rankSpd.rank['9th'].level = user.rp.stats.velocidade
					break
				case 10:
					rankSpd.rank['10th'].name = user.server.username
					rankSpd.rank['10th'].level = user.rp.stats.velocidade
					break
				default:
					break
				}
			}
		}

		const data = JSON.stringify(rankSpd)
		await fs.writeFile('src/docs/ranks/rankSpd.json', data)
			.then(console.log('rank Spd got updated'))
			.catch(err => console.log(err))
	},
}