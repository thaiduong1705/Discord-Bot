const { SlashCommandBuilder } = require('@discordjs/builders');
// delete amount of messages
module.exports = {
    data : new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Delete messages')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to delete')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        // check amount is smaller than 1
        if (amount <= 0) {
            return interaction.reply('Amount must be greater than 0');
        }
        interaction.channel.bulkDelete(amount).then(() => {
            interaction.reply(`Deleted ${amount} messages`);
            console.log(`Deleted ${amount} messages`);
        });
    }   
};