const fs = require('fs').promises

module.exports = {
	name: 'message level up',
	description: 'get level by message',
	usage: 'send message and gain level',
	execute: async (idToGet, document) => {
		const rankRP = require('../docs/ranks/rankRP.json')
		const rankInvites = require('../docs/ranks/rankInvites.json')
		const rankStr = require('../docs/ranks/rankStr.json')
		const rankSpd = require('../docs/ranks/rankSpd.json')
		const rankRes = require('../docs/ranks/rankRes.json')
		const rankDex = require('../docs/ranks/rankDex.json')

		if(!rankRP.users[idToGet]) {
			rankInvites.users.total++
			rankRP.users.total++
			rankStr.users.total++
			rankDex.users.total++
			rankSpd.users.total++
			rankRes.users.total++
		}
		rankRP.users[idToGet] = {}
		rankRP.users[idToGet].level = 1
		rankRP.users[idToGet].name = document.server.username
		rankRP.users[idToGet].rank = rankRP.users.total
		rankInvites.users[idToGet] = {}
		rankInvites.users[idToGet].level = 1
		rankInvites.users[idToGet].name = document.server.username
		rankInvites.users[idToGet].rank = rankRP.users.total
		rankStr.users[idToGet] = {}
		rankStr.users[idToGet].level = 1
		rankStr.users[idToGet].name = document.server.username
		rankStr.users[idToGet].rank = rankRP.users.total
		rankRes.users[idToGet] = {}
		rankRes.users[idToGet].level = 1
		rankRes.users[idToGet].name = document.server.username
		rankRes.users[idToGet].rank = rankRP.users.total
		rankDex.users[idToGet] = {}
		rankDex.users[idToGet].level = 1
		rankDex.users[idToGet].name = document.server.username
		rankDex.users[idToGet].rank = rankRP.users.total
		rankSpd.users[idToGet] = {}
		rankSpd.users[idToGet].level = 1
		rankSpd.users[idToGet].name = document.server.username
		rankSpd.users[idToGet].rank = rankRP.users.total

		const data1 = JSON.stringify(rankRP)
		const data2 = JSON.stringify(rankInvites)
		const data3 = JSON.stringify(rankStr)
		const data4 = JSON.stringify(rankDex)
		const data5 = JSON.stringify(rankSpd)
		const data6 = JSON.stringify(rankRes)

		await fs.writeFile('src/docs/ranks/rankRP.json', data1)
			.then(console.log('Get new person to rank rp'))
			.catch(err => console.log(err))
		await fs.writeFile('src/docs/ranks/rankInvites.json', data2)
			.then(console.log('Get new person to rank invites'))
			.catch(err => console.log(err))
		await fs.writeFile('src/docs/ranks/rankStr.json', data3)
			.then(console.log('Get new person to rank str'))
			.catch(err => console.log(err))
		await fs.writeFile('src/docs/ranks/rankDex.json', data4)
			.then(console.log('Get new person to rank dex'))	
			.catch(err => console.log(err))
		await fs.writeFile('src/docs/ranks/rankSpd.json', data5)
			.then(console.log('Get new person to rank spd'))	
			.catch(err => console.log(err))
		await fs.writeFile('src/docs/ranks/rankRes.json', data6)
			.then(console.log('Get new person to rank res'))
			.catch(err => console.log(err))
	},
}