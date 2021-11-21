const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Move all members from a voice channel to another')
        .addStringOption(option => option.setName('c1')
            .setDescription('Specify channel 1')
            .setRequired(true))
        .addStringOption(option => option.setName('c2')
            .setDescription('Specify channel 2')
            .setRequired(true)),
    async execute(interaction) {
        const channels = [
            interaction.guild.channels.cache.get(interaction.options.getString('c1')),
            interaction.guild.channels.cache.get(interaction.options.getString('c2'))
        ]

        const members = channels[0].members;
        if (!channels[0] || !channels[1] || !(members.size > 0)) {
            await interaction.reply("Invalid channel", { ephemeral: true });
            return;
        }

        // Check if channels are voice channels
        if (!channels[0].isVoice() || !channels[1].isVoice()) {
            await interaction.reply("Channels must be voice channels", { ephemeral: true });
            return;
        }

        await members.forEach(async function (member) {
            member.voice.setChannel(channels[1]).catch(console.error);
        });

        await interaction.reply("Moved all members from " + channels[0].name + " to " + channels[1].name);
    }
}