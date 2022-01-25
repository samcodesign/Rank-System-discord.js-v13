const { Client, Intents, Collection } = require("discord.js");
const { TOKEN, mongodb0 } = require("./config.json");
const fs = require("fs");
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS
  ],
  ws : {
    properties : {
      $browser : "Discord Android"
    }
  }
});
// Global Variables
client.events = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.commands = new Collection();
client.categories = fs.readdirSync("./commands/");

module.exports = client;

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["event_handler", "slash_handler"].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

//database
const mongoose = require("mongoose");
mongoose.connect(mongodb0).then((s) => {
	console.log("DB ONLINE!");
});

// on ready notif
client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}.`);
});

client.on("messageCreate", (message) => {
	if (message.content == "ping") {
		message.channel.send("pong");
	}
});

client.login(TOKEN);


//handling errors

process.on("unhandledRejection", (reason, p) => {
	console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
	console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
	console.log(" [Error_Handling] :: Uncaught Exception/Catch");
	console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
	console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
	console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
	console.log(" [Error_Handling] :: Multiple Resolves");
	console.log(type, promise, reason);
});