const fs = require('fs');


module.exports = {
    execute(client)
    {
        // set interval to check reminders
        setInterval(() => {
            const reminderList = fs.readFileSync('./textFiles/reminder.txt', 'utf8').toString().split('\r\n');
            string = "";
            firsttime = true;
            var userID;
            // get the current time
            const currentTime = new Date().getTime();
            // get the reminders
            for (let i = 0; i < reminderList.length; i++) {
                var [milliseconds, reminderUserID, reminder] = reminderList[i].split(' ');
                // get the millseconds at the moment Date.now()
                milliseconds = parseInt(milliseconds);
                // get the current time
                if (milliseconds == Date.now())
                {
                    if (firsttime)
                    {
                        userID = reminderUserID;
                        firsttime = false;
                    }
                    else 
                    {
                        if (userID == reminderUserID)
                            string += `${reminder}\n`;;
                    }
                }
            }
            if (string.length == 0)
            return;
            // send DM to user has userID
            client.users.fetch(userID).then(user => {
                user.send(string);
            });
        }, 30000);
    }
}
