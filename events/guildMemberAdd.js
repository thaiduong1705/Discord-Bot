module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === "lobby");
        if (!channel)
        {
            console.log("No channel.");
            return;
        }
        if (!member.user.bot) {
            await channel.send(`Welcome to ***${member.guild.name}***, <@!${member.id}>`);
            await member.roles.add(member.guild.roles.cache.find(x => x.id === "857985144533811230")).catch(e => console.error(e));
        }
        else {
            await member.roles.add(member.guild.roles.cache.find(x => x.id === "864362304556761138")).catch(e => console.error(e));
        }
    },
};