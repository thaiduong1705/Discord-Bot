const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('createreminder')
    .setDescription('Create a reminder')
    .addStringOption(option =>
        option.setName('day')
        .setRequired(true)
        .setDescription('The day you want to set the reminder for')
    )
    .addStringOption(option =>
        option.setName('time')
        .setRequired(true)
        .setDescription('The time you want to set the reminder for')
    )
    .addStringOption(option =>
        option.setName('reminder')
        .setRequired(true)
        .setDescription('The reminder message')
    ),
    async execute(interaction) {
        reminderList = fs.readFileSync('./textFiles/reminder.txt', 'utf8').toString().split('\r\n');
        //get the day
        const date = interaction.options.getString('day');
        // get the time 
        const time = interaction.options.getString('time');
        // get the reminder message
        const reminder = interaction.options.getString('reminder');
        // spilt the day
        const [day, month, year] = date.split('/');
        // split the time into milliseconds
        const [hours, minutes] = time.split('h');
        // check
        if (Check([day, month, year], [hours, minutes]) == false) {
            interaction.reply({content: 'Date is not valid', ephemeral: true});
            return;
        }
        const milliseconds = new Date(year, month - 1, day, hours, minutes).getTime();
        
        // get user use command
        reminderString = `${milliseconds} ${interaction.member.id} ${reminder}`;
        if (CheckReminderWasExist(reminderString)) {
            interaction.reply({content: 'This reminder is already existed', ephemeral: true});
            return;
        }
        // write to file
        fs.appendFile('./textFiles/reminder.txt', reminderString + '\r\n', (err) => {
            if (err) 
                interaction.reply({content: 'Error writing to file', ephemeral: true});
            else
                interaction.reply({content: "Reminder set", ephemeral: true});
            
        }
        );
    }
}

function Check ([day, month, year], [hours, minutes]) {
    ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (hours > 23 || minutes > 59 || hours < 0 || minutes < 0)
        return false;
    if (year < 1970 && year > 2100)
        return false;
    if (month < 1 && month > 12)
        return false;
    
    if (month == 1 || month >2) {
        if (day > ListofDays[month - 1]) {
        return false;
        }
    }
    if (month == 2) {
        var lyear = false;
        if ( (!(year % 4) && year % 100) || !(year % 400)) {
            lyear = true;
        }

        if ((lyear == false) && (day >= 29)){
            return false;
        }
        if ((lyear == true) && (dd > 29)) {
            return false;
        }
    }

    if (new Date(year, month - 1, day, hours, minutes).getTime() < new Date().getTime())
        return false;
    return true;
  }

  function CheckReminderWasExist(reminder) {
    for (let i = 0; i < reminderList.length; i++) {
        if (reminderList[i] == reminder)
            return true;
    }
    return false;
  }
    
