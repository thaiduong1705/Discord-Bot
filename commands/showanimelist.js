const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('showanimelist')
    .setDescription('Show anime list'),
    async execute(interaction) {
        // get the anime list
        const animeList = fs.readFileSync('./textFiles/anime.txt', 'utf8').toString().split('\r\n');
        animes = "";
        console.log(animeList);
        for (let i = 0; i < animeList.length - 1; i++) {
            [animeName, animeVote] = animeList[i].split(' ');
            animes += `${animeName} - ${animeVote}\n`;
        }
        interaction.reply({content: animes});
    }
}
