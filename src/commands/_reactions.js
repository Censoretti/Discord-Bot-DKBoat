const one = '1️⃣'
const two = '2️⃣'
const three = '3️⃣'

module.exports = {
	name: 'pish',
  role: 'manager',
	execute: async (message) => {

    const embed = 'puta que me pariu'

    const mRumo = await message.channel.send(embed)
    await mRumo.react(one)
    await mRumo.react(two)
    await mRumo.react(three)

    const reactions = await mRumo.awaitReactions(reaction =>
      reaction.emoji.name === one
      || reaction.emoji.name === two
      || reaction.emoji.name === three, { max: 2, time: 60000, errors: ['time'] })
      .catch(collected => {
        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
      });
    console.log(reactions)
    message.channel.send('porra')
	},
};