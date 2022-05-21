const {SlashCommandBuilder} = new require('@discordjs/builders');

const fs = require('fs');
const reminderList = fs.readFileSync('./textFiles/reminder.txt', 'utf8').toString().split('\r\n');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('showreminder')
    .setDescription('Show all your reminders'),
    async execute(interaction) {
        // get the user id
        const userID = interaction.member.id;
        // get the reminders
        reminders = "";
        for (let i = 0; i < reminderList.length; i++) {
            var [milliseconds, reminderUserID, reminder] = reminderList[i].split(' ');

            milliseconds = parseInt(milliseconds);
            if (reminderUserID == userID)
                reminders += `${ConvertMillisecondsToDate(milliseconds)}: ${reminder} \n`;
        }
        if (reminders.length == 0)
            interaction.reply({content: 'You have no reminders', ephemeral: true});
        else
        {
            // reply reminders 
            interaction.reply({content :'Your reminders: \n' + reminders, ephemeral: true});
        }   
    }
}

function ConvertMillisecondsToDate (milliseconds) {
    const date = new Date(milliseconds);
    return date.toLocaleString("vi-VN", {timeZone: "Asia/Ho_Chi_Minh"});
}
