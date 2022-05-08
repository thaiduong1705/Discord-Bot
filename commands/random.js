const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Randomize a choice in a list')
    .addStringOption(option => 
        option.setName('choices')
        .setRequired(true)
        .setDescription('The list of choices seperated by comma')
    )
    .addBooleanOption(option =>
        option.setName('see')
        .setDescription('Only see by you')
        .setRequired(false)
    ),
    async execute(interaction) {
        // get the list of choices
        const choices = interaction.options.getString('choices');
        // split the list of choices
        const choicesArray = choices.split(',');
        // randomize the list of choices
        const randomChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
        
        // send the random choice without space at the beginning and end
        if (interaction.options.getBoolean('see')) 
            await interaction.reply({content: randomChoice.trim(), ephemeral: true});
        else
            await interaction.reply(randomChoice.trim());
    }
}