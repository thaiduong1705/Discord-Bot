const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = {
	data: new SlashCommandBuilder()
	.setName('weather')
	.setDescription('Replies weather in specific location, remember to use english.')
	.addStringOption(option =>
		option.setName('location')
			.setDescription('The location')
			.setRequired(true)),
	async execute(interaction) {
		const city = interaction.options.getString("location");
		const key = process.env.KEY;
		const degree = "\u00B0";
		const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=vi&appid=${key}`)
				.then(response => {return response.json()})

		if (data["cod"] != 200)
		{
			interaction.reply("Fail rồi, m ngu.")
			return;
		}
		const embed = new MessageEmbed()
			.setColor("#FFFFFF")
			.setTitle(`${data["weather"][0]["description"].capitalize()}`)
			.setFields(
				{name: '\u200B', value: '\u200B'},
				{name: "Nhiệt độ trung bình", value: `${data["main"]["feels_like"]}${degree}`, inline: true},
				{name: "Tốc độ gió", value: `${data["wind"]["speed"]} m/s`, inline: true},
				{name: "Áp suất khí quyển", value: `${data["main"]["pressure"]} mmHg`},
				{name: "Độ ẩm", value: `${data["main"]["humidity"]}%`, inline: true}
			)
			.setTimestamp()
			.setThumbnail("https://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + "@2x.png")

		
		interaction.reply({		embeds: [embed]		})
		return;
	}
}		