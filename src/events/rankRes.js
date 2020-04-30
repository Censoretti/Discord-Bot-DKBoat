const fs = require('fs').promises

module.exports = {
	name: 'rankRes',
	description: 'get rank of str',
	usage: '',
	execute: async () => {
		const rankRes = require('../docs/ranks/rankRes.json')
		const docsFiles = await fs.readdir('src/docs/sheets')
		docsFiles.pop()
		let user
		let compare
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`)
			rankRes.users[user.server.id].level = user.rp.stats.resistencia
		}
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			for (const files of docsFiles) {
				compare = require(`../docs/sheets/${files}`)
				if (user.server.id != compare.server.id) {
					if (user.rp.stats.resistencia > compare.rp.stats.resistencia) {
						if (rankRes.users[user.server.id]['rank'] > 1) {
							rankRes.users[user.server.id]['rank']++
							rankRes.users[compare.server.id]['rank']--
						}
					}
				}
			}
		}

		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			if(rankRes.users[user.server.id]['rank'] <= 10) {
				switch(rankRes.users[user.server.id]['rank']) {
				case 1:
					rankRes.rank['1st'].name = user.server.username
					rankRes.rank['1st'].level = user.rp.stats.resistencia
					break
				case 2:
					rankRes.rank['2nd'].name = user.server.username
					rankRes.rank['2nd'].level = user.rp.stats.resistencia
					break
				case 3:
					rankRes.rank['3rd'].name = user.server.username
					rankRes.rank['3rd'].level = user.rp.stats.resistencia
					break
				case 4:
					rankRes.rank['4th'].name = user.server.username
					rankRes.rank['4th'].level = user.rp.stats.resistencia
					break
				case 5:
					rankRes.rank['5th'].name = user.server.username
					rankRes.rank['5th'].level = user.rp.stats.resistencia
					break
				case 6:
					rankRes.rank['6th'].name = user.server.username
					rankRes.rank['6th'].level = user.rp.stats.resistencia
					break
				case 7:
					rankRes.rank['7th'].name = user.server.username
					rankRes.rank['7th'].level = user.rp.stats.resistencia
					break
				case 8:
					rankRes.rank['8th'].name = user.server.username
					rankRes.rank['8th'].level = user.rp.stats.resistencia
					break
				case 9:
					rankRes.rank['9th'].name = user.server.username
					rankRes.rank['9th'].level = user.rp.stats.resistencia
					break
				case 10:
					rankRes.rank['10th'].name = user.server.username
					rankRes.rank['10th'].level = user.rp.stats.resistencia
					break
				default:
					break
				}
			}
		}

		const data = JSON.stringify(rankRes)
		await fs.writeFile('src/docs/ranks/rankRes.json', data)
			.then(console.log('rank Res got updated'))
			.catch(err => console.log(err))
	},
}