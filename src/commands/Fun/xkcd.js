const superagent = require('superagent');

const Command = require('../../structures/Command.js');

module.exports = class XKCD extends Command {
	constructor(Atlas) {
		super(Atlas, module.exports.info);
	}

	async action(msg) {
		const responder = new this.Atlas.structs.Responder(msg);

		const { num } = (await superagent.get('https://xkcd.com/info.0.json')
			.set('User-Agent', this.Atlas.userAgent)).body;

		const comicNum = (Math.floor(Math.random() * num) + 1);

		const { body } = await superagent.get(`https://xkcd.com/${comicNum}/info.0.json`)
			.set('User-Agent', this.Atlas.userAgent);

		return responder.embed({
			title: body.safe_title,
			url: `https://xkcd.com/${comicNum}/`,
			description: body.alt,
			image: {
				url: body.img,
			},
			timestamp: new Date(body.year, body.month, body.day),
			footer: {
				text: `Comic ${comicNum.toLocaleString()} via xkcd.com`,
			},
		}).send();
	}
};

module.exports.info = {
	name: 'xkcd',
	permissions: {
		bot: {
			embedLinks: true,
		},
	},
};
