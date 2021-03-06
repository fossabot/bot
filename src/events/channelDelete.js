module.exports = class Event {
	constructor(Atlas) {
		this.Atlas = Atlas;
	}

	async execute(channel) {
		const settings = channel.guild && await this.Atlas.DB.getSettings(channel.guild.id);

		if (!channel.guild || !settings.actionLogChannel) {
			return;
		}

		const type = this.Atlas.lib.utils.getChannelType(channel.type);

		const auditEntry = await this.Atlas.util.getGuildAuditEntry(channel.guild, channel.id, 12);

		const embed = {
			title: 'general.logs.channelDelete.title',
			color: this.Atlas.colors.get('green').decimal,
			description: ['general.logs.channelDelete.description', channel.name, type],
			fields: [],
			footer: {
				text: `Channel ${channel.id}`,
			},
			timestamp: new Date(),
		};

		if (channel.parentID) {
			const { name } = channel.guild.channels.get(channel.parentID);
			embed.fields.push({
				name: 'general.logs.channelDelete.category.name',
				value: name,
				inline: true,
			});
		}

		if (auditEntry) {
			embed.fields.push({
				name: 'general.logs.channelDelete.moderator.name',
				value: auditEntry.user.tag,
				inline: true,
			});

			embed.footer.text += ` User ${auditEntry.user.id}`;
		}

		return settings.log('action', embed);
	}
};
