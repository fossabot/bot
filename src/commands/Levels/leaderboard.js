const Command = require('../../structures/Command.js');

module.exports = class Leaderboard extends Command {
	constructor(Atlas) {
		super(Atlas, module.exports.info);
	}

	action(msg) {
		const responder = new this.Atlas.structs.Responder(msg);

		responder.text('leaderboard', msg.guild.id).send();
	}
};

module.exports.info = {
	name: 'leaderboard',
	aliases: [
		'leveltop',
		'lvltop',
		'leaderboards',
		'scoreboard',
		'lb',
		'xptop',
		'xpleaderboard',
	],
	guildOnly: true,
};
