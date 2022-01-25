const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../config.json");
const Levels = require("discord-xp");

module.exports = new Command({
	//options
	name: "level",
	description: "check your level",
	userPermissions: ["SEND_MESSAGES"],
	category: "Utility",
	options: [
		{
			name: "user",
			description: "ping user",
			type: "USER",
		},
	],
	// starting command
	run: async ({ client, interaction, args }) => {
		//section
		let target = interaction.options.getUser("user") || interaction.user;
		let user = await Levels.fetch(target.id, interaction.guild.id);

		if (!user) {
			return interaction.followUp(
				"Seems like this user has not earned any xp so far."
			);
		}else{
            interaction.followUp(
				`> **${target.tag}** is currently level ${user.level}.`
			);
        }
	},
});
