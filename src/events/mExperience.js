const fs = require('fs').promises
const docs = new Map()

module.exports = {
	name: 'mExperience',
	description: 'get experience by message',
	usage: 'send message and gain experience',
	execute: async (message) => {
		const guildConfig = require('../docs/assets/guildConfig.json')
		const guildIdBase = message.guild.id
		let guildId = guildIdBase
		if(guildConfig[guildId].parentGuild.situation) {
			guildId = guildConfig[guildId].parentGuild.id
		}
		let levelUpChat

		if(guildConfig[guildIdBase].levelUpChat.situation) {
			levelUpChat = guildConfig[guildIdBase].levelUpChat.id
		} else if(guildConfig[guildId].levelUpChat.situation) {
			levelUpChat = guildConfig[guildId].levelUpChat.id
		} else {
			return
		}

		const docsFiles = await fs.readdir('src/docs/sheets')
		for (const file of docsFiles) {
			const document2 = require(`../docs/sheets/${file}`);
			docs.set(document2.server.id, document2);
		}

		const autorId = message.author.id
		let document
		let reply = `Message ammout ++ to ${message.author.username}`
		if (docs.get(autorId)) {

			document = docs.get(autorId)
			document.server.messages.xp++
			document.server.messages.amount++

		} else {
			try {
				document = docs.get('template')
				document.server.id = autorId
				document.server.username = message.author.username
				document.server.discriminator = message.author.discriminator
				document.server.messages.xp = 1
				document.server.messages.amount = 1
				require('./getRank').execute(autorId, document, message.guild.id)
			} catch (err) {
				console.log(err)
			}
		}
		const level = document.server.messages.level
		const need = (level * (15 + level))
		if(document.server.messages.xp >= need) {
			document.server.messages.level++
			document.server.messages.xp = 0

			try {
				message.guild.channels.cache.get(levelUpChat)
					.send(`<@${message.author.id}> upou para: ${level + 1}`)
			} catch(err) {
				console.log(err)
			}
			reply = `Level message UP to ${message.author.username}`
		}

		const data = JSON.stringify(document)
		await fs.writeFile(`src/docs/sheets/${autorId}.json`, data)
			.then(console.log(reply))
			.catch(err => console.log(err))

	},
}