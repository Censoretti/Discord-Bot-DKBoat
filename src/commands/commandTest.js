module.exports = {
	name: 'execution',
	// role: 'manager',
	aliases: ['exec', 'x'],
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		// command test
		const roles = require('../docs/assets/628028186709458945/roles.json')
		const verifyMessage = await message.channel.send('embed')

		for(const course in roles.rp.course) {
			await verifyMessage.react(roles.rp.course[course].emoji)
		}
		const responseMessage = await verifyMessage.awaitReactions(reaction => reaction, { max: 2, time: 60000 })

		for(const role in roles.rp.course) {
			console.log(role);
			console.log(responseMessage.get(roles.rp.course[role].emoji));
			if(responseMessage.get(roles.rp.course[role].emoji)) {
				console.log(role);
				console.log(responseMessage.get(roles.rp.course[role].emoji).count);
				
				break
			}
		}
	},
};