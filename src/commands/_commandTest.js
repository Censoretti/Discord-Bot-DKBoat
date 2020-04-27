module.exports = {
	name: 'execution',
	role: 'manager',
	aliases: ['exec'],
	execute: async (message, args) => {

		// message.member.get(args[0]).roles.remove('695671528217509989')
		message.guild.members.cache.get(args[0]).roles.add('695671528217509989')

		// const member = message.mentions.members.first()
		// const member = args[0]
		// member.roles.add('695671528217509989');
		// console.log(member)

	},
};