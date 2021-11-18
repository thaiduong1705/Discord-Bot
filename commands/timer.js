const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('timer')
        .setDescription('Send message at a specific time')
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time: ...h...')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message')
                .setRequired(true)),
    async execute(interaction) {
        const time = interaction.options.getString('time');
        const message = interaction.options.getString('message');
        const [hours, minutes] = time.split('h');
        if(!hours.match(/^\d+$/) || !minutes.match(/^\d+$/) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            interaction.reply('Time is not valid');
            return;
        }

        // check message has tag @DMT or message is empty
        if(message.match(/<@!772851426837135391>/)  || message.length === 0) {
            interaction.reply('Message is not valid');
            return;
        }
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        const now = new Date();
        const diff = date.getTime() - (now.getTime() + 7 * 3600 * 1000);
        if (diff < 0) {
            interaction.reply('Time is already passed');
            return;
        }
        // reply to the user that the command was executed
        console.log(`Scheduling message to be sent in ${diff / 1000} seconds`);
        interaction.reply('Timer set');
        const timer = setTimeout(() => {
            interaction.followUp(message);
        }, diff);
    }
    
}