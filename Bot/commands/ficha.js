const Discord = require('discord.js')

async function ignite(message) {
	teste(message)

}

async function teste(message) {
	const embed = new Discord.MessageEmbed()
		.setColor('00ff00')
		.setDescription('quero algo longo somente pra teste nessa merda que não sei como funciona mas ta me deixando puto pra caralho e eu vou conseguir fazer saporra')

	message.author.send(embed)
		.then(async sentEmbed => {
			await sentEmbed.react('3️⃣')
			await sentEmbed.react('9️⃣')
    })
}


module.exports = {
	name: 'ficha',
	description: 'criação de ficha',
	// guildOnly: true,
	usage: '',
	aliases: '',
	// args: true,
	execute(message) {
    ignite(message)
    console.log('ficha')
	},
}