const fs = require('fs').promises

module.exports = {
	name: 'rankDex',
	description: 'get rank of str',
	usage: '',
	execute: async () => {
		const rankDex = require('../docs/ranks/rankDex.json')
		const docsFiles = await fs.readdir('src/docs/sheets')
		docsFiles.pop()
		let user
		let compare
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`)
			rankDex.users[user.server.id].level = user.rp.stats.destreza
		}
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			for (const files of docsFiles) {
				compare = require(`../docs/sheets/${files}`)
				if (user.server.id != compare.server.id) {
					if (user.rp.stats.destreza > compare.rp.stats.destreza) {
						if (rankDex.users[user.server.id]['rank'] > 1) {
							rankDex.users[user.server.id]['rank']++
							rankDex.users[compare.server.id]['rank']--
						}
					}
				}
			}
		}

		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			if(rankDex.users[user.server.id]['rank'] <= 10) {
				switch(rankDex.users[user.server.id]['rank']) {
				case 1:
					rankDex.rank['1st'].name = user.server.username
					rankDex.rank['1st'].level = user.rp.stats.destreza
					break
				case 2:
					rankDex.rank['2nd'].name = user.server.username
					rankDex.rank['2nd'].level = user.rp.stats.destreza
					break
				case 3:
					rankDex.rank['3rd'].name = user.server.username
					rankDex.rank['3rd'].level = user.rp.stats.destreza
					break
				case 4:
					rankDex.rank['4th'].name = user.server.username
					rankDex.rank['4th'].level = user.rp.stats.destreza
					break
				case 5:
					rankDex.rank['5th'].name = user.server.username
					rankDex.rank['5th'].level = user.rp.stats.destreza
					break
				case 6:
					rankDex.rank['6th'].name = user.server.username
					rankDex.rank['6th'].level = user.rp.stats.destreza
					break
				case 7:
					rankDex.rank['7th'].name = user.server.username
					rankDex.rank['7th'].level = user.rp.stats.destreza
					break
				case 8:
					rankDex.rank['8th'].name = user.server.username
					rankDex.rank['8th'].level = user.rp.stats.destreza
					break
				case 9:
					rankDex.rank['9th'].name = user.server.username
					rankDex.rank['9th'].level = user.rp.stats.destreza
					break
				case 10:
					rankDex.rank['10th'].name = user.server.username
					rankDex.rank['10th'].level = user.rp.stats.destreza
					break
				default:
					break
				}
			}
		}

		const data = JSON.stringify(rankDex)
		await fs.writeFile('src/docs/ranks/rankDex.json', data)
			.then(console.log('rank got updated'))
			.catch(err => console.log(err))
	},
}