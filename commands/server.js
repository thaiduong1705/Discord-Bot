const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Reply with server info!'),
	async execute(interaction) {
		const name = `Server name: ${interaction.guild.name} \n`;
		// count members in server except members have bot role
		const memberCount = `Member count: ${interaction.guild.memberCount - interaction.guild.members.cache.filter(member => member.roles.cache.name = 'Bots').size} \n`;
		// count bots in server
		const botCount = `Bot count: ${interaction.guild.members.cache.filter(member => member.roles.cache.name = 'Bots').size} \n`;
		
		await interaction.reply(name + memberCount + botCount);
	},
};