const Discord = require('discord.js');

module.exports = {
	name: 'author',
	role: 'manager',
	aliases: ['embed', 'dev'],
	description: 'embed some text',
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#00ff00')
			.setAuthor('author', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png', 'https://github.com/dagashy/discordbot')
			.setTitle('tittle')
			.setURL('https://discord.js.org/')
			.setDescription('[description](https://github.com/dagashy "optional hovertext")')
			.setThumbnail('https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'CommandText', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')
			.setTimestamp()
			.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')

		message.channel.send(exampleEmbed);
	},
}