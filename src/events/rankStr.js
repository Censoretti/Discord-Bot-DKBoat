const fs = require('fs').promises

module.exports = {
	name: 'RankStr',
	description: 'get rank of str',
	usage: '',
	execute: async () => {
		const rankStr = require('../docs/ranks/rankStr.json')
		const docsFiles = await fs.readdir('src/docs/sheets')
		docsFiles.pop()
		let user
		let compare
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`)
			rankStr.users[user.server.id].level = user.rp.stats.forca
		}
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			for (const files of docsFiles) {
				compare = require(`../docs/sheets/${files}`)
				if (user.server.id != compare.server.id) {
					if (user.rp.stats.forca > compare.rp.stats.forca) {
						if (rankStr.users[user.server.id]['rank'] > 1) {
							rankStr.users[user.server.id]['rank']++
							rankStr.users[compare.server.id]['rank']--
						}
					}
				}
			}
		}

		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			if(rankStr.users[user.server.id]['rank'] <= 10) {
				switch(rankStr.users[user.server.id]['rank']) {
				case 1:
					rankStr.rank['1st'].name = user.server.username
					rankStr.rank['1st'].level = user.rp.stats.forca
					break
				case 2:
					rankStr.rank['2nd'].name = user.server.username
					rankStr.rank['2nd'].level = user.rp.stats.forca
					break
				case 3:
					rankStr.rank['3rd'].name = user.server.username
					rankStr.rank['3rd'].level = user.rp.stats.forca
					break
				case 4:
					rankStr.rank['4th'].name = user.server.username
					rankStr.rank['4th'].level = user.rp.stats.forca
					break
				case 5:
					rankStr.rank['5th'].name = user.server.username
					rankStr.rank['5th'].level = user.rp.stats.forca
					break
				case 6:
					rankStr.rank['6th'].name = user.server.username
					rankStr.rank['6th'].level = user.rp.stats.forca
					break
				case 7:
					rankStr.rank['7th'].name = user.server.username
					rankStr.rank['7th'].level = user.rp.stats.forca
					break
				case 8:
					rankStr.rank['8th'].name = user.server.username
					rankStr.rank['8th'].level = user.rp.stats.forca
					break
				case 9:
					rankStr.rank['9th'].name = user.server.username
					rankStr.rank['9th'].level = user.rp.stats.forca
					break
				case 10:
					rankStr.rank['10th'].name = user.server.username
					rankStr.rank['10th'].level = user.rp.stats.forca
					break
				default:
					break
				}
			}
		}

		const data = JSON.stringify(rankStr)
		await fs.writeFile('src/docs/ranks/rankStr.json', data)
			.then(console.log('rank got updated'))
			.catch(err => console.log(err))
	},
}