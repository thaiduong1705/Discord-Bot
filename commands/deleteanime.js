const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deleteanime')
    .setDescription('Delete anime from list')
    .addStringOption(option =>
        option.setName('anime')
        .setRequired(true)
        .setDescription('The anime you want to delete')
    ),
    async execute(interaction) {
        if (interaction.member.id != '772851426837135391')
        {
            interaction.reply({content: 'You are not allowed to delete anime', ephemeral: true});
            return;
        }
        // get the anime list
        var animeList = fs.readFileSync('./textFiles/anime.txt', 'utf8').toString().split('\r\n');
        // get the anime name 
        var i;
        const anime = interaction.options.getString('anime');
        for (i = 0; i < animeList.length; i++) {
            [animeName, vote] = animeList[i].split(' ');
            if (anime == animeName) {
                animeList.splice(i, 1);
                break;
            }
        }
        if (i == 0)
        {
            interaction.reply({content: 'Anime not found', ephemeral: true});
            return;
        }
        writtenString = "";
        for (let i = 0; i < animeList.length - 1; i++) {
            writtenString += `${animeList[i]}\r\n`;
        }
        fs.writeFile('./textFiles/anime.txt', writtenString, (err) => {
            if (err) 
                interaction.reply({content: 'Error writing to file', ephemeral: true});
            else
                interaction.reply({content: `Deleted ${anime}`, ephemeral: true});
        });
    }
}
