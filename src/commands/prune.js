module.exports = {
	name: 'prune',
	role: 'adm',
	description: 'Delete 1~100 messages, with less than 2 weeks.',
	args: true,
	// eslint-disable-next-line no-unused-vars
	execute: async (message, args, cooldowns, timestamps, client, admPass, managerPass) => {
		let amount = parseInt(args[0]) + 1
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		if(amount > 100) {
			amount = 100
			let amountTimes = Math.floor(amount / 100)
			const amountRest = amount % 100
			while(amountTimes > 0) {
				await message.channel.bulkDelete(amount, true).catch(err => {
					console.error(err);
					return message.channel.send('Huummm..... n deu mais q isso');
				});
				amountTimes--
			}
			await message.channel.bulkDelete(amountRest, true).catch(err => {
				console.error(err);
				return message.channel.send('Huummm..... n deu mais q isso');
			})
		} else {
			message.channel.bulkDelete(amount, true).catch(err => console.error(err));
		}
		await message.channel.send(`Pronto, as ${args[0]} mensagens foram deletadas`)
		wait(2000)
		message.channel.bulkDelete(1, true).catch(err => console.log(err))
	},
};

function wait(ms) {
	const time = new Date().getTime();
	let end = time;
	while(end < time + ms) {
		end = new Date().getTime();
	}
}