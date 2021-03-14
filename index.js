const FS = require('fs')
const Discord = require('discord.js');


const Client = new Discord.Client();
Client.Commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	Client.Commands.set(command.name, command);
}


Client.on('ready', onReadyHandler)

Client.on('message', onMessageHandler)

Client.login(env.token);


function onMessageHandler(message) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (!Client.Commands.has(command)) return;

    try {
        Client.Commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.channel.send('UWU IT SEEMS I DID A FUCKY WUCKY OWO HEHE')
    }
}

function onReadyHandler() {
    console.log('lets fuckin go we up')
}