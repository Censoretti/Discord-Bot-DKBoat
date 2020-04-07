module.exports = {
    name: 'message level up',
    description: 'get level by message',
    usage: 'send message and gain level',
    execute(message) {
        // message.author.id
        message.channel.send('hi')
    },
}