const Command = require('../../../structures/Command.js');

module.exports = class extends Command {
	constructor(Atlas) {
		super(Atlas, module.exports.info);
	}

	async action(msg, args, {
		settings,
	}) {
		const responder = new this.Atlas.structs.Paginator(msg.channel, (msg.lang || settings.lang), 'playlist.delete');

		if (!args[0]) {
			return responder.error('noArgs').send();
		}

		const playlists = await this.Atlas.DB.Playlist.find({
			author: msg.author.id,
		});

		if (!playlists.length) {
			return responder.error('noPlaylists').send();
		}

		const query = args.join(' ');
		const playlist = this.Atlas.lib.utils.nbsFuzzy(playlists, [
			'_id',
			'name',
		], query);

		if (!playlist) {
			return responder.error('noneFound', query).send();
		}

		await this.Atlas.DB.Playlist.deleteOne({
			author: msg.author.id,
			_id: playlist._id,
		});

		return responder.text('success', playlist.name).send();
	}
};

module.exports.info = {
	name: 'delete',
	aliases: ['gtfo'],
	guildOnly: true,
	patronOnly: true,
};
