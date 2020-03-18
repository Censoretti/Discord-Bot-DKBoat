const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    aliases: ['autor', 'desenvolvedor'],
    description: 'embed some text',
    execute(message) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setAuthor('DKBoat', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setTitle('Sobre o bot')
            .setURL('https://discord.js.org/')
            .setDescription('[GitHub](https://github.com/dagashy "optional hovertext")')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'CommandText', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        message.channel.send(exampleEmbed);
    },
}