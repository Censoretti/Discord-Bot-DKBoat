const fs = require('fs').promises

module.exports = {
	name: 'rankInvites',
	description: 'get rank of invites uses',
	usage: '',
	execute: async () => {
		const rankInvites = require('../docs/ranks/rankInvites.json')
		const docsFiles = await fs.readdir('src/docs/sheets')
		docsFiles.pop()
		let user
		let compare
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`)
			rankInvites.user[user.server.id].level = user.server.invites.uses
		}
		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			for (const files of docsFiles) {
				compare = require(`../docs/sheets/${files}`)
				if (user.server.id != compare.server.id) {
					if (user.server.invites.uses > compare.server.invites.uses) {
						if (rankInvites.users[user.server.id]['rank'] > 1) {
							rankInvites.users[user.server.id]['rank']++
							rankInvites.users[compare.server.id]['rank']--
						}
					}
				}
			}
		}

		for (const file of docsFiles) {
			user = require(`../docs/sheets/${file}`);
			if(rankInvites.users[user.server.id]['rank'] <= 10) {
				switch(rankInvites.users[user.server.id]['rank']) {
				case 1:
					rankInvites.rank['1st'].name = user.server.username
					rankInvites.rank['1st'].level = user.server.invites.uses
					break
				case 2:
					rankInvites.rank['2nd'].name = user.server.username
					rankInvites.rank['2nd'].level = user.server.invites.uses
					break
				case 3:
					rankInvites.rank['3rd'].name = user.server.username
					rankInvites.rank['3rd'].level = user.server.invites.uses
					break
				case 4:
					rankInvites.rank['4th'].name = user.server.username
					rankInvites.rank['4th'].level = user.server.invites.uses
					break
				case 5:
					rankInvites.rank['5th'].name = user.server.username
					rankInvites.rank['5th'].level = user.server.invites.uses
					break
				case 6:
					rankInvites.rank['6th'].name = user.server.username
					rankInvites.rank['6th'].level = user.server.invites.uses
					break
				case 7:
					rankInvites.rank['7th'].name = user.server.username
					rankInvites.rank['7th'].level = user.server.invites.uses
					break
				case 8:
					rankInvites.rank['8th'].name = user.server.username
					rankInvites.rank['8th'].level = user.server.invites.uses
					break
				case 9:
					rankInvites.rank['9th'].name = user.server.username
					rankInvites.rank['9th'].level = user.server.invites.uses
					break
				case 10:
					rankInvites.rank['10th'].name = user.server.username
					rankInvites.rank['10th'].level = user.server.invites.uses
					break
				default:
					break
				}
			}
		}

		const data = JSON.stringify(rankInvites)
		await fs.writeFile('src/docs/ranks/rankInvites.json', data)
			.then(console.log('rank got updated'))
			.catch(err => console.log(err))
	},
}