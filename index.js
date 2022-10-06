const { Client, GatewayIntentBits } = require('discord.js');
const { ReactionRole } = require('discordjs-reaction-role');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const { token, prefix } = require('./config.json');

client.on('ready', () => {
  console.clear();
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  // Possible Args
  let args = message.content.split(' ').slice(1);
  var args1 = args[0]; // Used for amount && score
  var args2 = args.slice(1).join(' '); // Time
  var args3 = args.slice(2).join(', '); // Code

  let scrimAnnounce, scrimCode;

  if (message.author.bot) {
    return;
  }
  if (message.content.startsWith(prefix)) {
    const args83 = message.content.slice(prefix.length).split(' ');
    const command = args83.shift();
    if (message.author.id == '474118802746114048' || '229500736768049152') {
      switch (command) {
        case 'scrim':
          message.delete();
          client.channels.cache
            .get('1026129834323214545')
            .send(
              `@everyone A scrim has been scheduled at ${args2}, react to this message if you can play! (${args1} players neeed)`
            )
            .then(function (sentMessage) {
              sentMessage.react('✅');
              sentMessage = scrimAnnounce;
              const rr = new ReactionRole(client, [
                {
                  messageId: scrimAnnounce.id,
                  reaction: '✅',
                  roleId: '1026175339602395166',
                },
              ]);
            });
          client.channels.cache
            .get('1026176636099502131')
            .send(
              `Code is ${args3} join code CHROMATIC${Math.floor(
                Math.random(99)
              )} 15 minutes earlier to warm up! From there we will go to the actual scrim`
            )
            .then(function (sendMessage) {
              sendMessage = scrimCode;
            });
          break;
        case 'c':
          message.guild.members.cache.forEach((member) => {
            member.roles.remove('1026175339602395166');
          });
          client.channels.cache.get('1026176636099502131').send('?purge 4');
          break;
        case 'win':
          client.channels.cache.get('1026166218022989874').send(
            `Scrim At ${Date.now}
            Won, Score ${args1}
            Against: ${args2}`
          );
          break;
        case 'lose':
          client.channels.cache.get('1026166218022989874').send(
            `Scrim At ${Date.now}
            Lost, Score: ${args1}
            Against: ${args2}`
          );
          break;
      }
    } else {
      return;
    }
  }
});

client.login(token);
