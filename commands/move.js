const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Move all members from a voice channel to another')
        .addStringOption(option => option.setName('channel')
            .setDescription('Specify channel to move to')
            .setRequired(true))
        .addBooleanOption(option =>
            option
                .setName('self')
                .setDescription('Include yourself?')),
    async execute(interaction) {
        const channels = [
            interaction.member.voice.channel,
            interaction.guild.channels.cache.get(interaction.options.getString('channel'))
        ]

        const members = channels[0].members;
        if (!channels[0] || !channels[1] || !(members.size > 0)) {
            await interaction.reply("Invalid channel", { ephemeral: true });
            return;
        }

        const isSelf = interaction.options.getBoolean('self') ?? true;

        // Check if channels are voice channels
        if (!channels[0].isVoice() || !channels[1].isVoice()) {
            await interaction.reply("Channels must be voice channels", { ephemeral: true });
            return;
        }

        await members.forEach(async function (member) {
            if (member === interaction.member && !isSelf) return;
            await member.voice.setChannel(channels[1]).catch(console.error);
        });

        await interaction.reply("Moved all members from " + channels[0].name + " to " + channels[1].name);
    }
}