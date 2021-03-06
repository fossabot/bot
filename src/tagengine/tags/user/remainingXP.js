const middleware = require('./middleware');
const xputil = require('../../../../lib/xputil');

module.exports = middleware(async ({ user, guild, Atlas }) => {
	if (user.bot) {
		throw new Error('Bots cannot have XP profiles.');
	}

	const profile = await Atlas.DB.getProfile(user.id);

	const guildProfile = profile.guilds.find(({ id }) => id === guild.id);
	const xp = guildProfile ? guildProfile.xp : 0;

	const xpProfile = xputil.getUserXPProfile(xp);

	return xpProfile.remaining;
});

module.exports.info = {
	name: 'user.remainingXP',
	description: 'Gets the remaining XP until the user levels up.',
	args: '<user>',
	examples: [{
		input: '{user.remainingXP}',
		output: '1',
	}, {
		input: '{user.remainingXP}',
		output: '2016',
	}],
	dependencies: ['user', 'guild'],
};
