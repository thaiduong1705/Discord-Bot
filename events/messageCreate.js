const {prefix} = require('../config.json');
module.exports = {
    name : "messageCreate",
    async execute(message) {
        // message handler to run all files in the messageCreate folder
        if(message.author.bot) return;
        const files = require('fs').readdirSync('./events/messageCreate').filter(file => file.endsWith('.js'));
        for(const file of files) {
            const event = require(`../events/messageCreate/${file}`);
            event.execute(message);
        }
    }
}