// slash command builder
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

// response to user's message with a random response in response.txt
module.exports = {
    data : new SlashCommandBuilder()
        .setName('8balls')
        .setDescription('8balls')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Question: ...')
                .setRequired(true)),
    async execute(interaction) {
        // get random response from response.txt
        const response = fs.readFileSync('./textFiles/8balls.txt', 'utf8').toString().split('\r\n');
        const random = Math.floor(Math.random() * response.length);
        interaction.reply(response[random]);
    }
};
        

