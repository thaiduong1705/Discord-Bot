const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Reply with server info!'),
	async execute(interaction) {
		var count = interaction.guild.memberCount;
		var bots = interaction.guild.members.cache.filter(member => member.roles.cache.id = '864362304556761138').size;
		const name = `Server name: ${interaction.guild.name} \n`;
		// count members in server except members have bot role
		const memberCount = `Member count: ${count - bots} \n`;
		// count bots in server
		const botCount= `Bot count: ${bots} \n`;
		
		await interaction.reply(name + memberCount + botCount);
	},
};