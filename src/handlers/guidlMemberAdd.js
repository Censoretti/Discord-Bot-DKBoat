module.exports = {
	name: 'guildMemberAdd',
	description: 'When someone enters some guild, this executes',
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		const fs = require('fs').promises
		// const roles = require('../docs/assets/628028186709458945/roles.json')
		const guildConfig = require('../docs/assets/guildConfig.json')

		client.on('guildMemberAdd', async member => {
			const cachedInvites = guildInvites.get(member.guild.id);
			const newInvites = await member.guild.fetchInvites();
			guildInvites.set(member.guild.id, newInvites);
			try {
				const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
				const invitedOf = require(`../docs/sheets/${usedInvite.inviter.id}.json`)
				const embed = new Discord.MessageEmbed()
					.setColor('#00ff00')
					.setTitle(`👋Bem-vindo(a)! ${member.user.username}`)
					.setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
					.setDescription(`Temos um novo tripulante, SKOL!\nFoi chamado pelo ${usedInvite.inviter.username}`)
					.setImage('https://i.imgur.com/FrjGrQN.gif')
					.setTimestamp()
					.setFooter('[Bot feito por Censoretti]', 'https://media.discordapp.net/attachments/630288097740980224/698993062533398587/Popcorn.png')
		
				invitedOf.server.invites.uses++
				invitedOf.server.invites.total++
				const data = JSON.stringify(invitedOf)
				await fs.writeFile(`src/docs/sheets/${usedInvite.inviter.id}.json`, data)
					.then(console.log(`Used invite to ${usedInvite.inviter.username}`))
					.catch(err => console.log(err))
		
				const newSheet = require('../docs/sheets/_template.json')
				newSheet.server.invites.invited = usedInvite.inviter.id
				newSheet.server.id = member.user.id
				newSheet.server.username = member.user.username
				newSheet.server.discriminator = member.user.discriminator
				const data2 = JSON.stringify(newSheet)
				await fs.writeFile(`src/docs/sheets/${member.user.id}.json`, data2)
					.then(console.log(`New sheet created to ${member.user.username}`))
					.catch(err => console.log(err))
				
				require('../events/getRank').execute(member.user.id, newSheet, member.guild.id)
		
				const guildId = member.guild.id
				
				const welcomeChannel = member.guild.channels.cache.get(guildConfig[guildId].welcomeChat.id);
				if(guildConfig[guildId].welcomeChat.situation) {
					welcomeChannel.send(embed).catch(err => console.log(err));
				}
			}
			catch(err) {
				console.log(err);
			}
			require('../events/rankUpdate').execute(member.guild.id)
		});
	},
}