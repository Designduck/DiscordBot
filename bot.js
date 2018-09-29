var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // HELP command
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: ':ambulance: Help will come soon.'
                });
            break;
            // Test of time
            case 'time':
                var d = new Date();
                var h = (d.getHours()<10?'0':'') + d.getHours();
                var m = (d.getMinutes()<10?'0':'') + d.getMinutes();
                var now = h + ':' + m;
                bot.sendMessage({
                    to: channelID,
                    message: now
                });
            break;
         }
     }
});