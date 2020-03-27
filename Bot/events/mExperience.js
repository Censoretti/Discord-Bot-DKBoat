const fs = require('fs').promises
const docs = new Map()

module.exports = {
    name: 'mExperience',
    description: 'get experience by message',
    usage: 'send message and gain experience',
    async execute(message) {

        const docsFiles = await fs.readdir('bot/docs/messages')
        console.log(docsFiles)
        for (const file of docsFiles) {
            const document = require(`../docs/messages/${file}`);
            docs.set(document.id, document);
        }

        message.channel.send('hi')
        const autorId = message.author.id
        if (docs.get(autorId)) {
            const document = docs.get(autorId)
            document.mLevel += 1
            console.log(document)
            const data = JSON.stringify(document)
            await fs.writeFile(`Bot/docs/messages/${autorId}.json`, data)
                .catch(err => console.log(err))
        } else {
            const document = docs.get('template')
            document.id = autorId
            document.mLevel += 1
            const data = JSON.stringify(document)
            await fs.writeFile(`Bot/docs/messages/${autorId}.json`, data)
                .then(console.log('writed'))
                .catch(err => console.log(err))
            console.log(document)
        }
    },
}