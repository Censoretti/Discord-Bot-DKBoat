const fs = require('fs').promises
const docs = new Map()

module.exports = {
  name: 'mExperience',
  description: 'get experience by message',
  usage: 'send message and gain experience',
  execute: async (message) => {

    const docsFiles = await fs.readdir('bot/docs/messages')
    for (const file of docsFiles) {
        const document = require(`../docs/messages/${file}`);
        docs.set(document.id, document);
    }

    const autorId = message.author.id

    if (docs.get(autorId)) {

      const document = docs.get(autorId)
      document.amount += 1
      const data = JSON.stringify(document)

      await fs.writeFile(`Bot/docs/messages/${autorId}.json`, data)
        .then(console.log(`re-writed a .json file in messages to ${message.author.username} from ${message.guild.name}`))
        .catch(err => console.log(err))

      // message.guild.channels.cache.get('693231596681035776')
      //   .send(`${message.author.username} quantidade de mensagens: ${document.amount}`)

    } else {

      try {
        const document = docs.get('template')
        document.id = autorId
        document.amount = 1
        const data = JSON.stringify(document)

        await fs.writeFile(`Bot/docs/messages/${autorId}.json`, data)
            .then(console.log(`created a .json file in messages to ${message.author.username} from ${message.guild.name}`))
            .catch(err => console.log(err))

        // message.guild.channels.cache.get('693231596681035776')
        //     .send(`${message.author.username} quantidade de mensagens: ${document.amount}`)
      } catch (err) {
          console.log(err)
      }
    }

  },
}