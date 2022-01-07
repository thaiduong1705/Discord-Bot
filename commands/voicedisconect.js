const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voicedisconect')
        .setDescription('Disconect all members from a voice channel')
        .addStringOption(option => option.setName('channel')
            .setDescription('Id of channel to disconect from')
            .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.guild.channels.cache.get(interaction.options.getString('channel'))
        // Check if channels are voice channels or exist
        if (!channel || !channel.isVoice()) {
            await interaction.reply("Invalid channel", { ephemeral: true });
            return;
        }
        // disconnect all members from channel
        await channel.members.forEach(async function (member) {
            await member.voice.setChannel(null).catch(console.error);
        });
        await interaction.reply("Disconected all members from " + channel.name);
    }
}