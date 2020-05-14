const fs = require('fs').promises

module.exports = {
	name: 'RankUpdate',
	description: 'Update rank of all things',
	execute: async (guildIdBase) => {
		const guildConfig = require('../docs/assets/guildConfig.json')
		let guildId = guildIdBase
		if(guildConfig[guildIdBase].parentGuild.situation) {
			guildId = guildConfig[guildIdBase].parentGuild.id
		}

		const rankFiles = await fs.readdir(`src/docs/ranks/${guildId}`)
			.catch(err => console.log('[#RANKFILES/RANKUPDATE]', err))

		for(const files of rankFiles) {
			const rankToUpdate = require(`../docs/ranks/${guildId}/${files}`)
			
			const sheetFiles = await fs.readdir('src/docs/sheets')
				.catch(err => console.log('[#SHEETS/RANKUPDATE]', err))

			sheetFiles.pop()

			let user
			let userValue
			let compare
			let compareValue

			try {
				for (const file of sheetFiles) {
					user = require(`../docs/sheets/${file}`)
					let testUser = 0
					let keyTestUser = ''
					let testStringUser = ''
					let valueUser = user
			
					while (testUser < rankToUpdate.config.where.position) {
						testUser++
						testStringUser = parseInt(testUser)
						keyTestUser = rankToUpdate.config.where.keys[testStringUser]
						valueUser = valueUser[keyTestUser]
					}
	
					rankToUpdate.users[user.server.id].value = valueUser
				}
			} catch(err) {
				console.log('[#FIRST FOR / RANKUPDATE]', err)
			}

			try {
				for (const file of sheetFiles) {
					user = require(`../docs/sheets/${file}`).server.id
					userValue = rankToUpdate.users[user].value
	
					for (const file2 of sheetFiles) {
						compare = require(`../docs/sheets/${file2}`).server.id
						compareValue = rankToUpdate.users[compare].value
						if (user != compare) {
							if (userValue > compareValue) {
								if (rankToUpdate.users[user]['rank'] > 1) {
									rankToUpdate.users[user]['rank']++
									rankToUpdate.users[compare]['rank']--
								}
							}
						}
					}
				}
			} catch(err) {
				console.log('[#SECOND FOR / RANKUPDATE]', err)
			}

			try {
				for (const file of sheetFiles) {
					user = require(`../docs/sheets/${file}`).server.id
					if(rankToUpdate.users[user]['rank'] <= 10) {
						switch(rankToUpdate.users[user]['rank']) {
						case 1:
							rankToUpdate.rank['1st'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['1st'].value = rankToUpdate.users[user].value
							break
						case 2:
							rankToUpdate.rank['2nd'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['2nd'].value = rankToUpdate.users[user].value
							break
						case 3:
							rankToUpdate.rank['3rd'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['3rd'].value = rankToUpdate.users[user].value
							break
						case 4:
							rankToUpdate.rank['4th'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['4th'].value = rankToUpdate.users[user].value
							break
						case 5:
							rankToUpdate.rank['5th'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['5th'].value = rankToUpdate.users[user].value
							break
						case 6:
							rankToUpdate.rank['6th'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['6th'].value = rankToUpdate.users[user].value
							break
						case 7:
							rankToUpdate.rank['7th'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['7th'].value = rankToUpdate.users[user].value
							break
						case 8:
							rankToUpdate.rank['8th'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['8th'].value = rankToUpdate.users[user].value
							break
						case 9:
							rankToUpdate.rank['9th'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['9th'].value = rankToUpdate.users[user].value
							break
						case 10:
							rankToUpdate.rank['10th'].name = rankToUpdate.users[user].name
							rankToUpdate.rank['10th'].value = rankToUpdate.users[user].value
							break
						default:
							break
						}
					}
				}
			} catch(err) {
				console.log('[#3RD FOR / RANKUPDATE]', err)
			}

			const data = JSON.stringify(rankToUpdate)
			await fs.writeFile(`src/docs/ranks/${guildId}/${files}`, data)
				.catch(err => console.log(err))
		
			for(const users in rankToUpdate.users) {
				try {
					require(`../docs/sheets/${users}`)
				} catch {
					delete rankToUpdate.users[users]
				} 
			}
		}
		console.log('All ranks updated for everyone on ranks');
	},
}