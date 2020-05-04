module.exports = {
	name: 'execution',
	// role: 'manager',
	aliases: ['exec', 'bau'],
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {

		// message.member.get(args[0]).roles.remove('695671528217509989')
		// message.guild.members.cache.get(args[0]).roles.add('695671528217509989')

		// const member = message.mentions.members.first()
		// const member = args[0]
		// member.roles.add('695671528217509989');
		// console.log(member)

		// const arr = args[0] + '2'
		// console.log(arr)


		// message.channel.send('Você ganhou um pacote de pipoca')

		// const rank = require('../docs/ranks/628028186709458945/rankStr.json')
		// const sheet = require('../docs/sheets/361938302070161408.json').server.id
		// console.log(sheet)
		// let test = 0
		// let value
		// let testString
		// let valor = sheet

		// while (test < rank.config.where.position) {
		// 	test++
		// 	testString = parseInt(test)
		// 	value = rank.config.where.keys[testString]
		// 	valor = valor[value]
		// }

		require('../events/rankUpdate').execute('628028186709458945')
	},
};