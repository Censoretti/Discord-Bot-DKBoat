module.exports = {
	name: 'cron Tasks',
	description: 'execute tasks at some time',
	// eslint-disable-next-line no-unused-vars
	execute: async (client, Discord, clientCommands, clientEvents, guildInvites) => {
		const fs = require('fs').promises
		const cron = require('node-cron')
		const roles = require('../docs/assets/628028186709458945/roles.json')
		const marineMoney = cron.schedule('0 0 * * *', async () => {
			try {
				const docsFiles = await fs.readdir('src/docs/sheets')
				for (const file of docsFiles) {
					const document = require(`../docs/sheets/${file}`);
					document.rp.training.daily = 0
					if(document.rp.course == 'marinha') {
						switch(document.rp.course) {
						case('apprentice'):
							document.rp.money += 10
							break
						case('chief'):
							document.rp.money += 1000
							break
						case('lieutenant'):
							document.rp.money += 2000
							break
						case('lieutenantBoss'):
							document.rp.money += 3000
							break
						case('comander'):
							document.rp.money += 5000
							break
						case('capitain'):
							document.rp.money += 8000
							break
						case('comodore'):
							document.rp.money += 16000
							break
						case('notAdmiral'):
							document.rp.money += 38000
							break
						case('almostAdmiral'):
							document.rp.money += 50000
							break
						case('admiral'):
							document.rp.money += 83000
							break
						case('fullAdmiral'):
							document.rp.money += 166000
							break
						default:
							return
						}
					}
					const data = JSON.stringify(document)

					await fs.writeFile(`src/docs/sheets/${file}`, data)
						.then(console.log(`reseted daily training to: ${document.server.username}`))
						.catch(err => console.log(err))
				}
			} catch(err) {
				return console.log(err)
			}
			client.guilds.cache.get('628028186709458945').channels.cache.get('630283915558518805').send(`<@&${roles.rp.course.marine.id}> pagamento feito`)
		});

		marineMoney.start()
	},
}
