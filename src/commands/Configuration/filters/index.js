const Command = require('../../../structures/Command.js');


module.exports = class Filters extends Command {
	constructor(Atlas) {
		super(Atlas, module.exports.info);
	}

	action(msg) {
		const responder = new this.Atlas.structs.Responder(msg);

		responder.embed(this.helpEmbed(msg)).send();
	}
};

module.exports.info = {
	name: 'filters',
	guildOnly: true,
	aliases: [
		'filter',
	],
	permissions: {
		user: {
			manageMessages: true,
		},
		bot: {
			embedLinks: true,
			manageMessages: true,
		},
	},
};
