const {SlashCommandBuilder} = require('@discordjs/builders');

// change voice region to specific region
module.exports = {
    data: new SlashCommandBuilder()
    .setName('voiceregionchanger')
    .setDescription('Change your voice region to a specific region')
    .addStringOption(option =>
        option.setName('region')
        .setRequired(true)
        .setDescription('The region you want to change to')
    ),
    async execute(interaction) {
        // get the voice channel that the user is in
        const voiceChannel = interaction.member.voice.channel;
        // get the region
        const region = interaction.options.getString('region');
        // change the region
        await voiceChannel.setRTCRegion(region);
        // send the message
        await interaction.reply({content: `Changed your voice region to ${region}`, ephemeral: true});
    }
}

    
