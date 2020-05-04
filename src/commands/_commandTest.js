module.exports = {
	name: 'execution',
	// role: 'manager',
	aliases: ['exec', 'bau'],
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client) => {
		const roles = require('../docs/assets/628028186709458945/roles.json')
		
		for(const keys in roles) {
			console.log(`Keys: ${keys}`)
		}
	},
};