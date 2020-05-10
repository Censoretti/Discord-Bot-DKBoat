module.exports = {
	name: 'akuma',
	description: 'template',
	// aliases: ['flush'],
	// cooldown: 60,
	// args: true,
	// guildOnly: true,
	// usage: '',
	// role: 'manager',
	// onRP: 'off',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const akuma = require('../docs/assets/628028186709458945/akumas.json')
		const fs = require('fs').promises
		let rank = ''
		if(admPass) {
			if(args[2]) {
				if(args[0] == 'add'
				|| args[0] == 'adicionar') {
					if(args[1] == 'b'
					|| args[1] == 'rankb') {
						rank = 'rankB'
					}
					if(args[1] == 'a'
					|| args[1] == 'ranka') {
						rank = 'rankA'
					}
					if(args[1] == 's'
					|| args[1] == 'ranks') {
						rank = 'rankS'
					}
					if(args[1] == 'ss'
					|| args[1] == 'rankss') {
						rank = 'rankSS'
					}
					let akumaName = ''
					let number = 2
					while(number < args.length) {
						if(number == args.length - 1) {
							akumaName += `${args[number]}`
						} else {
							akumaName += `${args[number]} `
						}
						number++
					}
					akuma[rank].push(akumaName)

					const data = JSON.stringify(akuma)
					await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', data)
						.then('akuma add, list update')
						.catch(err => console.log(err))
					return console.log('done')
				}
			} else {
				return message.channel.send('Faltou coisa ai maninho')
			}
		}
		if(managerPass) {
			if(args[2]) {
				if(args[1] == 'b'
				|| args[1] == 'rankb') {
					rank = 'rankB'
				}
				if(args[1] == 'a'
				|| args[1] == 'ranka') {
					rank = 'rankA'
				}
				if(args[1] == 's'
				|| args[1] == 'ranks') {
					rank = 'rankS'
				}
				if(args[1] == 'ss'
				|| args[1] == 'rankss') {
					rank = 'rankSS'
				}
				let akumaName = ''
				let number = 2
				while(number < args.length) {
					if(number == args.length - 1) {
						akumaName += `${args[number]}`
					} else {
						akumaName += `${args[number]} `
					}
					number++
				}

				if(args[0] == 'remove'
				|| args[0] == 'remover') {
					let index = 0
					for(const akumas of akuma[rank]) {
						if(akumaName == akumas) {
							console.log('splice');
							console.log(index);
							akuma[rank].splice(index, 1);
							break
						}
						index++
					}
				}
			} else {
				return message.channel.send('Faltou coisa ai maninho')
			}
		} else {
			
			// ver akuma
			// dar random de akuma
		}
		const data = JSON.stringify(akuma)
		await fs.writeFile('src/docs/assets/628028186709458945/akumas.json', data)
			.then('akuma delete, list update')
			.catch(err => console.log(err))
		return console.log('done')
	},
};