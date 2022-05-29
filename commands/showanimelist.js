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
        if (animeList.length == 0) {
            interaction.reply({content: "There is no anime in the list"});
            return;
        }
        for (let i = 0; i < animeList.length - 1; i++) {
            var index = null;
            for (let j = 0; j < animeList[i].length; j++) {
                if (animeList[i][j] == ' ') {
                    if (isNumber(animeList[i][j + 1])) {

                        index = j;
                        break;
                    }
                }
            }
            [animeName, animeVote] = split_at_index(animeList[i], index);
            animes += `${animeName} - ${animeVote}\r\n`;
        }
        interaction.reply({content: animes});
    }
}

function split_at_index(str, index)
{
    if (index == null)
        return null;

    const result = [str.slice(0, index), str.slice(index + 1)];
    return result;
}

function isNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }
  
    if (char.trim() === '') {
      return false;
    }
  
    return !isNaN(char);
}