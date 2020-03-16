const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
	console.log('Bot online');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
   const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
   if (command === 'server') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated at: ${message.guild.createdAt}\nRegion: ${message.guild.region}`);
    }
   if (command === 'user') {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
    }
   if (command === 'args') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else if (args[0] === 'foo') {
            return message.channel.send('bar')
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}\nArgument Length: ${args.length}`);
    }
   if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!')
        }
        const taggedUser = message.mentions.users.first()
        message.channel.send(`You wanted to kick: ${taggedUser.username}`)
    }
   if (command === 'avatar') {
        if (!message.mentions.users.size) {
            // eslint-disable-next-line quotes
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
        const avatarList = message.mentions.users.map(user => {
            // eslint-disable-next-line quotes
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`
        })
        message.channel.send(avatarList)
    }
   if (command === 'prune') {
        const amount = parseInt(args[0]) + 1;
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 99) {
            return message.reply('you need to input a number between 2 and 100.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    }
});


client.login(token);