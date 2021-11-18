const { SlashCommandBuilder } = require('@discordjs/builders');
// slah command builder
module.exports = {
    data : new SlashCommandBuilder()
        .setName('say')
        .setDescription('Says something')
        .addStringOption(option => 
            option.setName('text')
            .setRequired(true)
            .setDescription('The text to say')
        ),
    async execute(interaction) {
        // check if the user has specific id to use this command
        if(interaction.user.id != '772851426837135391') 
        {
            await interaction.reply(`${interaction.user} tuổi lòn mà nhắn hoho!`);
            return;
        }
        
        // get the text
        const text = interaction.options.getString('text');
        // send the text
        await interaction.reply(text);
    }
}