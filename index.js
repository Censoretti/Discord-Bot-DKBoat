const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('Bot online')
})

client.login(token)