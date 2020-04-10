const fs = require('fs').promises

module.exports = {
	name: 'reset',
  description: 'reset training of a person',
  roles: 'manager',
	execute: async (message, args) => {
    const document = require(`../docs/sheets/${args[0]}`)
    const arr = []
    let number = 0
    for(const a of args) {
      arr[number] = a.toLowerCase()
      number++
    }

    number--

    switch(number) {
      case 3:
        document[arr[1]][arr[2]] = arr[3]
        break
      case 4:
        document[arr[1]][arr[2]][arr[3]] = arr[4]
        break
      case 5:
        document[arr[1]][arr[2]][arr[3]][arr[4]] = arr[5]
        break
    }

    const data = JSON.stringify(document)

    await fs.writeFile(`src/docs/sheets/${args[0]}.json`, data)
        .then(console.log(`reset ${args[1]} ${args[2]} of ${document.server.name}`))
        .catch(err => console.log(err))
    message.channel.send('done')
	},
};