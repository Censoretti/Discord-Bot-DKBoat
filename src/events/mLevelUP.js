module.exports = {
  name: 'message level up',
  description: 'get level by message',
  usage: 'send message and gain level',
  execute(message) {
    const document = require(`../docs/sheets/${message.author.id}.json`)
    const level = document.server.messages.level
    switch(level) {
      case 10:
        break
      case 20:
        break
      case 30:
        break
      case 40:
        break
      case 50:
        break
      case 60:
        break
      case 70:
        break
      case 80:
        break
      case 90:
        break
      case 100:
        break
    }
  },
}