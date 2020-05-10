const fs = require('fs').promises

module.exports = {
	name: 'editar',
	aliases: ['alterar', 'mudar', 'edit'],
	description: 'reset something from the sheet',
	role: 'manager',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const document = require(`../docs/sheets/${args[0]}`)

		const number = args.length - 1
		let reply = ''
		switch(number) {
		case 3:
			document[args[1]][args[2]] = args[3]
			reply = args[1] + ' ' + args[2]
			break
		case 4:
			document[args[1]][args[2]][args[3]] = args[4]
			reply = args[1] + ' ' + args[2] + ' ' + args[3]
			break
		case 5:
			document[args[1]][args[2]][args[3]][args[4]] = args[5]
			reply = args[1] + ' ' + args[2] + ' ' + args[3] + ' ' + args[4]
			break
		default:
			return message.channel.send('Something got wrong')
		}

		const data = JSON.stringify(document)

		await fs.writeFile(`src/docs/sheets/${args[0]}.json`, data)
			.then(console.log(`reset ${reply} of ${document.server.name}`))
			.catch(err => console.log(err))
		message.channel.send('done')
	},
};