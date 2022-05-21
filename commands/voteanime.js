const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('voteanime')
    .setDescription('Vote anime')
    .addStringOption(option =>
        option.setName('anime')
        .setRequired(true)
        .setDescription('The anime you want to suggest')
    ),
    async execute(interaction) {
        // get the anime list
        var animeList = fs.readFileSync('./textFiles/anime.txt', 'utf8').toString().split('\r\n');
        // get the anime name
        const anime = interaction.options.getString('anime').toLowerCase();
        // get the anime name and votes
        var animeName = [];
        var animeVote = [];
        GetAnimeNamesAndVotes(animeName, animeVote, animeList);
        // check if the anime is already existed
        if (CheckAnimeWasExist(anime, animeName, animeVote)) {
            SortingAnimeListByVote(animeName, animeVote); 
            interaction.reply({content: `Voted ${anime}`, ephemeral: true});
        }
        else
        {
            // write the anime name and 0 vote to file
            var animeString = `${anime} 0\r\n`;
            fs.appendFile('./textFiles/anime.txt', animeString, (err) => {
                if (err) 
                    interaction.reply({content: 'Error writing to file', ephemeral: true});
                else
                    interaction.reply({content: `Added and voted ${anime}`, ephemeral: true});
            });
        }
    }
}

function CheckAnimeWasExist (anime, animeName, animeVote) {
    for (let i = 0; i < animeName.length; i++) {
        if (animeName[i] == anime) // if exist, add 1 vote
        {
            animeVote[i]++;
            return true;
        }
    }
    return false;
}

function SortingAnimeListByVote (animeName, animeVote) {
    // sort the anime name by vote
    for (let i = 0; i < animeName.length; i++) {
        for (let j = i + 1; j < animeName.length; j++) {
            if (animeVote[i] < animeVote[j]) {
                var temp = animeVote[i];
                animeVote[i] = animeVote[j];
                animeVote[j] = temp;
                temp = animeName[i];
                animeName[i] = animeName[j];
                animeName[j] = temp;
            }
        }
    }
    // write anime name and vote to file
    var animeString = "";
    for (let i = 0; i < animeName.length; i++) {
        animeString += `${animeName[i]} ${animeVote[i]}\r\n`;
    }
    fs.writeFile('./textFiles/anime.txt', animeString, (err) => {
        if (err) 
            console.log('Error writing to file');
        else
            console.log('Anime list sorted successfully');
    });
}

function GetAnimeNamesAndVotes(animeName, animeVote, animeList) 
{
    for (let i = 0; i < animeList.length - 1; i++) {
        const [name, vote] = animeList[i].split(' ');
        animeName.push(name);
        animeVote.push(parseInt(vote));
    }
}