console.clear()
console.log('--------------- INDEX FILE IGNITE ---------------')
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('bot/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('bot/events').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
 }

client.on('ready', () => {
	console.log(`%c < ONLIIIIIIIINEEEEEEEEEEEEEEEEEEEEEEEEEEE >
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, 'font-family:monospace')
});

client.on('message', message => {
    // se for bot, retorna
    if (message.author.bot) return

    try {
        const event = client.events.get('mExperience')
        event.execute(message)
    } catch (error) {
        console.log(error)
        message.reply('supposed to say hi')
    }
    // se não começar com prefixo, retorna
	if (!message.content.startsWith(prefix)) return;

    // pega a mensagem e corta pelo, primeiro pelo prefixo e separa
    const args = message.content.slice(prefix.length).split(/ +/);
    // pega o nome do comando, coloca lowerCase dentro de command name
    const commandName = args.shift().toLowerCase();

    // coloca os aliases dentro de command e command name também
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    // se não for um comando retorna
    if (!command) return;

    // verifica se é um comando somente dentro do server, se for num dm, retorna
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!')
    }

    // verifica se o comando precisa de argumento, se sim, explica que precisa
    if (command.args && !args.length) {
       let reply = `You didn't provide any arguments, ${message.author}`

       // se tiver um usage explica como que usa
       if (command.usage) {
           reply += `\nThe proper usage would be: ${prefix}${command.name} ${command.usage}`;
       }

       // manda a mensagem
       return message.channel.send(reply);
    }

    // se tiver cd é aqui que coloca
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    // é aqui que verifica a hora e quando pode usar de novo o cd
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // aqui verifica se pode ou ainda não usar o comando com cd
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // aqui tenta executar o comando, se não mostra o erro
    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!')
    }


});

// inicia o bot
client.login(token);