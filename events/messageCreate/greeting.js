const fs = require('fs');
const time = new Date();

const greeting = fs.readFileSync('./events/messageCreate/texts/greet.txt', 'utf8').toString().split('\r\n');
const bye = fs.readFileSync('./events/messageCreate/texts/bye.txt', 'utf8').toString().split('\r\n');

// normailize unicode string
function normalize(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");
    return str;

    // return str.replace(/[^a-zA-Z0-9]/g, '-');
}

module.exports = {
	name: 'greeting',  
	async execute(message) {
        if (message.author.bot)
        {
            return;
        }
        try {
            const bot = new RegExp(`\\bbot\\b`);
            const msg = normalize(message.content);
            if (bot.test(msg) || msg.includes(`<@!${message.client.user.id}>`) || message.mentions.everyone) {
                for (word of greeting) {
                    const reg = new RegExp(`\\b${word}\\b`);
                    if (reg.test(msg)) {
                        const hour = time.getHours();
                        if (hour >= 6 && hour < 12) {
                            await message.channel.send(`Good morning, <@!${message.author.id}>`);
                            console.log("hello1");
                        } else if (hour >= 12 && hour < 18) {
                            await message.channel.send(`Good afternoon, <@!${message.author.id}>`);
                            console.log("hello2");
                        } else if (hour >= 18 && hour < 24){
                            await message.channel.send(`Good evening, <@!${message.author.id}>`);
                            console.log("hello3");
                        } else {
                            await message.channel.send(`Please go to sleep, <@!${message.author.id}>`);
                            console.log("hello4");
                        }
                        console.log("Greet successfully");
                        return;
                    }   
                
                }
                
                for (word of bye) {
                    const reg = new RegExp(`\\b${word}\\b`);  
                    if (reg.test(msg)) {
                        await message.channel.send(`Good bye, <@!${message.author.id}>`);
                        console.log("Bye successfully!");
                        return;
                    }
                }
            }
            else
            {
                return;
            }
        } catch (err) {
            console.error(err);
            return;
        }
    },
};