const fs = require('fs').promises

module.exports = {
	name: 'rankRP',
	description: 'get rank of level',
	usage: '',
	execute: async () => {
		const rankrp = require('../docs/ranks/rankRP.json')
		const docsFiles = await fs.readdir('src/docs/sheets')
		docsFiles.pop()
		let user
		let compare
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`)
			rankrp.users[user.server.id].level = user.rp.level
		}
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			for (const files of docsFiles) {
				compare = require(`../docs/sheets/${files}`)
				if (user.server.id != compare.server.id) {
					if (user.rp.level > compare.rp.level) {
						if (rankrp.users[user.server.id].rank > 1) {
							rankrp.users[user.server.id].rank++
							rankrp.users[compare.server.id].rank--
						}
					}
				}
			}
		}

		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			if(rankrp.users[user.server.id].rank <= 10) {
				switch(rankrp.users[user.server.id].rank) {
				case 1:
					rankrp.rank['1st'].name = user.rp.name
					rankrp.rank['1st'].level = user.rp.level
					break
				case 2:
					rankrp.rank['2nd'].name = user.rp.name
					rankrp.rank['2nd'].level = user.rp.level
					break
				case 3:
					rankrp.rank['3rd'].name = user.rp.name
					rankrp.rank['3rd'].level = user.rp.level
					break
				case 4:
					rankrp.rank['4th'].name = user.rp.name
					rankrp.rank['4th'].level = user.rp.level
					break
				case 5:
					rankrp.rank['5th'].name = user.rp.name
					rankrp.rank['5th'].level = user.rp.level
					break
				case 6:
					rankrp.rank['6th'].name = user.rp.name
					rankrp.rank['6th'].level = user.rp.level
					break
				case 7:
					rankrp.rank['7th'].name = user.rp.name
					rankrp.rank['7th'].level = user.rp.level
					break
				case 8:
					rankrp.rank['8th'].name = user.rp.name
					rankrp.rank['8th'].level = user.rp.level
					break
				case 9:
					rankrp.rank['9th'].name = user.rp.name
					rankrp.rank['9th'].level = user.rp.level
					break
				case 10:
					rankrp.rank['10th'].name = user.rp.name
					rankrp.rank['10th'].level = user.rp.level
					break
				default:
					break
				}
			}
		}
		const data = JSON.stringify(rankrp)
		await fs.writeFile('src/docs/ranks/rankRP.json', data)
			.then(console.log('rank RP got updated'))
			.catch(err => console.log(err))
	},
}