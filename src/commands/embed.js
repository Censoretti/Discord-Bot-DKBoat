const Discord = require('discord.js');

module.exports = {
	name: 'author',
	role: 'manager',
	aliases: ['embed', 'dev'],
	description: 'embed some text',
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setAuthor('author', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png', 'https://github.com/dagashy/discordbot')
			.setTitle('tittle')
			.setURL('https://discord.js.org/')
			.setDescription('[description](https://github.com/dagashy "optional hovertext")')
			.setThumbnail('https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'CommandText', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://cdn.discordapp.com/attachments/613477001071951915/703825043066585168/Screenshot_5.png')

		message.channel.send(exampleEmbed);
	},
}