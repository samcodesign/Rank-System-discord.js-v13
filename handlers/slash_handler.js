const {
	Client,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	Guild,
} = require("discord.js");
const fs = require("fs");
const ee = require("../settings/embed.json");
const emoji = require("../settings/emoji.json");

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
	try {
		client.arrayOfcommands = [];
		let commandcount = 0;
		console.log("SLASH COMMANDS━━━━━━━━━━━━━━━━━━━┓");
		let cmdName;
		let cmdOption;
		fs.readdirSync("./commands").forEach((cmd) => {
			let commands = fs
				.readdirSync(`./commands/${cmd}/`)
				.filter((file) => file.endsWith(".js"));
			for (cmds of commands) {
				let pull = require(`../commands/${cmd}/${cmds}`);
				if (pull.options) {
					pull.options
						.filter((g) => g.type === "SUB_COMMAND")
						.forEach((sub) => {
							client.subcmd.set(sub.name, sub);
						});
				}
				if (pull.name) {
					client.commands.set(pull.name, pull);
					cmdName = pull.name;
					cmdOption = "✅";
					commandcount++;
					client.arrayOfcommands.push(pull);
				} else {
					continue;
				}
				console.log(
					`${
						"┃"
					} Loaded: ${cmdOption} ${"┃"} ${cmdName}`
				);
			}
		});
		console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");

		client.on("ready", async () => {
			try {
				await client.guilds.cache
					.get(`934867642840399923`)
					.commands.set(client.arrayOfcommands);
			} catch (e) {
				console.log(e);
			}
		});

		// console.log(` Loaded ${commandcount} commands `);
	} catch (e) {
		console.log(e);
	}
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String} data
	 */
	client.embed = (interaction, data) => {
		return interaction.followUp({
			embeds: [
				new MessageEmbed()
					.setColor(ee.color)
					.setTitle(data.substr(0, 2000))
					.setFooter({
						text: ee.footertext,
						iconURL: ee.footericon,
					}),
			],
		});
	};
};
