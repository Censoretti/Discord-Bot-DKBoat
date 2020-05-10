module.exports = {
	name: 'execution',
	// role: 'manager',
	aliases: ['exec', 'bau'],
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const akuma = require('../docs/assets/628028186709458945/akumas.json')

		console.log(akuma.rankSS)
		console.log(akuma.rankSS[0]);
	},
};