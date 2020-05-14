module.exports = {
	name: 'guildMemberRemove',
	description: 'When someone leaves a server, this executes',
	// eslint-disable-next-line no-unused-vars
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		client.on('guildMemberRemove', async member => {
			if(member.user.bot) return
			const fs = require('fs').promises
			const guildConfig = require('../docs/assets/guildConfig.json')

			const embed = new Discord.MessageEmbed()
				.setColor('#00ff00')
				.setTitle(`⚰️ ${member.user.username}...`)
				.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setDescription('E mais um não aguentou a força do nosso haki')
				.setImage('https://i.imgur.com/BLYVOw4.gif')
				.setTimestamp()
				.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')
		
			const removedMember = require(`../docs/sheets/${member.user.id}.json`)
			const inviterMember = require(`../docs/sheets/${removedMember.server.invites.invited}.json`)
		
			inviterMember.server.invites.uses--
			const data = JSON.stringify(inviterMember)
			await fs.writeFile(`src/docs/sheets/${inviterMember.server.id}.json`, data)
				.then(console.log(`Less one invite uses for: ${inviterMember.server.username}`))
				.catch(err => console.log(err))
		
			const guildId = member.guild.id
		
			const exitChat = member.guild.channels.cache.get(guildConfig[guildId].exitChat.id);
			if(guildConfig[guildId].exitChat.situation) {
				exitChat.send(embed).catch(err => console.log(err));
			}

			fs.unlink(`src/docs/sheets/${removedMember.server.id}.json`)
				.then(console.log(`Deleted the sheet of ${removedMember.server.username}`))
				.catch(err => console.log(err))
			require('../events/rankUpdate').execute(member.guild.id)
		});
	},
}